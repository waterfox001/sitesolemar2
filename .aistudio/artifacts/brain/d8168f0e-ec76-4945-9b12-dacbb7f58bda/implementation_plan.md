# Plano de Implementação: Integração Supabase Real — Sol & Mar Rent a Car

Plano de arquitetura e diagnóstico técnico para conectar a plataforma Sol & Mar Rent a Car (`waterfox001/sitesolmar2`) a um banco de dados real Supabase (PostgreSQL), preservando 100% do design, componentes, catálogo de 13 veículos e fluxo de reservas.

---

## Revisão do Usuário & Decisões Críticas

> [!IMPORTANT]
> **Nenhuma modificação de código ou migração de banco foi executada nesta etapa.** Conforme solicitado, esta resposta traz a auditoria completa do projeto, o diagnóstico de segurança e o plano técnico para sua validação antes de qualquer alteração nos arquivos ou deploy.

- **Status da Proteção TanStack Start (Vercel):** Auditado com sucesso. O projeto já está utilizando `@tanstack/react-start@1.169.3` (exigência da Vercel: `>= 1.168.60`) e `@tanstack/start-server-core@1.169.44` em overrides e no `package-lock.json` (exigência da Vercel: `>= 1.169.39`). Não foi e não será usada nenhuma variável insegura (`DANGEROUSLY_DEPLOY_VULNERABLE_...`).
- **Repositório Alvo:** `waterfox001/sitesolmar2` na branch `main`.
- **Credenciais e Segredos:** Nenhuma credencial será exposta no código. Apenas variáveis públicas de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) e um modelo limpo `.env.example` serão utilizados.
- **Modelo de Disponibilidade & Frota:** O catálogo possui modelos que contam com mais de 1 unidade na frota (`fleet_quantity`). O schema e as regras de sobreposição devem respeitar a quantidade de unidades físicas disponíveis, e não bloquear o modelo todo quando apenas 1 unidade for alugada.
- **Proteção RLS e Privacidade de Clientes:** A política RLS atual no arquivo rascunho `supabase/schema.sql` expunha leituras irrestritas de reservas a visitantes anônimos. O novo plano estabelece isolamento rigoroso: anônimos não leem dados de outros clientes nem valores de contratos; a checagem de disponibilidade é feita através de consulta controlada/função segura.

---

## 1. Diagnóstico da Estrutura Atual

### 1.1 Como os dados são armazenados hoje
1. **Armazenamento Primário em Desenvolvimento:** `localStorage` do navegador via chave `solemar_db_v2` em `src/lib/local-store.ts`.
2. **Dados Iniciais (Seed):** Arquivo `src/lib/seed.ts` contém os 13 modelos oficiais solicitados pelo proprietário (Toyota Hilux, Chevrolet Tracker, Fiat Pulse, Citroën C3, VW Polo, Spin 7L, etc.) com suas fotos ilustrativas de estúdio, além dos opcionais (bebê conforto, assento de elevação, condutor adicional, etc.).
3. **Camada de Acesso a Dados (`src/lib/api.ts`):** Já possui uma chave seletora `isRemoteEnabled()` baseada em `isSupabaseConfigured && Boolean(supabase)`. Se o Supabase estiver preenchido no ambiente, o código desvia para o cliente `@supabase/supabase-js`; se vazio, consome o `localStorage`.
4. **Disparidades Identificadas entre o Código e o `supabase/schema.sql` existente:**
   - **Tabela `vehicles`:** O SQL existente no repositório não contempla campos vitais presentes na interface, como `brand`, `model`, `engine`, `cover_image`, `is_illustrative_image`, `deposit_amount` (caução individual por modelo), `fleet_quantity` (estoque de unidades daquele modelo), `color`, `color_hex` e `available_additionals`.
   - **Tabela `additionals` (Opcionais):** Não existe no SQL atual do repositório! As funções de opcionais em `src/lib/api.ts` salvavam exclusivamente em `localStorage`.
   - **Tabela `customers`:** O SQL marcava `email text not null`, enquanto na regra de negócio da locadora o e-mail é opcional (o WhatsApp/telefone é o identificador comercial obrigatório). Isso causaria falha na inserção no banco real caso o cliente preenchesse apenas nome e WhatsApp.
   - **Tabela `reservations`:** O SQL não contemplava os campos financeiros discriminados calculados no checkout (`start_time`, `end_time`, `daily_subtotal`, `additionals_subtotal`, `rental_total`, `deposit_amount`, `advance_payment_amount`, `balance_on_pickup`, `additionals` em JSONB, `payment_status`).
   - **Restrição de Conflito (`reservations_no_overlap`):** O GiST existente bloqueava qualquer reserva no mesmo intervalo por `vehicle_id`. Se a locadora tiver 3 unidades de Spin ou Polo, a segunda reserva para a mesma data era bloqueada incorretamente.

---

## 2. Experiência do Usuário & Preservação do Design

- **Zero Alteração Visual:** A identidade visual (Tailwind CSS, tema escuro/claro, cards de veículos com badge, filtros de categoria, seletor de datas `DateRangePicker`, modal de resumo com caução e link formatado para WhatsApp) permanece **100% idêntica**.
- **Reserva Sem Falsos Pagamentos:** O sistema calcula exatamente os valores configurados na locadora (diárias x dias + opcionais), discrimina a caução de garantia (bloqueio temporário no cartão de crédito, sem cobrança antecipada) e gera o protocolo formal com status `pendente` para atendimento via WhatsApp da Sol & Mar. Não há simulação de pagamento falso nem aprovação fictícia de cartão.
- **Transição Transparente:** Caso o Supabase não tenha variáveis preenchidas no ambiente local, a aplicação continua funcionando sem quebrar através do fallback seguro de demonstração. Assim que as credenciais são inseridas no `.env`, ela consome o banco de dados oficial do Supabase em tempo real.

---

## 3. Decisões Técnicas & Arquitetura de Dados

```
┌────────────────────────────────────────────────────────┐
│                   Cliente Web (Vite + React)           │
│  - Catálogo de Veículos                                │
│  - Fluxo de Reserva & Opcionais (/reserva)             │
│  - Painel Administrativo (/admin)                      │
└───────────────────────────┬────────────────────────────┘
                            │
               VITE_SUPABASE_URL & ANON_KEY
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Supabase (PostgreSQL)                │
│                                                               │
│  ┌────────────────┐  1:N   ┌────────────────────────┐  │
│  │    vehicles    ├───────►│  reservations          │  │
│  │ (frota, caução)│        │  (datas, totais, RLS)  │  │
│  └────────────────┘        └───────────▲────────────┘  │
│                                        │ 1:N           │
│  ┌────────────────┐        ┌───────────┴────────────┐  │
│  │  additionals   │        │  customers             │  │
│  │ (acessórios)   │        │  (nome, fone, RLS)     │  │
│  └────────────────┘        └────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ RLS Policies:                                    │  │
│  │ - vehicles/additionals: SELECT público           │  │
│  │ - customers: INSERT público, SELECT/UPDATE admin │  │
│  │ - reservations: INSERT público (status pendente) │  │
│  │ - reservations: SELECT por código/fone ou admin  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 3.1 Esquema Proposto para o Banco de Dados (`supabase/schema.sql`)

1. **`vehicles` (Catálogo e Frota):**
   - `id`: UUID (Primary Key) ou texto identificador compatível.
   - `name`, `brand`, `model`, `category`, `transmission`, `fuel`: TEXT.
   - `passengers`, `doors`, `luggage`: INT.
   - `daily_rate`: NUMERIC(10,2) NOT NULL.
   - `deposit_amount`: NUMERIC(10,2) DEFAULT 0 (valor da caução individual).
   - `fleet_quantity`: INT DEFAULT 1 (quantidade de unidades no estoque).
   - `color`, `color_hex`: TEXT.
   - `images`: TEXT[] DEFAULT '{}'.
   - `cover_image`: TEXT.
   - `is_illustrative_image`: BOOLEAN DEFAULT true.
   - `features`: TEXT[] DEFAULT '{}'.
   - `description`: TEXT.
   - `plate`, `year`, `engine`: TEXT / INT.
   - `status`: vehicle_status ('disponivel', 'reservado', 'em_locacao', 'manutencao').
   - `active`: BOOLEAN DEFAULT true.
   - `created_at`: TIMESTAMPTZ DEFAULT now().

2. **`additionals` (Opcionais & Acessórios):**
   - `id`: TEXT ou UUID (Primary Key).
   - `name`: TEXT NOT NULL.
   - `description`: TEXT.
   - `price`: NUMERIC(10,2) NOT NULL.
   - `type`: TEXT CHECK (type IN ('per_day', 'per_rental')).
   - `stock_quantity`: INT DEFAULT 1.
   - `active`: BOOLEAN DEFAULT true.
   - `created_at`: TIMESTAMPTZ DEFAULT now().

3. **`customers` (Clientes):**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid().
   - `name`: TEXT NOT NULL.
   - `phone`: TEXT NOT NULL (chave de contato obrigatória).
   - `email`: TEXT NULL (opcional).
   - `document`: TEXT NULL (CPF/CNPJ/Passaporte opcional no orçamento inicial).
   - `city`: TEXT NULL.
   - `notes`: TEXT NULL.
   - `created_at`: TIMESTAMPTZ DEFAULT now().

4. **`reservations` (Reservas & Orçamentos):**
   - `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid().
   - `code`: TEXT UNIQUE NOT NULL (ex: SM109283).
   - `vehicle_id`: UUID REFERENCES vehicles(id).
   - `customer_id`: UUID REFERENCES customers(id).
   - `start_date`: DATE NOT NULL.
   - `end_date`: DATE NOT NULL.
   - `start_time`: TEXT DEFAULT '09:00'.
   - `end_time`: TEXT DEFAULT '09:00'.
   - `pickup_location`, `return_location`: TEXT.
   - `days`: INT NOT NULL.
   - `daily_rate`: NUMERIC(10,2) NOT NULL.
   - `daily_subtotal`: NUMERIC(10,2) NOT NULL.
   - `additionals_subtotal`: NUMERIC(10,2) NOT NULL DEFAULT 0.
   - `rental_total`: NUMERIC(10,2) NOT NULL.
   - `deposit_amount`: NUMERIC(10,2) NOT NULL DEFAULT 0.
   - `advance_payment_amount`: NUMERIC(10,2) NOT NULL DEFAULT 0.
   - `balance_on_pickup`: NUMERIC(10,2) NOT NULL.
   - `total`: NUMERIC(10,2) NOT NULL.
   - `status`: reservation_status ('pendente', 'confirmada', 'em_andamento', 'concluida', 'cancelada').
   - `additionals`: JSONB DEFAULT '[]'.
   - `payment_status`: TEXT DEFAULT 'pendente_checkout'.
   - `payment_provider`: TEXT NULL.
   - `payment_gateway_note`: TEXT NULL.
   - `notes`: TEXT NULL.
   - `created_at`: TIMESTAMPTZ DEFAULT now().

### 3.2 Políticas de Segurança (Row Level Security - RLS)
- **`vehicles`:**
  - `SELECT`: Público (anon e authenticated), apenas onde `active = true` para visitantes; authenticated vê todos.
  - `INSERT / UPDATE / DELETE`: Exclusivo para usuários autenticados (`auth.role() = 'authenticated'`).
- **`additionals`:**
  - `SELECT`: Público (anon e authenticated) para itens ativos.
  - `INSERT / UPDATE / DELETE`: Exclusivo para administradores autenticados.
- **`customers`:**
  - `INSERT`: Aberto para anônimos poderem cadastrar seus dados ao solicitar reserva (com checagem de preenchimento mínimo de nome e telefone).
  - `SELECT / UPDATE / DELETE`: **Bloqueado para anônimos**. Apenas administradores autenticados têm permissão de leitura dos dados pessoais de clientes.
- **`reservations`:**
  - `INSERT`: Aberto para anônimos com status inicial fixado em `'pendente'`.
  - `SELECT`: **Não exposto publicamente**. Apenas o administrador autenticado pode listar o histórico de todas as reservas. Para validação de disponibilidade por visitantes, utiliza-se consulta agregada ou função RPC segura que retorna apenas se há vagas nas datas sem expor nomes ou valores.
  - `UPDATE / DELETE`: Exclusivo para administradores autenticados.

### 3.3 Regra de Conflito de Período e Multi-Unidades
- Para evitar sobreposição indevida sem quebrar veículos com múltiplas unidades:
  - Criação de uma função de validação (Trigger ou RPC) no Postgres: `check_vehicle_has_capacity(p_vehicle_id, p_start, p_end)`.
  - Ela conta quantas reservas ativas (`pendente`, `confirmada`, `em_andamento`) existem no período e só permite inserção se a contagem for estritamente menor que `vehicles.fleet_quantity`.

---

## 4. Arquivos que Precisam Ser Atualizados

1. **`supabase/schema.sql`**:
   - Reescrever o script DDL completo com todas as colunas reais, tabela `additionals`, índices por datas, função de validação de estoque por período, carga inicial limpa e políticas RLS de alta segurança.
2. **`.env.example`**:
   - Manter organizado com documentação explicativa e nomes padrão das variáveis:
     ```bash
     VITE_SUPABASE_URL=https://exemplo-seu-projeto.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo_chave_publica
     VITE_SUPABASE_STORAGE_BUCKET=veiculos
     ```
3. **`src/lib/api.ts`**:
   - Ajustar as funções de `additionals` (`listAdditionals`, `saveAdditional`, `deleteAdditional`) para gravarem no Supabase quando `isRemoteEnabled()` for verdadeiro.
   - Sincronizar o mapeamento de colunas de `saveVehicle` e `createReservation` para garantir compatibilidade idêntica entre os tipos TypeScript e as colunas do PostgreSQL.
4. **`src/lib/types.ts`**:
   - Assegurar que os tipos estejam 100% alinhados com o novo schema.

---

## 5. Bloqueios & Riscos Identificados

- **Nenhum bloqueio técnico crítico.**
- **Segurança de Dependências:** O build e a proteção de segurança da Vercel contra a CVE do TanStack Start já estão 100% resolvidos no `package.json` e `package-lock.json`.
- **Compatibilidade:** O cliente `@supabase/supabase-js` versão `^2.116.0` já está instalado e compatível com o ecossistema React 19 / Vite do projeto.
- **Transição Segura:** Durante a fase em que o usuário ainda não adicionou as chaves reais no painel da Vercel ou no `.env`, a aplicação continua exibindo os veículos e formulários normalmente via catálogo local auditado, sem telas em branco.
