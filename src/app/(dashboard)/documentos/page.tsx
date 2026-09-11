import { ultimosDocumentos } from "@/lib/db/queries";

// TODO: agregar filtros por materia, fuente y nivel de impacto (query params).
export default async function DocumentosPage() {
  const documentos = await ultimosDocumentos(100);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-semibold">Documentos</h1>
      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500">
            <th className="py-2">Documento</th>
            <th className="py-2">Fuente</th>
            <th className="py-2">Impacto</th>
            <th className="py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((doc) => (
            <tr key={doc.id} className="border-t border-neutral-200">
              <td className="py-2">
                <a href={`/documentos/${doc.id}`} className="hover:underline">
                  {doc.title}
                </a>
              </td>
              <td className="py-2">{doc.sources?.name}</td>
              <td className="py-2">{doc.impact_scores?.[0]?.level ?? "—"}</td>
              <td className="py-2">{doc.published_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

