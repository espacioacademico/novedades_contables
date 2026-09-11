import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface DocumentoGuardado {
  id: string;
  title: string;
  source_id: string;
}

export async function enviarInformeDiario(documentos: DocumentoGuardado[]) {
  if (documentos.length === 0) return;

  // TODO: reemplazar por la lista real de suscripciones activas
  // (tabla subscriptions) y renderizar un template HTML con el
  // resumen ejecutivo y nivel de impacto de cada documento.
  const destinatarios = (process.env.INFORME_DIARIO_DESTINATARIOS ?? "").split(",").filter(Boolean);
  if (destinatarios.length === 0) return;

  await resend.emails.send({
    from: "Observatorio Jurídico Tributario <observatorio@resend.dev>",
    to: destinatarios,
    subject: `Informe diario — ${documentos.length} documentos nuevos`,
    text: documentos.map((d) => `- ${d.title}`).join("\n"),
  });
}

