# Julio Junk Removal — Contexto del Proyecto

Sitio web para el cliente **Julio Junk Removal**, negocio de retiro de chatarra. Objetivo principal: convertir visitas en llamadas. SEO local es crítico.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS v3
- `motion` v12 (Framer Motion) — ya instalado, usar para todas las animaciones
- `next-intl` v3 — i18n EN (default `/`) y ES (`/es/`)

## Arquitectura de componentes

```
src/components/
├── layout/      Nav, Footer — elementos globales presentes en todas las páginas
├── sections/    Bloques reutilizables entre páginas (TrustBar, Testimonials, FAQ, ContactForm, FinalCTA…)
├── pages/       Componentes exclusivos de una página específica
│   ├── about/   AboutHero · AboutStory · AboutValues
│   ├── services/ ServicesHero · ServiceCategories
│   └── contact/ ContactHero · ContactInfo · ContactFormFull
└── ui/          Componentes pequeños reutilizables (CountUp, WhatsAppButton, Button, Badge…)
```

**Reglas:**
- `page.tsx` actúa solo como orquestador: importa y ordena secciones, sin lógica de presentación.
- Nunca crear duplicados como `TrustBar2`. Si hay variantes, usar props (`variant`).
- No crear archivos monolíticos tipo `AboutPageContent.tsx`. Dividir siempre en componentes pequeños dentro de `pages/<nombre>/`.

## Estructura de páginas

**Home:** `src/app/[locale]/page.tsx`
**Páginas adicionales creadas:** `/about` · `/services` · `/contact`

## Secciones del Home (en orden)

Nav → Hero → TrustBar → Services → WhyChooseUs → HowItWorks → Pricing → Testimonials → ServiceAreas → FAQ → ContactForm → FinalCTA → Footer + WhatsAppButton flotante

## Regla: Referencias de código externo

Cuando el usuario pase un fragmento de código como referencia (React Bits, CodePen, CSS snippets, etc.), **no copiarlo directamente**. En su lugar:

1. Evaluar qué herramienta del stack resuelve mejor el problema: Tailwind CSS, CSS puro (`globals.css`), o Framer Motion (`motion/react`).
2. Elegir la opción más adecuada según el tipo de efecto:
   - **Layout / spacing / colores / estados simples** → Tailwind
   - **Keyframes, transiciones sin JS, scroll-state** → CSS en `globals.css`
   - **Animaciones dirigidas por estado React, entrada/salida, física** → Framer Motion
3. Si la referencia usa una API con soporte de navegador limitado (ej. `container-type: scroll-state`), reemplazarla con una solución universal usando las herramientas del stack.

El fragmento de referencia es contexto, no instrucciones literales a seguir.

## Animaciones — Plan acordado

| Animación | Herramienta | Estado |
|-----------|-------------|--------|
| Ken Burns + crossfade hero | `motion/react` + `AnimatePresence` | IMPLEMENTADO |
| Scroll reveal secciones | Framer Motion `whileInView` | Pendiente |
| Hidey bar (nav se oculta al hacer scroll down) | JS scroll event | Pendiente |
| Hover Reveal slide-up gradient caption (service cards) | Framer Motion `whileHover` variants | IMPLEMENTADO |
| Premium accordion FAQ | Framer Motion `AnimatePresence` | Pendiente |
| Shimmer/pulse CTA button | CSS `@keyframes` | Pendiente |
| Infinite auto-scrolling testimonials carousel | CSS `@keyframes` animation loop | Pendiente |

## Configuración de datos del cliente

Todos los datos reales van en variables de entorno. Ver `src/lib/config.ts`:
- `NEXT_PUBLIC_PHONE` — teléfono real (pendiente del cliente)
- `NEXT_PUBLIC_PHONE_HREF` — tel: link
- `NEXT_PUBLIC_WHATSAPP` — número de WhatsApp
- `NEXT_PUBLIC_CITY` / `NEXT_PUBLIC_STATE` — ubicación de servicio
- `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_FACEBOOK`, `NEXT_PUBLIC_INSTAGRAM`

## Branding pendiente

La hermana del desarrollador entregará: logotipo, paleta de colores, tipografía. Cuando llegue:
1. Actualizar variables de color en `tailwind.config`
2. Configurar fuentes con `next/font`
3. Reemplazar el ícono SVG del nav por el logo real

## Documentación existente

- `ROL1-UX-SEO.md` — copy completo EN/ES para todas las secciones + estrategia SEO local. Leerlo antes de modificar cualquier texto.

## Datos del cliente aún pendientes

- Teléfono y WhatsApp real
- Ciudad y Estado de operación
- Ciudades adicionales que atienden
- Links de redes sociales
- Fotos reales del equipo y trabajos
- Horario real de operación
- ¿Tiene acreditación BBB?
- Verificar si las estadísticas (500+, 98%, 4.9/5) son reales

## Google Stitch MCP

Prototipo del sitio en Google Stitch. MCP ya agregado a config local de Claude Code. Usar en sesión nueva para acceder a las pantallas del prototipo.
