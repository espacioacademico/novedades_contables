import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.hacienda.cl";

export class MinisterioHaciendaScraper extends BaseScraper {
  sourceId = "ministerio-hacienda";
  sourceName = "Ministerio de Hacienda";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: cubrir decretos y comunicados de prensa; el monitoreo de
    // proyectos de ley es referencial vía Boletín del Congreso.
    void BASE_URL;
    return [];
  }
}
