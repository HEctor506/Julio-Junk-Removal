---
description: Launch and verify the Julio Junk Removal Next.js dev server
---

# Run Skill — Julio Junk Removal

## Stack
Next.js 14 (App Router), TypeScript, Tailwind CSS v3. Puerto por defecto: **3000**.

## Levantar el servidor

```bash
npm run dev
```

Corre en background. Esperar hasta que aparezca `✓ Ready on http://localhost:3000`.

## Verificar que levantó

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Debe devolver `200`.

## Rutas del sitio

| Ruta | Descripción |
|------|-------------|
| `http://localhost:3000` | Home (locale EN) |
| `http://localhost:3000/es` | Home (locale ES) |
| `http://localhost:3000/services` | Página de servicios |
| `http://localhost:3000/about` | Página about |
| `http://localhost:3000/contact` | Página de contacto |

## Verificar cambios visuales (mobile)

Usar DevTools de Chrome/Edge con emulación mobile (375×812, iPhone SE o similares).

Para screenshot programático con Playwright:

```bash
npx playwright screenshot --viewport-size="375,812" http://localhost:3000 screenshot-mobile.png
```

## Notas

- No requiere variables de entorno para correr en dev (los valores de `src/lib/config.ts` tienen defaults).
- Si el puerto 3000 está ocupado, Next.js sube automáticamente a 3001. Ajustar la URL en consecuencia.
- El servidor se recarga automáticamente al guardar archivos (Fast Refresh).
