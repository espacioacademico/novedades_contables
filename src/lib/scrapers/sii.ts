import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

// Verificado manualmente el 10-09-2026: el listado de circulares del año en
// curso vive en indcir<año>.htm y presenta cada circular como un bloque
// "N° <numero> [<fecha>] <materia>" con enlace al PDF oficial.
const INDICE_CIRCULARES = "https://www.sii.cl/normativa_legislacion/circulares/2026/indcir2026.htm";

export class SiiScraper extends BaseScraper {
  sourceId = "sii";
  sourceName = "Servicio de Impuestos Internos";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: hacer fetch(INDICE_CIRCULARES), parsear con cheerio los bloques
    // <h5> (número + fecha) seguidos del párrafo de materia, y resolver el
    // href del PDF adjunto para descargar el texto completo con pdf-parse.
    // Repetir para /resoluciones/, /oficios/ y /jurisprudencia_administrativa/.
    void INDICE_CIRCULARES;
    return [];
  }
}

