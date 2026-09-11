export default function ReportesPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Reportes</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Exporta el listado completo de documentos detectados.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="/api/exportar/excel" className="rounded border border-neutral-300 px-4 py-2 text-sm">
          Exportar a Excel
        </a>
        <a href="/api/exportar/pdf" className="rounded border border-neutral-300 px-4 py-2 text-sm">
          Exportar a PDF
        </a>
      </div>
    </main>
  );
}

