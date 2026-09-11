import { BaseScraper } from "./base-scraper";
import type { RawDocument } from "@/types";

const BASE_URL = "https://www.dt.gob.cl";

export class DireccionTrabajoScraper extends BaseScraper {
  sourceId = "direccion-trabajo";
  sourceName = "Dirección del Trabajo";

  async fetchLatest(): Promise<RawDocument[]> {
    // TODO: el buscador de dictámenes es dinámico (formulario POST).
    // Inspeccionar la solicitud XHR real del buscador en dt.gob.cl y
    // replicarla, o recorrer las páginas de resultados por fecha.
    void BASE_URL;
    return [];
  }
}

