// Todo scraper de fuente oficial implementa este contrato.
import { createHash } from "node:crypto";
import type { RawDocument } from "@/types";

export abstract class BaseScraper {
  abstract sourceId: string;
  abstract sourceName: string;

  abstract fetchLatest(): Promise<RawDocument[]>;

  protected hashContent(content: string): string {
    return createHash("sha256").update(content).digest("hex");
  }

  async run(): Promise<RawDocument[]> {
    const docs = await this.fetchLatest();
    return docs.filter((d) => d.rawContent.trim().length > 0);
  }
}

