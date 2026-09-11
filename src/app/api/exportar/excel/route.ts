import { NextResponse } from "next/server";
import { generarExcel } from "@/lib/export/excel";
import { ultimosDocumentos } from "@/lib/db/queries";

export async function GET() {
  const documentos = await ultimosDocumentos(200);
  const buffer = await generarExcel(
    documentos.map((d) => ({
      title: d.title,
      source: d.sources?.name ?? "",
      materia: d.document_topics?.[0]?.topics?.name ?? "",
      impacto: d.impact_scores?.[0]?.level ?? "",
      published_at: d.published_at,
    }))
  );

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=observatorio.xlsx",
    },
  });
}

