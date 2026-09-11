import { claude, CLAUDE_MODEL } from "./claude-client";
import type { AnalisisDocumento, RawDocument } from "@/types";

const MATERIAS = [
  "Derecho Tributario",
  "Derecho Comercial",
  "Derecho Laboral",
  "Contabilidad",
  "Jurisprudencia",
] as const;

export async function analizarDocumento(doc: RawDocument): Promise<AnalisisDocumento> {
  const msg = await claude.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 1024,
    system:
      "Eres un analista jurídico-tributario senior. Clasifica, resume y " +
      "evalúa el impacto de documentos oficiales chilenos. Responde solo JSON válido.",
    messages: [
      {
        role: "user",
        content:
          `Documento (${doc.documentType}, ${doc.publishedAt}):\n\n${doc.rawContent}\n\n` +
          `Devuelve JSON con: materia (una de ${MATERIAS.join(", ")}), ` +
          `resumen_ejecutivo (máx. 120 palabras), puntos_clave (3 a 5 strings), ` +
          `nivel_impacto (alto|medio|bajo), justificacion_impacto.`,
      },
    ],
  });

  const block = msg.content[0];
  return JSON.parse(block.type === "text" ? block.text : "{}") as AnalisisDocumento;
}

