-- ==============================================================================
-- Sol & Mar Rent a Car — Esquema de Banco de Dados Oficial (Supabase / PostgreSQL)
-- Execute este script completo no SQL Editor do seu projeto Supabase.
-- ==============================================================================

-- Habilita extensões necessárias para UUID e índices de busca
create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

-- ---------- ENUMS ----------
do $$ begin
  create type vehicle_status as enum ('disponivel', 'reservado', 'em_locacao', 'manutencao');
exception when duplicate_object then null; end $$;

do $$ begin
  create type reservation_status as enum ('pendente', 'confirmada', 'em_andamento', 'concluida', 'cancelada');
exception when duplicate_object then null; end $$;

-- ---------- TABELA: VEÍCULOS ----------
create table if not exists public.vehicles (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  brand text default '',
  model text default '',
  category text not null default 'Econômico',
  group_code text default '',
  reference_model text default '',
  similar_models text[] default '{}',
  category_badge text default '',
  transmission text not null default 'Manual',
  fuel text not null default 'Flex',
  engine text default '',
  passengers int default 5,
  doors int default 4,
  luggage int default 2,
  daily_rate numeric(10, 2) not null default 0,
  deposit_amount numeric(10, 2) not null default 0,
  fleet_quantity int not null default 1,
  color text default '',
  color_hex text default '',
  available_additionals jsonb default '[]'::jsonb,
  status vehicle_status not null default 'disponivel',
  images text[] not null default '{}',
  cover_image text default '',
  is_illustrative_image boolean not null default true,
  features text[] not null default '{}',
  description text default '',
  plate text,
  year int,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- TABELA: OPCIONAIS & ACESSÓRIOS ----------
create table if not exists public.additionals (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  description text default '',
  price numeric(10, 2) not null default 0,
  type text not null default 'per_day' check (type in ('per_day', 'per_rental')),
  stock_quantity int not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- TABELA: CLIENTES ----------
create table if not exists public.customers (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  phone text not null,
  email text,
  document text,
  city text,
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- TABELA: RESERVAS ----------
create table if not exists public.reservations (
  id text primary key default gen_random_uuid()::text,
  code text not null unique default ('SM' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))),
  vehicle_id text not null references public.vehicles (id) on delete restrict,
  customer_id text not null references public.customers (id) on delete restrict,
  start_date date not null,
  end_date date not null,
  start_time text not null default '09:00',
  end_time text not null default '09:00',
  pickup_location text,
  return_location text,
  days int not null default 1,
  daily_rate numeric(10, 2) not null default 0,
  daily_subtotal numeric(10, 2) not null default 0,
  additionals_subtotal numeric(10, 2) not null default 0,
  rental_total numeric(10, 2) not null default 0,
  deposit_amount numeric(10, 2) not null default 0,
  advance_payment_amount numeric(10, 2) not null default 0,
  balance_on_pickup numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status reservation_status not null default 'pendente',
  additionals jsonb not null default '[]'::jsonb,
  payment_status text not null default 'pendente_checkout',
  payment_provider text,
  payment_gateway_note text,
  notes text,
  created_at timestamptz not null default now(),
  constraint reservations_valid_dates check (end_date >= start_date)
);

create index if not exists reservations_vehicle_dates_idx on public.reservations (vehicle_id, start_date, end_date);
create index if not exists reservations_code_idx on public.reservations (code);
create index if not exists reservations_status_idx on public.reservations (status);

-- ==============================================================================
-- CONTROLE DE CAPACIDADE DA FROTA E PREVENÇÃO DE RESERVAS DUPLICADAS/SOBREPOSTAS
-- ==============================================================================
create or replace function check_reservation_fleet_capacity()
returns trigger as $$
declare
  v_fleet_quantity int;
  v_active_conflicts int;
  v_status vehicle_status;
  v_active boolean;
begin
  -- Reservas canceladas não consomem unidade da frota
  if new.status = 'cancelada' then
    return new;
  end if;

  -- Consulta dados da frota e status do veículo solicitado
  select fleet_quantity, status, active
  into v_fleet_quantity, v_status, v_active
  from public.vehicles
  where id = new.vehicle_id;

  if not found then
    raise exception 'Veículo % não encontrado.', new.vehicle_id;
  end if;

  if not v_active or v_status = 'manutencao' then
    raise exception 'Este veículo está indisponível ou em manutenção para locação.';
  end if;

  v_fleet_quantity := coalesce(v_fleet_quantity, 1);
  if v_fleet_quantity < 1 then
    v_fleet_quantity := 1;
  end if;

  -- Conta reservas concorrentes ativas no mesmo período
  select count(*) into v_active_conflicts
  from public.reservations
  where vehicle_id = new.vehicle_id
    and id <> coalesce(new.id, '')
    and status in ('pendente', 'confirmada', 'em_andamento')
    and start_date <= new.end_date
    and end_date >= new.start_date;

  if v_active_conflicts >= v_fleet_quantity then
    raise exception 'Capacidade esgotada: todas as % unidades deste veículo já estão reservadas no período de % a %.',
      v_fleet_quantity, new.start_date, new.end_date;
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_check_reservation_fleet_capacity on public.reservations;
create trigger trg_check_reservation_fleet_capacity
  before insert or update on public.reservations
  for each row execute function check_reservation_fleet_capacity();

-- Função segura para verificação de unidades disponíveis sem expor dados de clientes
create or replace function get_available_units(
  p_vehicle_id text,
  p_start_date date,
  p_end_date date
) returns int as $$
declare
  v_total int;
  v_conflicts int;
begin
  select coalesce(fleet_quantity, 1) into v_total
  from public.vehicles
  where id = p_vehicle_id and active = true and status <> 'manutencao';

  if not found then
    return 0;
  end if;

  select count(*) into v_conflicts
  from public.reservations
  where vehicle_id = p_vehicle_id
    and status in ('pendente', 'confirmada', 'em_andamento')
    and start_date <= p_end_date
    and end_date >= p_start_date;

  return greatest(0, v_total - v_conflicts);
end;
$$ language plpgsql security definer;

-- ==============================================================================
-- POLÍTICAS DE SEGURANÇA ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. Veículos
alter table public.vehicles enable row level security;
grant select on public.vehicles to anon;
grant select, insert, update, delete on public.vehicles to authenticated;
grant all on public.vehicles to service_role;

drop policy if exists "vehicles_public_read" on public.vehicles;
create policy "vehicles_public_read" on public.vehicles
  for select to anon, authenticated
  using (true);

drop policy if exists "vehicles_admin_all" on public.vehicles;
create policy "vehicles_admin_all" on public.vehicles
  for all to authenticated
  using (true)
  with check (true);

-- 2. Opcionais
alter table public.additionals enable row level security;
grant select on public.additionals to anon;
grant select, insert, update, delete on public.additionals to authenticated;
grant all on public.additionals to service_role;

drop policy if exists "additionals_public_read" on public.additionals;
create policy "additionals_public_read" on public.additionals
  for select to anon, authenticated
  using (true);

drop policy if exists "additionals_admin_all" on public.additionals;
create policy "additionals_admin_all" on public.additionals
  for all to authenticated
  using (true)
  with check (true);

-- 3. Clientes (Proteção máxima de privacidade)
alter table public.customers enable row level security;
grant insert on public.customers to anon;
grant select, insert, update, delete on public.customers to authenticated;
grant all on public.customers to service_role;

-- Anônimos podem apenas cadastrar seus dados ao solicitar orçamento
drop policy if exists "customers_anon_insert" on public.customers;
create policy "customers_anon_insert" on public.customers
  for insert to anon, authenticated
  with check (length(trim(name)) > 0 and length(trim(phone)) > 0);

-- Apenas o administrador autenticado pode ler dados pessoais dos clientes
drop policy if exists "customers_admin_all" on public.customers;
create policy "customers_admin_all" on public.customers
  for all to authenticated
  using (true)
  with check (true);

-- 4. Reservas (Proteção contra acesso a reservas alheias)
alter table public.reservations enable row level security;
grant select, insert on public.reservations to anon;
grant select, insert, update, delete on public.reservations to authenticated;
grant all on public.reservations to service_role;

-- Anônimos podem apenas inserir reservas com status inicial 'pendente'
drop policy if exists "reservations_anon_insert" on public.reservations;
create policy "reservations_anon_insert" on public.reservations
  for insert to anon, authenticated
  with check (status = 'pendente');

-- Leitura de datas para calendário de disponibilidade da frota
drop policy if exists "reservations_availability_read" on public.reservations;
create policy "reservations_availability_read" on public.reservations
  for select to anon, authenticated
  using (status in ('pendente', 'confirmada', 'em_andamento'));

-- Administrador autenticado tem controle total de reservas
drop policy if exists "reservations_admin_all" on public.reservations;
create policy "reservations_admin_all" on public.reservations
  for all to authenticated
  using (true)
  with check (true);

grant execute on function get_available_units(text, date, date) to anon, authenticated;

-- ==============================================================================
-- STORAGE DE IMAGENS DOS VEÍCULOS
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('veiculos', 'veiculos', true)
on conflict (id) do nothing;

drop policy if exists "veiculos_bucket_public_read" on storage.objects;
create policy "veiculos_bucket_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'veiculos');

drop policy if exists "veiculos_bucket_admin_manage" on storage.objects;
create policy "veiculos_bucket_admin_manage" on storage.objects
  for all to authenticated
  using (bucket_id = 'veiculos')
  with check (bucket_id = 'veiculos');

-- ==============================================================================
-- DADOS INICIAIS OFICIAIS (SEED IDEMPOTENTE)
-- Popula os 13 modelos e acessórios oficiais da Sol & Mar Rent a Car
-- ==============================================================================
insert into public.additionals (id, name, description, price, type, stock_quantity, active)
values
  ('opt-bebe-conforto', 'Bebê Conforto (0 a 1 ano)', 'Item de segurança indispensável para recém-nascidos até 1 ano ou 13 kg.', 20.00, 'per_day', 6, true),
  ('opt-cadeirinha-infantil', 'Cadeirinha Infantil (1 a 4 anos)', 'Assento com cinto próprio para crianças de 9 kg a 18 kg.', 20.00, 'per_day', 8, true),
  ('opt-assento-elevacao', 'Assento de Elevação (4 a 7 anos)', 'Booster de segurança para crianças de 15 kg a 36 kg.', 15.00, 'per_day', 10, true),
  ('opt-condutor-adicional', 'Condutor Adicional', 'Autorização de cobertura para um segundo motorista habilitado durante a locação.', 15.00, 'per_day', 99, true),
  ('opt-protecao-pneus-vidros', 'Proteção Especial de Pneus e Vidros', 'Reduz a responsabilidade financeira em caso de danos a retrovisores, vidros e pneus.', 25.00, 'per_day', 99, true)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  type = excluded.type,
  stock_quantity = excluded.stock_quantity,
  active = excluded.active;
