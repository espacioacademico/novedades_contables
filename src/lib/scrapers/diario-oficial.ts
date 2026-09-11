import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.diariooficial.interior.gob.cl";

export class DiarioOficialScraper extends BaseScraper {
  sourceId = "diario-oficial";
  sourceName = "Diario Oficial";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: descargar la edición del día (PDF o HTML según sección:
    // Normas Generales, Avisos Destacados) y separar por publicación
    // individual antes de pasar cada una por el clasificador.
    void BASE_URL;
    return [];
  }
}

