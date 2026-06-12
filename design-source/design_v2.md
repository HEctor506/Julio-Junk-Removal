# Design System v2 — Julio's Junk Removal

> **Fuente de verdad visual** para todas las implementaciones de código.  
> Generado a partir de: `design-source/` (logo, design-system.jpeg, lustra-text-bold.ttf, nueva-homePage-reference.png)

---

## 0. Principios

| Principio | Aplicación |
|-----------|------------|
| Mobile-first | Toda clase Tailwind base es mobile; breakpoints añaden, no sobrescriben |
| Visual identity | Forest green `#013e37` + Mint `#88deb1` — jamás mezclar con colores previos (azul/naranja) |
| Premium pero cercano | Tipografía bold y limpia, no serif fría ni display exagerado |
| Restricciones duras | NO cambiar estructura, orden de secciones, contenido, SEO, arquitectura de componentes |
| Lustra = headings only | Lustra Text Bold únicamente en H1–H4, nav labels, botones y badges. Inter para body |

---

## 1. Color System

### Paleta oficial extraída del branding

```
Forest  #013e37   — verde bosque oscuro (color primario de marca)
Mint    #88deb1   — verde menta/seafoam (acento oficial)
```

### Tokens completos → reemplazar en `tailwind.config.ts`

```ts
colors: {
  // ── Primario: Forest Green ──────────────────────────────
  primary:                  '#013e37',   // forest — base de marca
  'primary-container':      '#015748',   // forest oscuro — fondos de sección dark
  'on-primary':             '#ffffff',   // texto sobre forest
  'on-primary-container':   '#88deb1',   // mint sobre forest container

  // ── Acento: Mint ────────────────────────────────────────
  secondary:                '#013e37',   // reutilizado: forest como secondary emphasis
  'secondary-container':    '#88deb1',   // MINT — el acento visual de la marca
  'on-secondary':           '#013e37',   // forest sobre mint (texto oscuro en acento)
  'on-secondary-container': '#013e37',   // forest sobre mint

  // ── Superficies ─────────────────────────────────────────
  background:               '#ffffff',
  surface:                  '#ffffff',
  'surface-dim':            '#d4f0e3',   // mint muy suave
  'surface-bright':         '#ffffff',
  'surface-container-low':  '#f0faf5',   // mint ultra ligero — fondos de sección alternos
  'surface-container':      '#e0f5ec',   // mint ligero
  'surface-container-high': '#c8edd9',   // mint medio
  'surface-container-highest': '#b4e4c8',
  'surface-container-lowest':  '#ffffff',

  // ── Texto ───────────────────────────────────────────────
  'on-surface':             '#0a1a15',   // casi negro con tinte verde
  'on-surface-variant':     '#3d5047',   // gris-verde apagado — subtítulos, metadata

  // ── Inversas / Footer ───────────────────────────────────
  'inverse-surface':        '#013e37',   // forest — fondos muy oscuros
  'inverse-on-surface':     '#e8f5ee',   // texto claro sobre forest

  // ── Bordes ──────────────────────────────────────────────
  outline:                  '#6b8070',   // gris-verde
  'outline-variant':        '#b8d4c4',   // gris-verde suave — separadores

  // ── Surface tint ────────────────────────────────────────
  'surface-tint':           '#013e37',

  // ── Tertiary (eliminado como rol independiente) ─────────
  tertiary:                 '#013e37',
  'tertiary-container':     '#015748',
  'on-tertiary':            '#ffffff',
  'on-tertiary-container':  '#88deb1',
},
```

### Reglas de uso de color

| Contexto | Token | Hex |
|----------|-------|-----|
| Fondo de página | `background` | `#ffffff` |
| Sección alterna (clara) | `surface-container-low` | `#f0faf5` |
| Sección dark (hero overlay, CTA final, footer) | `primary` / `primary-container` | `#013e37` / `#015748` |
| Heading principal | `on-surface` | `#0a1a15` |
| Heading sobre dark | `on-primary` | `#ffffff` |
| Acento visual / badges / iconos activos | `secondary-container` | `#88deb1` |
| Texto sobre acento mint | `on-secondary-container` | `#013e37` |
| Subtítulos / metadata | `on-surface-variant` | `#3d5047` |
| Bordes de cards | `outline-variant` | `#b8d4c4` |

### Jamás usar
- `#00355f` (azul anterior)
- `#fd761a` (naranja anterior)
- `#0f4c81`
- `#9d4300`
- Cualquier tono azul o cálido no listado arriba

---

## 2. Typography System

### Fuentes

| Rol | Familia | Peso | Carga |
|-----|---------|------|-------|
| Display / Headlines | **Lustra Text** | Bold (700) | `@font-face` local desde `/public/fonts/lustra-text-bold.ttf` |
| Body / UI text | **Inter** | 400, 600 | Google Fonts (ya cargado) |

### Setup requerido (globals.css — ejecutar antes de codificar)

```css
/* 1. Copiar design-source/lustra-text-bold.ttf → public/fonts/lustra-text-bold.ttf */

@font-face {
  font-family: 'Lustra Text';
  src: url('/fonts/lustra-text-bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* 2. Eliminar import de Montserrat del Google Fonts */
/* Mantener: Inter 400, 600 */
```

### Actualización de `tailwind.config.ts` — fontFamily

```ts
fontFamily: {
  display:  ['Lustra Text', 'sans-serif'],  // H1, hero headlines
  headline: ['Lustra Text', 'sans-serif'],  // H2, H3, H4, nav, botones, badges
  body:     ['Inter', 'sans-serif'],         // párrafos, metadata, UI text
  label:    ['Inter', 'sans-serif'],         // labels, captions
},
```

### Escala tipográfica (sin cambios de tamaño — solo fuente)

```ts
fontSize: {
  'display-lg':     ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
  'display-mobile': ['36px', { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '700' }],
  'headline-lg':    ['32px', { lineHeight: '1.15', fontWeight: '700' }],
  'headline-md':    ['24px', { lineHeight: '1.3',  fontWeight: '700' }],
  'body-lg':        ['18px', { lineHeight: '1.65', fontWeight: '400' }],
  'body-md':        ['16px', { lineHeight: '1.55', fontWeight: '400' }],
  'label-bold':     ['13px', { lineHeight: '1.0',  letterSpacing: '0.08em', fontWeight: '600' }],
},
```

### Reglas tipográficas

- `font-display` (Lustra) → solo en H1 dentro de Hero
- `font-headline` (Lustra) → H2, H3, H4, nav links, botones, badges, `ColTitle` en footer
- `font-body` (Inter) → todos los párrafos `<p>`, descripciones, metadata
- `font-label` (Inter) → captions, timestamps, texto auxiliar pequeño
- Nav labels: `font-headline uppercase tracking-widest` — Lustra all-caps es el look del hero de referencia
- **Nunca** usar Montserrat — reemplazada completamente por Lustra

---

## 3. Spacing & Layout

Sin cambios en valores — el layout actual está bien calibrado.

```ts
spacing: {
  section:          '120px',   // py desktop
  'section-mobile': '80px',    // py mobile
  container:        '1280px',  // max-width
  gutter:           '24px',    // gap interno
  'margin-mobile':  '16px',    // px mobile
  'margin-desktop': '40px',    // px desktop
},
maxWidth: {
  container: '1280px',
},
```

### Clases de layout (globals.css — sin cambios)

```css
.section-padding  { @apply py-20 md:py-[120px] px-4 md:px-10; }
.container-max    { @apply max-w-container mx-auto; }
```

---

## 4. Border Radius

```ts
borderRadius: {
  DEFAULT: '0.25rem',  // 4px — input borders, badges pequeños
  lg:      '0.5rem',   // 8px
  xl:      '0.75rem',  // 12px — inputs
  '2xl':   '1rem',     // 16px — cards
  '3xl':   '1.5rem',   // 24px — cards destacados, CTA section
  full:    '9999px',   // botones pill (CTA principal)
},
```

**Regla:** Botones CTA primarios → `rounded-full` (pill), como en el hero de referencia. Cards → `rounded-2xl`.

---

## 5. Elevation / Shadows

Adaptar tonalidades de sombra a forest green (eliminar blue tint).

```ts
boxShadow: {
  card:        '0px 2px 12px rgba(1, 62, 55, 0.06)',
  'card-hover':'0px 8px 28px rgba(1, 62, 55, 0.13)',
  xl:          '0px 20px 48px rgba(1, 62, 55, 0.18)',
  'glow-mint': '0px 0px 24px rgba(136, 222, 177, 0.35)', // glow acento en botones hover
},
```

---

## 6. Component System

### 6.1 Buttons

#### `btn-primary` — CTA principal (llamar / contactar)
```css
.btn-primary {
  @apply bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold
         shadow-card-hover hover:shadow-xl hover:brightness-110
         transition-all duration-200 active:scale-95
         flex items-center justify-center gap-2;
}
```
*Apariencia: Forest solid, texto blanco, pill shape — como el botón de teléfono en hero-reference.*

#### `btn-shimmer` — CTA animado (mint shimmer)
```css
/* Reemplazar el gradiente naranja por mint */
.btn-shimmer {
  @apply relative overflow-hidden rounded-full font-headline font-bold
         text-on-secondary-container;  /* texto forest */
  background: linear-gradient(
    90deg,
    #88deb1 0%,
    #a8ebca 40%,
    #88deb1 60%,
    #88deb1 100%
  );
  background-size: 200% auto;
  animation: shimmer 2.4s linear infinite;
}
```

#### `btn-secondary` — Acción secundaria
```css
.btn-secondary {
  @apply bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full
         font-headline font-bold shadow-card
         hover:brightness-105 hover:shadow-glow-mint
         transition-all duration-200 active:scale-95
         flex items-center justify-center gap-2;
}
```
*Apariencia: Mint background, texto forest.*

#### `btn-ghost` — Sobre fondos oscuros
```css
.btn-ghost {
  @apply bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-full
         font-headline font-bold hover:bg-white/10
         transition-all duration-200 active:scale-95
         flex items-center justify-center gap-2;
}
```

### 6.2 Cards

```css
.card {
  @apply bg-white rounded-2xl shadow-card hover:shadow-card-hover
         border border-outline-variant/40
         transition-all duration-200;
}
```

Nota: El borde `outline-variant` (`#b8d4c4`) reemplaza el borde azul anterior. Da un look más integrado con la paleta forest/mint.

### 6.3 Section Label (badge de sección)

```css
/* Span pequeño encima del H2 de cada sección */
.section-label {
  @apply inline-block text-secondary-container font-headline font-bold
         text-label-bold tracking-widest uppercase;
}
```

### 6.4 Accordion / FAQ Item

```css
/* Estado abierto: acento forest */
border-primary/25 shadow-card-hover     /* open */
border-outline-variant hover:border-primary/25 shadow-card  /* closed */

/* Chevron icon círculo */
/* open:   bg-primary text-white */
/* closed: bg-surface-container-low text-primary */
```

### 6.5 Footer Column Title `::after` underline

```css
.footer-col-title::after {
  background-color: #88deb1;  /* mint — reemplaza naranja */
}
```

### 6.6 Social Icons (Footer)

```css
/* bg-secondary-container → mint background con texto forest */
@apply bg-secondary-container text-on-secondary-container ...
```

---

## 7. Motion Rules

*Definidas en CLAUDE.md — se reproducen aquí para referencia completa.*

| Animación | Herramienta | Estado |
|-----------|-------------|--------|
| Ken Burns + crossfade hero | `motion/react` + `AnimatePresence` | IMPLEMENTADO |
| Scroll reveal secciones (`whileInView`) | Framer Motion | Pendiente |
| Hidey bar nav | JS scroll event | IMPLEMENTADO |
| Hover Reveal slide-up caption (service cards) | Framer Motion `whileHover` variants | IMPLEMENTADO |
| Premium accordion FAQ | Framer Motion `AnimatePresence` | IMPLEMENTADO |
| Shimmer/pulse CTA button | CSS `@keyframes` | Pendiente (cambiar a mint) |
| Infinite testimonials carousel | CSS `@keyframes` ticker | IMPLEMENTADO |

### Parámetros de motion reutilizables

```ts
// Ease brand — usar en todas las transiciones de UI
const ease = [0.22, 1, 0.36, 1]  // cubic-bezier suave, "premium"

// Scroll reveal estándar de sección
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease }}

// Stagger de items dentro de sección
transition={{ duration: 0.45, delay: index * 0.07, ease }}

// Entrada rápida (badges, iconos)
transition={{ duration: 0.35, ease }}
```

### Keyframes CSS — actualizar en globals.css

```css
/* Shimmer mint (reemplaza shimmer naranja) */
.btn-shimmer {
  background: linear-gradient(90deg, #88deb1 0%, #a8ebca 40%, #88deb1 60%, #88deb1 100%);
  background-size: 200% auto;
  animation: shimmer 2.4s linear infinite;
}

/* footer-col-title underline → mint */
.footer-col-title::after {
  background-color: #88deb1;
}
```

---

## 8. Responsive Rules

| Breakpoint | Tailwind | Regla |
|------------|----------|-------|
| Mobile | base (< 768px) | Layout single column, section-padding mobile, cards fullwidth |
| Tablet | `md:` (≥ 768px) | Desktop nav visible, section-padding desktop, 2-col grids |
| Desktop | `lg:` (≥ 1024px) | 3–4 col grids, max-container activo |
| Wide | `xl:` (≥ 1280px) | Max-width contenido fijo, solo ajustes menores |

### Reglas fijas

- **Container**: siempre `max-w-container mx-auto` (1280px). Nunca exceder.
- **Padding horizontal**: `px-4` mobile / `md:px-10` desktop — sin excepciones.
- **Section padding vertical**: `.section-padding` o equivalente manual `py-20 md:py-[120px]`.
- **Nav height**: `h-16` mobile / `md:h-20` desktop — respetar para evitar overlaps con hero.
- **Touch targets**: mínimo `44px × 44px` en mobile para todos los elementos interactivos.
- **Horizontal scroll** (Services): solo mobile — `hidden md:block` oculta el carousel en desktop.

---

## 9. Section Mapping

Guía visual section-by-section: qué cambiar y qué preservar.

### 9.1 Nav

| Elemento | Estado actual | Estado v2 |
|----------|--------------|-----------|
| Logo brand | SVG truck + texto `JULIO JUNK` | Usar `<Image src="/images/logo-dark.png">` en scrolled, `logo-mint.png` en transparente |
| Nav links | `text-white/90` / `text-on-surface-variant` | Sin cambio de color — hereda la paleta automáticamente |
| Hover links | `hover:text-secondary-container` → naranja | `hover:text-secondary-container` → mint ✓ (solo cambiar el token) |
| CTA pill | `btn-shimmer` naranja | `btn-shimmer` mint |
| Scrolled bg | `bg-white/95 backdrop-blur-md` | Sin cambio |
| Mobile menu bg | `bg-white/95` | Sin cambio |
| Border mobile menu | `border-outline-variant/30` | Se adapta automáticamente al nuevo outline-variant |

**Archivos logo a preparar:**
- `/public/images/logo-dark.png` → Logotipo03.png (forest sobre blanco) — para nav scrolled
- `/public/images/logo-mint.png` → Logotipo02.png (mint sobre blanco, usar sobre fondo oscuro con inv-filter o versión SVG)
- `/public/images/logo.svg` → ideal vector para ambos contextos

### 9.2 Hero

| Elemento | Estado actual | Estado v2 |
|----------|--------------|-----------|
| Ken Burns + crossfade | ✅ Implementado | Preservar exactamente |
| Overlay gradient | `rgba(0,53,95,0.7)` azul | `rgba(1,30,22,0.72)` → forest oscuro |
| Bottom fade | `from-background` | `from-white` (background ahora es white) |
| Badge | `bg-white/10 border-white/25` | Sin cambio |
| Badge icon | `text-secondary-container` → naranja | `text-secondary-container` → mint ✓ |
| H1 accent span | `text-secondary-container` → naranja | `text-secondary-container` → mint ✓ |
| Subtitle | `text-blue-100` | `text-emerald-100` o `text-[#b4e4c8]` |
| CTA primary | `btn-shimmer` naranja | `btn-shimmer` mint (pill) |
| CTA secondary | `bg-white/15 border-white/30` | Sin cambio |
| Slide dots | `bg-white` / `bg-white/40` | Sin cambio |

### 9.3 TrustBar

- Background: `bg-primary` → forest `#013e37` (dark strip)
- Iconos/stats: `text-secondary-container` → mint
- Texto: `text-white` o `text-on-primary`

### 9.4 Services

| Elemento | Estado v2 |
|----------|-----------|
| Section label | `text-secondary-container` → mint |
| H2 | `text-primary` → forest |
| Card caption gradient | `from-black/90 via-black/60` — sin cambio (funciona sobre cualquier paleta) |
| "Get a Free Quote" accent | `text-secondary-container` → mint |
| Focus ring mobile | `focus-visible:ring-secondary-container` → mint |

### 9.5 WhyChooseUs

- Iconos de features: `text-secondary-container` → mint
- H2: `text-primary` → forest
- Stats/counters: mint accent
- Fondo de sección: `surface-container-low` (`#f0faf5`) o `white`

### 9.6 HowItWorks

- Números de paso: círculo `bg-primary text-on-primary` → forest/white
- Conector entre pasos: `bg-secondary-container` → mint
- H2: forest

### 9.7 Pricing

- Card destacada (recommended): border o header `bg-primary` → forest
- Precio accent: `text-secondary-container` → mint
- Checkmarks: `text-secondary-container` → mint
- CTA button: `btn-shimmer` → mint

### 9.8 Testimonials

- Stars / rating: `text-secondary-container` → mint
- Fondo de tarjeta: `bg-white` con `shadow-card`
- Ticker: sin cambio en animación, solo colores de acento

### 9.9 ServiceAreas

- Fondo: alternar con `surface-container-low` (`#f0faf5`)
- Pill de ciudad: `bg-surface-container border-outline-variant` → adaptado automáticamente
- Pin icon: `text-secondary-container` → mint

### 9.10 FAQ

| Elemento | Estado actual | Estado v2 |
|----------|--------------|-----------|
| Section bg | `bg-surface-container-low` azulado | `bg-surface-container-low` → `#f0faf5` mint ✓ |
| Section label | `text-secondary-container` naranja | mint ✓ |
| H2 | `text-primary` azul | forest ✓ |
| Item abierto border | `border-primary/20` | forest/20 ✓ |
| Chevron abierto | `bg-primary text-white` | forest/white ✓ |
| Chevron cerrado | `bg-surface-container-low text-primary` | mint-bg/forest ✓ |
| Divider | `bg-outline-variant/30` | se adapta ✓ |

### 9.11 ContactForm

- Label activo / input focus: `border-primary` → forest
- Submit button: `btn-primary` o `btn-shimmer` mint
- Success state: `text-primary` → forest

### 9.12 FinalCTA

| Elemento | Estado actual | Estado v2 |
|----------|--------------|-----------|
| Container bg | `bg-primary-container` azul | `bg-primary-container` → `#015748` (forest oscuro) |
| Orbs decorativos | `bg-secondary-container/15` naranja | `bg-secondary-container/15` → mint/15 ✓ |
| H2 | `text-white` | Sin cambio |
| Párrafo | `text-on-primary-container/80` | `text-on-primary-container/80` → mint tint ✓ |
| CTA primary | `btn-shimmer` naranja | mint shimmer |
| CTA secondary | `bg-white/15 border-white/25` | Sin cambio |
| Nota | `text-on-primary-container/60` | Se adapta ✓ |

### 9.13 Footer

| Elemento | Estado actual | Estado v2 |
|----------|--------------|-----------|
| Fondo | `#0D1825` (navy oscuro) | `#011f1c` (forest muy oscuro) |
| Brand wordmark | `text-white` | Sin cambio |
| ColTitle `::after` | `#fd761a` naranja | `#88deb1` mint |
| Links hover | `hover:text-white` | Sin cambio |
| Social icons bg | `bg-secondary-container` naranja | mint ✓ |
| Trust badges border | `border-white/20` | Sin cambio |
| Trust badge icon | `text-secondary-container` | mint ✓ |
| Bottom bar | `border-white/10` | Sin cambio |

---

## 10. Iconografía

- **Estilo**: line icons (stroke), `strokeWidth={2}` o `2.5` — como en implementación actual.
- **Tamaño estándar**: `w-5 h-5` en inline UI, `w-6 h-6` en cards, `w-10 h-10` en feature icons.
- **Color**: `text-secondary-container` (mint) para iconos de acento, `text-on-surface` para iconos informativos.
- No cambiar los SVGs actuales — son consistentes y limpios.

---

## 11. Implementación — Orden de ejecución

1. **Font setup** → copiar `lustra-text-bold.ttf` a `/public/fonts/`, agregar `@font-face` a `globals.css`
2. **tailwind.config.ts** → reemplazar `colors` y `fontFamily` completos con los tokens de este documento
3. **globals.css** → actualizar `btn-shimmer` gradient a mint, `footer-col-title::after` a mint, eliminar import Montserrat
4. **Logo** → copiar logos a `/public/images/`, actualizar `Nav.tsx` con `<Image>` en lugar del SVG inline
5. **Hero overlay** → cambiar `rgba(0,53,95...)` a `rgba(1,30,22...)`
6. **Footer bg** → cambiar `#0D1825` a `#011f1c`
7. **Verificar** → todos los demás tokens se actualizan automáticamente en cascada

> Los pasos 2 y 3 actualizan el 90% del sistema visual automáticamente via Tailwind.  
> Solo los valores hardcoded (overlay del hero, bg del footer) requieren edición manual.

---

## 12. Checklist de conformidad

Antes de marcar cualquier componente como listo, verificar:

- [ ] ¿Usa `font-headline` (Lustra) en headings y botones?
- [ ] ¿El color primario es forest `#013e37`, no azul?
- [ ] ¿El acento es mint `#88deb1`, no naranja?
- [ ] ¿Los botones CTA son `rounded-full` (pill)?
- [ ] ¿El shimmer es mint, no naranja?
- [ ] ¿Las sombras usan tonalidad forest?
- [ ] ¿El layout y contenido son idénticos a antes del cambio visual?
- [ ] ¿El SEO (H1, H2, meta, alt text) está intacto?
- [ ] ¿El comportamiento mobile es idéntico o mejor?
