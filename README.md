# Observatorio Jurídico Tributario Inteligente

Sistema de monitoreo normativo automatizado que vigila a diario ocho fuentes oficiales chilenas —tributarias, laborales, comerciales, contables y jurisprudenciales— y transforma lo publicado en resúmenes accionables mediante la API de Claude.

> Especificación completa de arquitectura, modelo de datos y plan de despliegue: ver el documento técnico publicado (enlace del artefacto Claude).

## Qué hace

1. Ejecuta scrapers diarios contra ocho organismos oficiales.
2. Deduplica por hash de contenido antes de gastar tokens de IA.
3. Clasifica cada documento nuevo por materia (tributario, comercial, laboral, contable, jurisprudencia).
4. Genera un resumen ejecutivo y una calificación de impacto (alto / medio / bajo) con Claude.
5. Persiste todo en PostgreSQL (Supabase) con embeddings para búsqueda semántica.
6. Expone un dashboard filtrable y una búsqueda semántica.
7. Envía un informe diario por correo y permite exportar a Excel y PDF.

## Fuentes monitoreadas

| Institución | Contenido |
|---|---|
| Servicio de Impuestos Internos (SII) | Circulares, resoluciones exentas, oficios |
| Dirección del Trabajo | Dictámenes, ordinarios, circulares |
| Poder Judicial | Sentencias de Corte Suprema y Cortes de Apelaciones |
| Diario Oficial | Leyes, decretos, resoluciones |
| Contraloría General de la República | Dictámenes, resoluciones, informes de auditoría |
| Comisión para el Mercado Financiero (CMF) | Normas de Carácter General, oficios circulares |
| Superintendencia de Seguridad Social (SUSESO) | Circulares, dictámenes |
| Ministerio de Hacienda | Decretos, proyectos de ley, comunicados |

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres + pgvector + Auth + Edge Functions) · Claude API.

## Estado del proyecto

Este repositorio es un **esqueleto inicial**: el scraper del SII (`src/lib/scrapers/sii.ts`) ya tiene `fetchLatest()` implementado contra el HTML real del índice de circulares; los scrapers de las demás fuentes (`src/lib/scrapers/*.ts`) siguen con la interfaz definida pero `fetchLatest()` pendiente de implementar contra el HTML real de cada sitio. El contrato base, la clasificación con Claude, el orquestador del cron y el cliente de Supabase ya tienen una implementación de referencia funcional. El esquema SQL en `supabase/migrations/0001_init.sql` está completo y listo para aplicar.

## Primeros pasos

```bash
npm install
cp .env.example .env.local   # completar las variables
npm run dev
```

Antes de desplegar, aplicar las migraciones:

```bash
supabase db push
```

## Estructura

```
src/
  app/                 # rutas de Next.js (dashboard, API, cron)
  lib/
    scrapers/          # un archivo por fuente oficial
    ai/                # clasificación, resumen e impacto vía Claude
    db/                # cliente de Supabase y queries
    email/              # informe diario
    export/             # exportación a Excel / PDF
  components/          # UI del dashboard
  types/               # tipos compartidos
supabase/
  migrations/          # esquema SQL
  functions/           # función programada de respaldo del cron
```

## Licencia

Uso interno. Los resúmenes generados por IA son una primera lectura, no asesoría legal: cada documento enlaza siempre a su fuente oficial.
