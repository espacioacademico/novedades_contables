export type Materia =
  | "Derecho Tributario"
  | "Derecho Comercial"
  | "Derecho Laboral"
  | "Contabilidad"
  | "Jurisprudencia";

export type NivelImpacto = "alto" | "medio" | "bajo";

export interface RawDocument {
  sourceId: string;
  title: string;
  officialNumber?: string;
  documentType: string;
  publishedAt: string; // ISO date
  sourceUrl: string;
  rawContent: string;
}

export interface AnalisisDocumento {
  materia: Materia;
  resumen_ejecutivo: string;
  puntos_clave: string[];
  nivel_impacto: NivelImpacto;
  justificacion_impacto: string;
}

