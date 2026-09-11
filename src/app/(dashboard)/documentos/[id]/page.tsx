import { documentoPorId } from "@/lib/db/queries";

export default async function DocumentoDetallePage({ params }: { params: { id: string } }) {
  const doc = await documentoPorId(params.id);

  return (
    <main className="mx-auto max-w-3xl p-8">
      <a href="/documentos" className="text-sm text-neutral-500 hover:underline">
        ← Volver
      </a>
      <h1 className="mt-2 text-2xl font-semibold">{doc.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {doc.sources?.name} · publicado {doc.published_at} ·{" "}
        <a href={doc.source_url} target="_blank" rel="noreferrer" className="underline">
          ver original ↗
        </a>
      </p>

      <p className="mt-6">{doc.summaries?.[0]?.executive_summary}</p>

      <ul className="mt-4 list-disc pl-5 text-sm">
        {(doc.summaries?.[0]?.key_points ?? []).map((punto: string) => (
          <li key={punto}>{punto}</li>
        ))}
      </ul>
    </main>
  );
}

