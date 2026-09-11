import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.pjud.cl";

export class PoderJudicialScraper extends BaseScraper {
  sourceId = "poder-judicial";
  sourceName = "Poder Judicial";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: el buscador jurisprudencial de la Corte Suprema requiere
    // sesión/captcha en algunos flujos; evaluar el motor de búsqueda
    // público de sentencias y filtrar por fecha de publicación del fallo.
    void BASE_URL;
    return [];
  }
}

