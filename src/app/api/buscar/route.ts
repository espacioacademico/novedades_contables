import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q");
  if (!q) return NextResponse.json({ error: "falta el parámetro q" }, { status: 400 });

  // TODO: generar el embedding de `q` (mismo modelo usado al indexar) y
  // ejecutar una consulta de similitud coseno contra document_embeddings
  // vía la función RPC match_documents() en Supabase.
  return NextResponse.json({ query: q, resultados: [] });
}

