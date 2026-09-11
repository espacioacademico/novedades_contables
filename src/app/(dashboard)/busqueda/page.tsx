"use client";

import { useState } from "react";

export default function BusquedaPage() {
  const [q, setQ] = useState("");
  const [resultados, setResultados] = useState<{ title: string }[]>([]);

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/buscar?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResultados(data.resultados ?? []);
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Búsqueda semántica</h1>
      <form onSubmit={buscar} className="mt-6 flex gap-2">
        <input
          id="busqueda-query"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por concepto jurídico…"
          className="flex-1 rounded border border-neutral-300 px-3 py-2"
        />
        <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-white">
          Buscar
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {resultados.map((r) => (
          <li key={r.title} className="rounded border border-neutral-200 p-3">
            {r.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

