import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.cmfchile.cl";

export class CmfScraper extends BaseScraper {
  sourceId = "cmf";
  sourceName = "Comisión para el Mercado Financiero";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: la sección de Normativa publica NCG y oficios circulares con
    // un feed propio; validar si expone RSS antes de scrapear el HTML.
    void BASE_URL;
    return [];
  }
}

