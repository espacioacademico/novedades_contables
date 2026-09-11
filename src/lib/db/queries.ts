import { supabaseAdmin } from "./supabase-client";

export async function ultimosDocumentos(limite = 20) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("*, summaries(*), impact_scores(*), sources(name)")
    .order("published_at", { ascending: false })
    .limit(limite);

  if (error) throw error;
  return data;
}

export async function documentoPorId(id: string) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("*, summaries(*), impact_scores(*), sources(name), document_topics(topics(*))")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

