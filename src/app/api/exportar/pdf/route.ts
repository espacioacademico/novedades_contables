import { NextResponse } from "next/server";

export async function GET() {
  // TODO: depende de generarPdf() en src/lib/export/pdf.ts (pendiente).
  return NextResponse.json({ error: "exportación a PDF pendiente de implementación" }, { status: 501 });
}

