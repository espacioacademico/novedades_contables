import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.suseso.cl";

export class SusesoScraper extends BaseScraper {
  sourceId = "suseso";
  sourceName = "Superintendencia de Seguridad Social";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: recorrer el listado de circulares y dictámenes del sitio
    // institucional; sin API pública conocida a la fecha.
    void BASE_URL;
    return [];
  }
}

