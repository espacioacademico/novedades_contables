interface FilaExportable {
  title: string;
  source: string;
  materia: string;
  impacto: string;
  published_at: string;
}

export async function generarPdf(filas: FilaExportable[]): Promise<Buffer> {
  // TODO: elegir generador de PDF (p. ej. @react-pdf/renderer o pdfkit)
  // y maquetar un informe con encabezado, tabla y pie de página.
  void filas;
  throw new Error("generarPdf: pendiente de implementación");
}

