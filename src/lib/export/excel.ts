import ExcelJS from "exceljs";

interface FilaExportable {
  title: string;
  source: string;
  materia: string;
  impacto: string;
  published_at: string;
}

export async function generarExcel(filas: FilaExportable[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Documentos");

  sheet.columns = [
    { header: "Documento", key: "title", width: 60 },
    { header: "Fuente", key: "source", width: 24 },
    { header: "Materia", key: "materia", width: 20 },
    { header: "Impacto", key: "impacto", width: 12 },
    { header: "Fecha", key: "published_at", width: 14 },
  ];
  sheet.getRow(1).font = { bold: true };
  filas.forEach((fila) => sheet.addRow(fila));

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

