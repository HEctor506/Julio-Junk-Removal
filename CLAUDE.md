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

---

## Sistema i18n — Cómo agregar texto traducible

Todo texto visible al usuario vive en dos archivos JSON. Nunca poner strings en inglés o español directamente en los componentes.

```
messages/
├── en.json   ← inglés (idioma por defecto)
└── es.json   ← español (/es/)
```

### Flujo estándar: crear texto nuevo

1. **Agregar la clave en `en.json`** (o en `es.json` si empezás por español — lo que prefieras)
2. **Agregar la misma clave en el otro idioma**
3. **Usar la clave en el componente**

Ejemplo: agregar un nuevo badge de eyebrow en una sección.

**`messages/en.json`**
```json
"mySection": {
  "eyebrow": "Our Work",
  "h2": "See What We Do"
}
```

**`messages/es.json`**
```json
"mySection": {
  "eyebrow": "Nuestro Trabajo",
  "h2": "Mira Lo Que Hacemos"
}
```

**En el componente:**
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MySection() {
  const t = useTranslations('mySection');
  return <span>{t('eyebrow')}</span>;
}
```

### Agregar una página nueva

1. Crear la carpeta de página: `src/app/[locale]/nueva-pagina/page.tsx`
2. Crear componentes en: `src/components/pages/nueva-pagina/`
3. Agregar las claves en ambos JSON bajo un namespace propio: `"nuevaPagina": { ... }`
4. Agregar el link de navegación al nav en `messages/en.json` y `messages/es.json` bajo `"nav"`

### Interpolación de variables en strings

Cuando el texto necesita un valor dinámico (ciudad, año, teléfono):

**JSON:**
```json
"serving": "Serving {city} & Beyond"
```

**Componente:**
```tsx
t('serving', { city: siteConfig.city })
```

### Arrays (listas de items)

Cuando una clave es un array de objetos o strings, usar `t.raw()` con guard defensivo obligatorio:

```tsx
const rawItems = t.raw('items');
const items: MyType[] = Array.isArray(rawItems) ? rawItems : [];
```

**Por qué el guard:** durante el cambio de idioma (locale switch), Next.js re-renderiza antes de que las nuevas traducciones estén listas. Sin el guard, `t.raw()` puede devolver algo que no es array y romper `.map()`.

### Regla: `useTranslations` vs `getTranslations`

| Situación | Hook a usar |
|-----------|-------------|
| Componente con `'use client'` | `useTranslations` de `next-intl` |
| Componente hijo de uno `'use client'` | `useTranslations` (aunque no tenga estado propio) |
| Componente `async` server puro (sin padre cliente) | `getTranslations` de `next-intl/server` |

**Regla crítica:** si un componente es importado dentro de un árbol `'use client'` (como Banner dentro de Nav), DEBE usar `useTranslations`, nunca `async/await getTranslations`. De lo contrario React lanza: *"async/await is not yet supported in Client Components"*.

### Qué NO va en los JSON

- URLs de imágenes → hardcoded en el componente
- Íconos SVG → hardcoded en el componente
- Hrefs y rutas → hardcoded o via `siteConfig`
- Datos de config (teléfono, ciudad, etc.) → `src/lib/config.ts` vía env vars
