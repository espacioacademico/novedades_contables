# ingesta-diaria (Edge Function)

Respaldo del cron de Vercel: llama al mismo endpoint `/api/cron/diario` de la
app Next.js. Se activa si Vercel Cron falla, mediante `pg_cron` +
`pg_net` programado en Supabase.

## Pendiente

- [ ] `index.ts` con el `fetch` al endpoint, usando `CRON_SECRET` como bearer token.
- [ ] Programar la ejecución con `select cron.schedule(...)` apuntando a esta función.

