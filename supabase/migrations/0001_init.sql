create extension if not exists "uuid-ossp";
create extension if not exists vector;

create type document_category as enum (
  'derecho_tributario', 'derecho_comercial', 'derecho_laboral',
  'contabilidad', 'jurisprudencia'
);
create type impact_level as enum ('alto', 'medio', 'bajo');

-- Fuentes oficiales
create table sources (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  institution text not null,
  base_url text not null,
  scraping_strategy text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Documentos detectados
create table documents (
  id uuid primary key default uuid_generate_v4(),
  source_id uuid not null references sources(id),
  title text not null,
  document_type text not null,
  official_number text,
  published_at date not null,
  source_url text not null,
  raw_content text not null,
  content_hash text not null unique,
  fetched_at timestamptz not null default now()
);
create index idx_documents_source on documents(source_id);
create index idx_documents_published on documents(published_at desc);

-- Materias y clasificación N:M
create table topics (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category document_category not null
);
create table document_topics (
  document_id uuid references documents(id) on delete cascade,
  topic_id uuid references topics(id) on delete cascade,
  confidence numeric(4,3) not null default 1.0,
  primary key (document_id, topic_id)
);

-- Resumen ejecutivo generado por IA (1:1 con documento)
create table summaries (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null unique references documents(id) on delete cascade,
  executive_summary text not null,
  key_points text[] not null default '{}',
  model_used text not null default 'claude-sonnet-4-5',
  generated_at timestamptz not null default now()
);

-- Nivel de impacto (1:1 con documento)
create table impact_scores (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null unique references documents(id) on delete cascade,
  level impact_level not null,
  score numeric(4,3),
  rationale text
);

-- Embeddings para búsqueda semántica
create table document_embeddings (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null references documents(id) on delete cascade,
  embedding vector(1536) not null
);
create index idx_embeddings_ann on document_embeddings
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Suscripciones al informe diario
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topics document_category[] not null default '{}',
  frequency text not null default 'diario',
  active boolean not null default true
);
create table daily_reports (
  id uuid primary key default uuid_generate_v4(),
  subscription_id uuid not null references subscriptions(id),
  report_date date not null default current_date,
  status text not null default 'enviado',
  document_ids uuid[] not null default '{}'
);

-- Seguridad a nivel de fila: solo usuarios autenticados leen documentos
alter table documents enable row level security;
create policy "lectura autenticada" on documents
  for select using (auth.role() = 'authenticated');

