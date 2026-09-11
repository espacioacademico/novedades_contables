import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.contraloria.cl";

export class ContraloriaScraper extends BaseScraper {
  sourceId = "contraloria";
  sourceName = "Contraloría General de la República";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: el sistema de Jurisprudencia Administrativa expone búsqueda
    // por fecha; recorrer los dictámenes emitidos el día anterior.
    void BASE_URL;
    return [];
  }
}

