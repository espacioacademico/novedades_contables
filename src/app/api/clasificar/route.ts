import { NextResponse } from "next/server";
import { analizarDocumento } from "@/lib/ai/clasificador";
import type { RawDocument } from "@/types";

// Endpoint manual para reclasificar un documento puntual (p. ej. desde el
// dashboard, botón "Reprocesar"). El flujo automático vive en /api/cron/diario.
export async function POST(request: Request) {
  const doc = (await request.json()) as RawDocument;
  const analisis = await analizarDocumento(doc);
  return NextResponse.json(analisis);
}

