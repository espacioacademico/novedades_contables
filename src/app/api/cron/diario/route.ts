import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { scrapers } from "@/lib/scrapers";
import { analizarDocumento } from "@/lib/ai/clasificador";
import { supabaseAdmin } from "@/lib/db/supabase-client";
import { enviarInformeDiario } from "@/lib/email/informe-diario";

export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const nuevos = [];
  for (const scraper of scrapers) {
    for (const doc of await scraper.run()) {
      const hash = createHash("sha256").update(doc.rawContent).digest("hex");
      const { data: existente } = await supabaseAdmin
        .from("documents")
        .select("id")
        .eq("content_hash", hash)
        .maybeSingle();
      if (existente) continue; // ya procesado — no gasta tokens de Claude

      const analisis = await analizarDocumento(doc);
      const { data: guardado } = await supabaseAdmin
        .from("documents")
        .insert({ ...doc, content_hash: hash })
        .select()
        .single();

      await supabaseAdmin.from("summaries").insert({
        document_id: guardado.id,
        executive_summary: analisis.resumen_ejecutivo,
        key_points: analisis.puntos_clave,
      });
      await supabaseAdmin.from("impact_scores").insert({
        document_id: guardado.id,
        level: analisis.nivel_impacto,
        rationale: analisis.justificacion_impacto,
      });
      nuevos.push(guardado);
    }
  }

  await enviarInformeDiario(nuevos);
  return NextResponse.json({ procesados: nuevos.length });
}

