-- Función RPC usada por /api/buscar: similitud coseno sobre document_embeddings.
create or replace function match_documents(
  query_embedding vector(1536),
  match_count int default 10
)
returns table (
  document_id uuid,
  similarity float
)
language sql stable
as $$
  select document_id, 1 - (embedding <=> query_embedding) as similarity
  from document_embeddings
  order by embedding <=> query_embedding
  limit match_count;
$$;

