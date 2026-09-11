import { ultimosDocumentos } from "@/lib/db/queries";

export default async function DashboardPage() {
  const documentos = await ultimosDocumentos(20);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-semibold">Observatorio Jurídico Tributario</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Últimos {documentos.length} documentos detectados.
      </p>

      <ul className="mt-6 divide-y divide-neutral-200">
        {documentos.map((doc) => (
          <li key={doc.id} className="py-3">
            <a href={`/documentos/${doc.id}`} className="font-medium hover:underline">
              {doc.title}
            </a>
            <div className="text-sm text-neutral-500">
              {doc.sources?.name} · {doc.published_at}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

