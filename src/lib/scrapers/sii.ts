import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

// Verificado manualmente el 10-09-2026: el listado de circulares del año en
// curso vive en indcir<año>.htm y presenta cada circular como un bloque
// "N° <numero> [<fecha>] <materia>" con enlace al PDF oficial.
const INDICE_CIRCULARES = "https://www.sii.cl/normativa_legislacion/circulares/2026/indcir2026.htm";

const MESES: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  setiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

// "31 de Agosto del 2026" -> "2026-08-31"
function parseFechaChilena(fecha: string): string {
  const m = fecha.trim().match(/(\d{1,2})\s+de\s+([a-zA-ZÁÉÍÓÚáéíóúñÑ]+)\s+del?\s+(\d{4})/i);
  if (!m) return new Date().toISOString().slice(0, 10);
  const [, dia, mesNombre, anio] = m;
  const mes = MESES[mesNombre.toLowerCase()] ?? "01";
  return `${anio}-${mes}-${dia.padStart(2, "0")}`;
}

function limpiarHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó")
    .replace(/&uacute;/gi, "ú")
    .replace(/&ntilde;/gi, "ñ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// Cada circular aparece como un <h5> con el enlace al PDF (número y fecha en
// el texto del enlace) seguido de un <p> con la materia y la fuente. El "N°"
// puede venir como carácter literal (°/º) o como entidad HTML (&deg;/&ordm;)
// según cómo el CMS del SII haya exportado la página.
const BLOQUE_CIRCULAR =
  /<h5[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>\s*Circular\s+N(?:°|º|&deg;|&ordm;)\s*(\d+)\s+del\s+([^<]+?)\s*<\/a>\s*<\/h5>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;

export class SiiScraper extends BaseScraper {
  sourceId = "sii";
  sourceName = "Servicio de Impuestos Internos";

  async fetchLatest(): Promise<RawDocument[]> {
    const res = await fetch(INDICE_CIRCULARES, {
      headers: { "User-Agent": "ObservatorioJuridicoTributario/0.1 (+monitoreo interno)" },
    });
    if (!res.ok) {
      throw new Error(`SII: no se pudo obtener el índice de circulares (HTTP ${res.status})`);
    }
    const html = await res.text();

    const documentos: RawDocument[] = [];
    let match: RegExpExecArray | null;
    while ((match = BLOQUE_CIRCULAR.exec(html)) !== null) {
      const [, href, numero, fechaTexto, parrafoHtml] = match;
      const materia = limpiarHtml(parrafoHtml).replace(/\*?\s*Fuente:.*$/i, "").trim();
      if (!materia) continue;

      documentos.push({
        sourceId: this.sourceId,
        title: `Circular N° ${numero} — ${materia.slice(0, 140)}`,
        officialNumber: numero,
        documentType: "Circular",
        publishedAt: parseFechaChilena(fechaTexto),
        sourceUrl: href.startsWith("http") ? href : new URL(href, INDICE_CIRCULARES).toString(),
        rawContent: materia,
      });
    }

    // TODO: repetir el mismo patrón para /resoluciones/, /oficios/ y
    // /jurisprudencia_administrativa/ del mismo año — comparten la
    // estructura h5 + p, solo cambia el índice de origen.
    return documentos;
  }
}
