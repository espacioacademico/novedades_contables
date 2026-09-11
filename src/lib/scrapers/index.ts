import { SiiScraper } from "./sii";
import { DireccionTrabajoScraper } from "./direccion-trabajo";
import { PoderJudicialScraper } from "./poder-judicial";
import { DiarioOficialScraper } from "./diario-oficial";
import { ContraloriaScraper } from "./contraloria";
import { CmfScraper } from "./cmf";
import { SusesoScraper } from "./suseso";
import { MinisterioHaciendaScraper } from "./ministerio-hacienda";
import type { BaseScraper } from "./base-scraper";

export const scrapers: BaseScraper[] = [
  new SiiScraper(),
  new DireccionTrabajoScraper(),
  new PoderJudicialScraper(),
  new DiarioOficialScraper(),
  new ContraloriaScraper(),
  new CmfScraper(),
  new SusesoScraper(),
  new MinisterioHaciendaScraper(),
];

export { BaseScraper } from "./base-scraper";

