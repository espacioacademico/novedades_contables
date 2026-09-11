import type { NivelImpacto } from "@/types";

// El nivel de impacto lo determina analizarDocumento() en clasificador.ts
// (una sola llamada a Claude cubre materia + resumen + impacto). Este
// módulo queda para reglas de negocio adicionales, p. ej. forzar "alto"
// cuando el documento menciona un plazo perentorio próximo a vencer.
export function ajustarPorReglas(nivel: NivelImpacto, rawContent: string): NivelImpacto {
  const mencionaPlazoUrgente = /\b(dentro de|plazo de)\s+\d{1,2}\s+d[ií]as\b/i.test(rawContent);
  if (nivel === "medio" && mencionaPlazoUrgente) return "alto";
  return nivel;
}

