# Resolução dos Problemas Visuais e de Renderização na Vercel

## 1. Causas Raízes Identificadas

1. **Interceptação da Rota Raiz por `index.html` Estático Vazio em `.vercel/output/static` (Causa Primária do Conteúdo Oculto):**
   - O arquivo de roteamento da Vercel (`.vercel/output/config.json`) possui a regra `{ "handle": "filesystem" }` antes de `{ "src": "/(.*)", "dest": "/__server" }`.
   - No script `prepare-dist.js`, estava sendo gerado um arquivo `.vercel/output/static/index.html` com um esqueleto estático vazio (`<div id="root"></div>`) e scripts de hash desatualizados.
   - Quando o visitante acessava `https://sitesolemar2.vercel.app/`, a borda da Vercel entregava o `index.html` estático sem invocar a função SSR do TanStack Start (`__server.func`).
   - Sem o SSR, a variável de hidratação essencial do TanStack Start (`window.$_TSR`) não existia no DOM.
   - Ao carregar no navegador, o bundle do TanStack Router lançava uma exceção crítica:
     `Invariant failed: Expected to find bootstrap data on window.$_TSR, but we did not. Please file an issue!`
   - A hidratação do React abortava imediatamente, deixando o `<div id="root"></div>` em branco e sem conteúdo renderizado.

2. **Cores Estranhas / Elementos Azuis e Vermelhos:**
   - Com o React quebrado antes de montar e sem as classes aplicadas dinamicamente ou na falha de hidratação, os navegadores recorreram aos estilos padrão do User-Agent (links `<a href="...">` em azul `#0000ee`, foco/ativo em vermelho `#ff0000`, botões sem estilos herdados).
   - Faltavam no `@layer base` resets explícitos de links (`a { color: inherit; text-decoration: inherit; }`) e elementos de formulário, além de que a ausência do HTML pré-renderizado pelo SSR expunha o fallback cru do navegador.

3. **Bundle React 19 Development em Produção:**
   - A ausência da definição estática `"process.env.NODE_ENV": "production"` no cliente fazia o Rollup/Vite empacotar o código de desenvolvimento do React 19 (`react-dom-client.development.js`), aumentando o bundle para ~785 kB e gerando avisos de limite de tamanho de chunk e overlays de erro.

4. **Origem dos Avisos de Log da Vercel:**
   - `npm warn Unknown env config "cache-dir"`: É gerado pelo próprio ambiente de build runner da Vercel ao injetar a variável legada `npm_config_cache_dir` (o npm 10 utiliza `cache` em vez de `cache-dir`). Não afeta a aplicação nem o código-fonte.
   - `Adjust chunk size limit for this warning via build.chunkSizeWarningLimit`: Disparado quando o bundle de cliente sem substituição de `NODE_ENV` ultrapassa o patamar padrão de 500 kB do Vite devido à inclusão de ferramentas de desenvolvimento.

---

## 2. Arquivos Alterados

1. **`scripts/prepare-dist.js`**:
   - Adicionada exclusão obrigatória de qualquer arquivo `.vercel/output/static/index.html` para garantir que a Vercel sempre repasse as rotas de páginas (`/`, `/como-funciona`, `/contato`, `/sobre`, etc.) para a função de SSR (`__server.func`).
   - Limpeza completa do diretório `dist` antes de cada cópia para impedir acúmulo de hashes obsoletos de builds anteriores.
   - Sincronização dinâmica dos nomes reais de CSS e JS para o arquivo `dist/index.html` de fallback estático.
   - Preservado o patch de reaproveitamento seguro de socket keep-alive (`Object.defineProperty(req.socket, "remoteAddress", ...)`).

2. **`vite.config.ts`**:
   - Adicionado `define: { "process.env.NODE_ENV": JSON.stringify("production") }` para garantir compilação de produção enxuta e sem código de debug no cliente.
   - Preservadas as configurações do Nitro com preset Vercel (`entryFormat: "node"`) e integração com `server.ts`.

3. **`src/styles.css`**:
   - Adicionados resets base universais para links (`a`) e elementos de formulário (`button`, `input`, `select`, `textarea`) no `@layer base` para assegurar herança limpa de cores e tipografia, evitando qualquer fallback para o azul/vermelho padrão do navegador.
   - Preservada 100% da identidade visual: azul-marinho profundo (`#123D70`), amarelo-sol (`#F6C644`), azul-mar, temas claro e escuro.

---

## 3. Testes e Validações Executados

1. **Verificação de Ausência do `index.html` Estático:**
   - Verificado que `.vercel/output/static/index.html` **não existe** após o build, garantindo que o roteamento de borda da Vercel não sequestra a rota raiz.
2. **Execução Direta do Servidor SSR (`__server.func`):**
   - Rota `/`: HTTP 200, 85.215 bytes de HTML pré-renderizado, `<title>` correto, tags de meta OpenGraph, link do CSS gerado (`styles-*.css`) e bootstrap de hidratação (`window.$_TSR`) presente.
   - Rotas secundárias testadas: `/como-funciona` (200), `/contato` (200), `/sobre` (200), `/admin` (200), `/reserva` (200), `/veiculos/spin-7l` (200).
3. **Verificação dos Arquivos Estáticos:**
   - CSS compilado (`styles-*.css`, 115 kB) com todas as classes utilitárias do Tailwind v4 presentes e validadas.
   - Imagens da frota (Onix, Spin, Tracker, Hilux, Pulse, Polo, C3, Renegade, 208, Tera) e logos intactos.
4. **Linters e Compilação:**
   - `npm run lint`: 0 erros encontrados.
   - `compile_applet`: Compilação bem-sucedida.
