# DEVLOG — Julio Junk Removal

Registro de sesiones de desarrollo. Cada entrada documenta qué se hizo, por qué, y qué quedó pendiente.

### Claude → Implementación principal

Responsable de:

- Desarrollar features
- Refactors grandes
- Modificar múltiples archivos
- Ejecutar la implementación definida

Debe respetar arquitectura y decisiones existentes.

---

### Codex → Asistente dentro del editor

Responsable de:

- Completar código puntual
- Resolver funciones específicas
- Hacer ajustes pequeños
- Ayudar durante implementación

No debe tomar decisiones de arquitectura ni iniciar refactors grandes.

## Actualización de sesiones

Al terminar cada requerimiento actualizar `project_log.md` agregando:

- Fecha
- Objetivo
- IA utilizada
- Cambios realizados
- Archivos modificados
- Decisiones tomadas
- Problemas encontrados
- Pendientes
- Commit relacionado

Regla final:

Ninguna sesión se considera terminada hasta actualizar `project_log.md`.

Mantener el log corto, técnico y acumulativo.

---

## Sesión 01 — 2026-06-07

### Resumen
Sesión enfocada en animaciones, rediseño de la sección Services, y refactorización de la arquitectura de componentes.

---

### Cambios realizados

#### 1. Componente CountUp (`src/components/ui/CountUp.tsx`)
- Creado desde cero basado en React Bits (convertido a TypeScript)
- Usa `useSpring` + `useInView` de Framer Motion
- `once: true` garantiza que la animación solo corre una vez por carga de página
- Props: `from`, `to`, `duration`, `separator`, `direction`, `startWhen`, `onStart`, `onEnd`

#### 2. TrustBar con animación de contadores (`src/components/sections/TrustBar.tsx`)
- Reemplazados los valores estáticos por contadores animados
- Stats animados:
  - Stat 1: `0 → 2,000` con separador de miles (`separator=","`) + sufijo `+`
  - Stat 2: `0 → 98` + sufijo `%`
  - Stat 3: `0.1 → 1.0` con prefijo `< ` + sufijo ` Hr`
- Stat 4 ("Licensed & Insured") queda como texto estático (no es numérico)
- `DURATION` constante compartida — todos los counters terminan al mismo tiempo
- La animación no se repite al volver a hacer scroll (comportamiento correcto)

#### 3. Rediseño de Services (`src/components/sections/Services.tsx`)
- **Antes:** bento grid de 8 tarjetas con layout complejo (col-span, row-span)
- **Ahora:** carousel de scroll horizontal con snap (`snap-x snap-mandatory`)
- Tarjetas: `260×380px` móvil / `320×440px` desktop
- Al hacer **hover** sobre una tarjeta, el gradient overlay sube desde abajo revelando título, descripción y CTA
- Animación con Framer Motion `whileHover` + variants (`idle → hover`)
- Gradient: `bg-gradient-to-t from-black/90 via-black/60 to-transparent`
- Scrollbar oculto vía CSS (`.services-scroll` en `globals.css`)
- Sin JS de detección de snap — el hover es el trigger, funciona en todos los navegadores

#### 4. Actualización de `globals.css`
- Agregada clase `.services-scroll` para ocultar scrollbar en todos los navegadores:
  - `scrollbar-width: none` (Firefox)
  - `-ms-overflow-style: none` (IE/Edge)
  - `::-webkit-scrollbar { display: none }` (Chrome/Safari)

#### 5. Refactorización de arquitectura de componentes
- **Eliminados** los tres archivos monolíticos:
  - `src/components/pages/AboutPageContent.tsx`
  - `src/components/pages/ServicesPageContent.tsx`
  - `src/components/pages/ContactPageContent.tsx`
- **Creados** componentes pequeños por página:

| Archivo nuevo | Contenido |
|---|---|
| `pages/about/AboutHero.tsx` | Hero section de la página About |
| `pages/about/AboutStory.tsx` | Sección "Our Story" + bloque de estadísticas |
| `pages/about/AboutValues.tsx` | Grid de valores + CTA final |
| `pages/services/ServicesHero.tsx` | Hero section de la página Services |
| `pages/services/ServiceCategories.tsx` | Grid de servicios + trust strip + CTA final |
| `pages/contact/ContactHero.tsx` | Hero section de la página Contact |
| `pages/contact/ContactInfo.tsx` | Sidebar de info de contacto + trust badges |
| `pages/contact/ContactFormFull.tsx` | Formulario completo con estado (idle/submitting/success/error) |

- **Actualizados** los `page.tsx` de cada ruta para que sean orquestadores puros:
  - `app/[locale]/about/page.tsx`
  - `app/[locale]/services/page.tsx`
  - `app/[locale]/contact/page.tsx`

#### 6. Actualizaciones a `CLAUDE.md`
- Agregada sección **"Regla: Referencias de código externo"** — define cómo evaluar snippets de referencia (Tailwind vs CSS vs Framer Motion) en lugar de copiarlos directamente
- Agregada sección **"Arquitectura de componentes"** — documenta el árbol de carpetas y las reglas de organización
- Actualizada tabla de animaciones (Hover Reveal marcado como IMPLEMENTADO)

---

### Decisiones técnicas

| Decisión | Razón |
|---|---|
| Hover en vez de scroll-snap para el reveal de Services | `container-type: scroll-state` es solo Chrome 129+; hover funciona en todos los navegadores |
| Framer Motion para el gradient overlay | Estado React + entrada/salida → Framer Motion según la regla del stack |
| `once: true` en CountUp | La animación de contadores solo tiene sentido la primera vez que el usuario la ve |
| Split de monolíticos en componentes pequeños | Mantenibilidad: un archivo por responsabilidad, `page.tsx` como orquestador |
| Constantes de datos (STATS, VALUES, SERVICES) movidas a cada componente | Coubicación — el dato vive junto al componente que lo usa |

---

### Estado del proyecto al cierre de sesión

#### Animaciones
| Animación | Estado |
|---|---|
| Ken Burns + crossfade hero | ✅ Implementado |
| CountUp en TrustBar | ✅ Implementado |
| Hover Reveal gradient (service cards) | ✅ Implementado |
| Shimmer/pulse CTA button | ✅ Implementado (CSS `@keyframes`) |
| Infinite carousel testimonials | ✅ Implementado (CSS `@keyframes ticker`) |
| Scroll reveal secciones | ⏳ Pendiente |
| Hidey bar nav | ⏳ Pendiente |
| Premium accordion FAQ | ⏳ Pendiente |

#### Datos del cliente (aún pendientes)
- Teléfono y WhatsApp real
- Ciudad y Estado de operación
- Links de redes sociales
- Fotos reales del equipo y trabajos
- Confirmar si las estadísticas (2,000+, 98%, 4.9★) son reales
- ¿Tiene acreditación BBB?

#### Branding (pendiente)
- Logo, paleta de colores y tipografía — entrega pendiente de la hermana del desarrollador

---

### Archivos modificados en esta sesión

```
src/
├── components/
│   ├── ui/
│   │   └── CountUp.tsx                          ← NUEVO
│   ├── sections/
│   │   ├── TrustBar.tsx                          ← MODIFICADO
│   │   └── Services.tsx                          ← REDISEÑADO
│   └── pages/
│       ├── about/
│       │   ├── AboutHero.tsx                     ← NUEVO
│       │   ├── AboutStory.tsx                    ← NUEVO
│       │   └── AboutValues.tsx                   ← NUEVO
│       ├── services/
│       │   ├── ServicesHero.tsx                  ← NUEVO
│       │   └── ServiceCategories.tsx             ← NUEVO
│       └── contact/
│           ├── ContactHero.tsx                   ← NUEVO
│           ├── ContactInfo.tsx                   ← NUEVO
│           └── ContactFormFull.tsx               ← NUEVO
├── app/[locale]/
│   ├── about/page.tsx                            ← MODIFICADO
│   ├── services/page.tsx                         ← MODIFICADO
│   └── contact/page.tsx                          ← MODIFICADO
└── app/globals.css                               ← MODIFICADO

ELIMINADOS:
  src/components/pages/AboutPageContent.tsx
  src/components/pages/ServicesPageContent.tsx
  src/components/pages/ContactPageContent.tsx

DOCUMENTACIÓN:
  CLAUDE.md                                       ← MODIFICADO
  DEVLOG.md                                       ← NUEVO (este archivo)
```

---

## Sesion 02 - 2026-06-11

### Resumen
Sesion enfocada en refactor puntual de la seccion Services para separar la interaccion desktop/mobile sin cambiar la arquitectura general.

---

### Objetivo
Conservar el reveal por hover en desktop y cambiar mobile a tap/collapse. El estado inicial en mobile muestra solo el titulo del servicio; al tocar, expande descripcion y CTA con animacion basada en `transform` y `opacity`.

### IA utilizada
Codex.

### Cambios realizados

#### Services responsive interaction (`src/components/sections/Services.tsx`)
- Extraido `ServiceCard` para aislar el comportamiento por tarjeta.
- Desktop mantiene el `whileHover` de Motion sobre `motion.figure`.
- Mobile usa `motion.button` con estado local `isExpanded` y `aria-expanded`.
- El titulo mobile queda visible desde el estado inicial.
- La descripcion y CTA mobile aparecen/desaparecen con `opacity` + `translateY`.
- El titulo mobile se desplaza con `translateY` al expandir para dejar espacio a la descripcion.
- Agregado `will-change-transform` en capas animadas para favorecer composicion GPU.
- Normalizados textos auxiliares de la seccion a ASCII para evitar caracteres rotos.

### Archivos modificados
- `src/components/sections/Services.tsx`
- `DEVLOG.md`

### Decisiones tomadas
- Separar markup desktop/mobile con clases responsive (`hidden md:block`, `md:hidden`) para evitar que el hover de desktop afecte pantallas tactiles.
- Mantener tarjetas con dimensiones fijas para no provocar saltos de layout durante el collapse/expand.
- Usar animaciones de composicion (`transform`/`opacity`) en lugar de animar altura.

### Problemas encontrados
- `npm run lint` no se pudo completar porque Next.js pidio configurar ESLint de forma interactiva.
- El archivo `DEVLOG.md` ya tenia caracteres mojibake; la entrada nueva se dejo en ASCII.

### Validacion
- `npx tsc --noEmit` paso sin errores.

### Pendientes
- Configurar ESLint del proyecto para que `npm run lint` pueda ejecutarse de forma no interactiva.
- Revision visual manual en navegador para ajustar microposicion del titulo si algun copy real cambia de longitud.

### Commit relacionado
- Pendiente / no generado en esta sesion.

---

## Sesion 03 - 2026-06-11

### Resumen
Dos correcciones puntuales: comportamiento accordion en el carousel mobile de Services, y eliminacion de overflow horizontal en toda la aplicacion.

---

### Cambios realizados

#### 1. Services accordion mobile (`src/components/sections/Services.tsx`)
- Estado `isExpanded` movido de cada `ServiceCard` al componente padre `Services`.
- `Services` ahora guarda un unico `expandedKey: ServiceKey | null`.
- Al tocar una tarjeta se abre y cualquier otra abierta se cierra automaticamente.
- Tocar la tarjeta ya abierta la cierra (toggle off).
- Props nuevas en `ServiceCard`: `isExpanded: boolean` y `onToggle: () => void`.

#### 2. Auditoria y correccion de overflow horizontal

**Causas raiz encontradas:**

| Elemento | Causa | Archivo |
|---|---|---|
| Blur orb decorativo | `absolute -top-12 -right-12` desbordaba ~32px a la derecha en mobile, ~8px en desktop | `WhyChooseUs.tsx` |
| Badge de estadistica | `absolute -bottom-8 -left-6` desbordaba 8px a la izquierda en mobile (single-column layout) | `WhyChooseUs.tsx` |
| Badge "Licensed" | `absolute -bottom-8 -right-6` desbordaba 8px a la derecha en mobile | `AboutStory.tsx` |
| html sin overflow | `overflow-x-hidden` solo estaba en `body`; Safari iOS lo ignora si `html` no lo tiene tambien | `globals.css` |

**Correcciones aplicadas:**

- `WhyChooseUs.tsx`: blur orb `-right-12` → `right-0` (blur-3xl hace invisible la diferencia visual)
- `WhyChooseUs.tsx`: badge `-left-6` → `left-0 lg:-left-6` (en lg hay espacio en el gap entre columnas)
- `AboutStory.tsx`: badge `-right-6` → `right-0 lg:-right-6` (mismo patron)
- `globals.css`: agregado `overflow-x: hidden` al selector `html`

**Nota tecnica:** los offsets negativos mayores al padding del contenedor (`px-4 = 16px` en mobile) siempre generan overflow. La solucion correcta es limitar el offset negativo al breakpoint donde el elemento esta en una columna interna del grid (lg: en grids de 2 columnas), no en la columna full-width de mobile.

**Lo que NO se toco:**
- `Testimonials.tsx`: ticker con `w-max` ya estaba correctamente envuelto en `overflow-hidden`.
- `Services.tsx`: carousel con `-mx-4` es intencional (full-bleed) y tiene `overflow-x-auto`.
- `FinalCTA.tsx`: orbs decorativos dentro de `overflow-hidden` en su contenedor.

### Archivos modificados
- `src/components/sections/Services.tsx`
- `src/components/sections/WhyChooseUs.tsx`
- `src/components/pages/about/AboutStory.tsx`
- `src/app/globals.css`
- `DEVLOG.md`

### Validacion
- `npx tsc --noEmit` paso sin errores.

### Pendientes
- Revision visual en navegador mobile real para confirmar que los badges decorativos lucen bien en el nuevo offset.

### Commit relacionado
- Pendiente.

---

## Sesion 04 — 2026-06-12

### Resumen
Rediseño visual del Navbar y la sección Pricing. Cambio de paradigma: navbar de dual-state transparente/blanco a siempre sólido oscuro con logo centrado. Pricing de cards claras sobre fondo blanco a dark glass cards sobre fondo casi negro.

### IA utilizada
Claude.

---

### 1. Navbar — de dual-state transparente a sólido fijo

#### Antes

El `<header>` tenía dos estados controlados por el hook `scrolled` (activo cuando `window.scrollY > 60`):

| Estado | Background header | Logo | Links | Botones |
|--------|------------------|------|-------|---------|
| Top (sin scroll) | `bg-transparent` | `brightness-0 invert` (blanco) | `text-white/90` | `border-white/40` |
| Scrolled | `bg-white/95 backdrop-blur-md shadow-card` | sin filtro (logo dark visible) | `text-on-surface-variant` | `border-outline-variant` |

Layout desktop: `flex justify-between` → logo izquierda, links centro, CTA derecha.

#### Ahora

Fondo siempre `bg-primary` (`#013e37`). El estado `scrolled` solo afecta la sombra.

```tsx
// ANTES:
className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
  scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-transparent'
}`}

// AHORA:
className={`fixed top-0 w-full z-50 bg-primary transition-shadow duration-300 ${
  scrolled ? 'shadow-xl' : ''
}`}
```

#### Logo siempre blanco

`brightness-0` desatura la imagen a negro puro. `invert` la convierte a blanco. Permite usar un solo archivo PNG oscuro en cualquier contexto oscuro sin necesitar una versión alternativa del logo.

```tsx
// ANTES — condicional:
className={`h-10 w-auto ${scrolled ? '' : 'brightness-0 invert'}`}

// AHORA — siempre:
className="h-[46px] w-auto brightness-0 invert"
```

**Para revertir:** quitar ambas clases y asegurarse de que el PNG tenga buen contraste sobre fondo claro.

#### Links — siempre blancos, activo detectado por ruta

```tsx
const isLinkActive = (href: string) => {
  if (href.includes('#')) return false; // anchor links nunca se marcan activos
  return pathname === href || (href !== '/' && pathname.startsWith(href));
};
// Clase inactiva: 'text-white/85 hover:text-secondary-container border-b-2 border-transparent'
// Clase activa:   'text-secondary-container border-b-2 border-secondary-container'
```

**Regla importante:** los anchor links (`/#pricing`, `/#testimonials`) se excluyen con `href.includes('#')`. Si no, todos los links de home quedarían activos simultáneamente en la homepage.

#### Layout desktop — split navigation con logo centrado

```tsx
// ANTES — flex justify-between:
<div className="flex justify-between items-center h-20 px-10 max-w-container mx-auto">
  <Logo />       {/* izquierda */}
  <Nav links />  {/* centro */}
  <Actions />    {/* derecha */}
</div>

// AHORA — flex justify-center, todo compacto:
<div className="hidden md:flex items-center justify-center h-20 px-10 gap-8">
  <nav gap-7> Home · Services · Pricing </nav>   {/* izquierda */}
  <Link shrink-0 mx-2> Logo </Link>              {/* centro */}
  <nav gap-7> Reviews · About · Contact </nav>   {/* derecha */}
  <button> ES/EN </button>                       {/* fuera del grupo */}
</div>
```

`justify-center` + `gap-8` mantiene todo junto al centro sin separarse a los bordes. `shrink-0` en el logo evita que se comprima si los textos de los links son largos.

**Para revertir al layout clásico:** cambiar a `justify-between`, mover logo al inicio, agrupar todos los links en un solo `<nav>` y acciones al final.

#### Link Reviews — anchor a sección de home

Reviews enlaza a `/#testimonials`. Requisito: el componente `Testimonials.tsx` debe tener `id="testimonials"` en su `<section>`:

```tsx
// src/components/sections/Testimonials.tsx
<section id="testimonials" className="...">
```

Sin ese `id`, el browser no sabe dónde hacer scroll. El href `/#testimonials` funciona desde cualquier página — Next.js navega a home y el browser busca el elemento con ese id.

---

### 2. Pricing — de cards light a dark glass cards

#### Antes

Sección heredaba fondo blanco del body. Cards con dos variantes:

```
Card regular:  bg-white border-outline-variant shadow-card
Card popular:  bg-primary text-white border-primary shadow-xl md:scale-105
```

#### Ahora — dark section + glass cards

```tsx
// Sección:
<section className="py-20 md:py-[120px] bg-on-surface">
// bg-on-surface = #0a1a15 (forest casi negro)

// Card regular:
'bg-white/[0.04] border border-white/10 hover:border-white/20'

// Card popular:
'bg-white/[0.07] border-2 border-secondary-container md:scale-105 shadow-glow-mint'
```

**Patrón dark glass card:** `bg-white/[0.04]` sobre fondo oscuro crea una card ligeramente iluminada sin hardcodear un color de fondo. Si el color de la sección cambia, las cards se adaptan. El valor `[0.04]` usa notación arbitraria de Tailwind — la escala estándar empieza en `white/5` (0.05), pero `[0.04]` da un tono más sutil.

**Borde + glow en card popular:**
```
border-2 border-secondary-container  →  2px sólido en #88deb1 (mint)
shadow-glow-mint                     →  definido en tailwind.config.ts:
                                        '0px 0px 24px rgba(136, 222, 177, 0.35)'
```

#### Botones dentro de cards

```tsx
// Popular — shimmer mint animado:
'btn-shimmer text-on-secondary-container'

// Regular — outline que hace hover a mint:
'border border-white/20 text-white/80 hover:border-secondary-container hover:text-secondary-container'
```

El botón outline sobre dark es reutilizable en cualquier sección oscura sin agregar clases nuevas a `globals.css`.

#### Tipografía sobre fondo oscuro

```
// Sobre fondo claro usábamos:   text-primary / text-on-surface-variant
// Sobre fondo oscuro usar:      text-white / text-white/60
```

Los tokens `text-primary` y `text-on-surface-variant` están calibrados para fondos claros. Sobre dark pierden contraste. Sobre `bg-on-surface` siempre usar `text-white` para headings y `text-white/60` para subtítulos.

#### Checklist para revertir Pricing a light

1. `bg-on-surface` → quitar (hereda blanco del body)
2. Cards regulares: `bg-white/[0.04] border-white/10` → `bg-white border-outline-variant shadow-card`
3. Card popular: `bg-white/[0.07] border-secondary-container shadow-glow-mint` → `bg-primary border-primary shadow-xl`
4. H2: `text-white` → `text-primary`
5. Subtítulo: `text-white/60` → `text-on-surface-variant`
6. Botón regular: outline dark → `bg-primary text-white hover:brightness-110`

---

### Archivos modificados

```
src/components/layout/Nav.tsx          ← REDISEÑADO (dual-state → sólido, layout centrado)
src/components/sections/Pricing.tsx    ← REDISEÑADO (light → dark glass)
src/components/sections/Testimonials.tsx ← MODIFICADO (agregado id="testimonials")
messages/en.json                       ← MODIFICADO (agregada clave nav.reviews)
messages/es.json                       ← MODIFICADO (agregada clave nav.reviews = "Reseñas")
```

### Commit relacionado
- Pendiente.

---

## Sesion 05 — 2026-06-12

### Resumen
Rediseño completo de la sección Services. Cambio de paradigma: de carousel horizontal con imagen full-card + caption slide-up, a grid de cards con imagen arriba + info abajo y zoom Ken Burns en hover.

### IA utilizada
Claude.

---

### Services — antes vs ahora

#### Estructura antes

```
<section bg-white (hereda body)>
  Header centrado (label + h2 + subtítulo, 1 columna)

  <div class="flex overflow-x-auto snap-x"> ← CAROUSEL horizontal
    × 8 tarjetas (320×440px desktop, 260×380px mobile)
      Cada tarjeta:
        <img> posición absolute, cubre 100% de la tarjeta
        <figcaption> position absolute bottom-0, slide-up on hover
          → h3 + copy + "Get a Free Quote"
        Variante mobile: tap para expand/collapse (accordion)
```

La información (título + descripción) solo era visible al hacer hover/tap sobre la imagen. El contenido estaba **oculto por defecto**.

#### Estructura ahora

```
<section bg-on-surface (#0a1a15)>
  Header dos columnas (izquierda: label + h2 / derecha: subtítulo)

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"> ← GRID
    × 8 tarjetas (flex-col, rounded-2xl, overflow-hidden)
      Cada tarjeta:
        [Imagen — h-48, overflow-hidden]
          <img class="... group-hover:scale-[1.08] transition-transform duration-700">
        [Info — p-5, flex-col, gap-3]
          <span> Icono SVG (mint)
          <h3> Título (text-white)
          <p>  Descripción (text-white/55)
          <Link> "Learn More →" (mint, flecha anima con hover)
```

La información (título + descripción) es **visible siempre**. El hover solo anima la imagen.

---

### Cambios técnicos clave

#### 1. Zoom hover — CSS group en lugar de Framer Motion variants

```tsx
// ANTES — Framer Motion variant propagation (whileHover en figure, scale en img):
<motion.figure initial="idle" whileHover="hover">
  <img />  {/* respondía a variant "hover" */}
  <motion.figcaption variants={captionVariants} />  {/* slide-up */}
</motion.figure>

// AHORA — CSS group (Tailwind):
<article className="group ...">
  <div className="overflow-hidden h-48">
    <img className="... transition-transform duration-700 group-hover:scale-[1.08]" />
  </div>
</article>
```

**Por qué CSS en vez de Framer Motion aquí:** el zoom es una transformación simple sin física ni estado React. CSS `transition-transform` es más eficiente (no necesita JS para ejecutarse) y más fácil de leer. Framer Motion se reserva para animaciones con estado React (entrada/salida, `whileInView`).

**`overflow-hidden` es obligatorio** en el wrapper de la imagen. Sin él, la imagen al escalar se sale de los bordes del card.

**`scale-[1.08]`** usa notación arbitraria de Tailwind porque `scale-110` (1.1) es demasiado agresivo y `scale-105` (1.05) es imperceptible. 1.08 es el punto medio visual correcto para Ken Burns sutil.

#### 2. Header — de centrado a dos columnas

```tsx
// ANTES — columna única centrada:
<div className="text-center mb-12 space-y-4">
  <span>{label}</span>
  <h2>{t('h2')}</h2>
  <p className="max-w-2xl mx-auto">{t('subtitle')}</p>
</div>

// AHORA — dos columnas flex:
<div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 mb-12">
  <div className="shrink-0">         {/* izquierda: label + h2 */}
    <span>{label}</span>
    <h2>{t('h2')}</h2>
  </div>
  <p className="md:max-w-sm md:pb-1">{t('subtitle')}</p>  {/* derecha */}
</div>
```

`md:items-end` alinea ambas columnas por la base en desktop, lo que da el efecto de que el subtítulo "descansa" al mismo nivel que la última línea del H2.

#### 3. Scroll reveal con stagger por columna

```tsx
// Las tarjetas entran con whileInView + delay escalonado por columna (no por índice global):
transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
// index % 4 → siempre 0, 1, 2 o 3 independiente de si es fila 1 o fila 2
```

`index % 4` en vez de `index * 0.08` evita que las tarjetas de la segunda fila tengan delays acumulados (0.32s, 0.40s...) que se sentirían lentos.

#### 4. Iconos SVG por servicio

Cada `ServiceKey` tiene su icono SVG de línea asociado en el mapa `SERVICE_ICONS` (definido inline en el componente `ServiceIcon`). Stroke `1.75` para aspecto más delicado vs `2` que se siente pesado.

#### 5. "Learn More →" con flecha animada

```tsx
<Link className="... group/link">
  Learn More
  <svg className="transition-transform group-hover/link:translate-x-1" />
</Link>
```

`group/link` es Tailwind's named group — permite hover en el link sin que interfiera con el `group` del card padre que controla el zoom de la imagen.

---

### Para revertir al carousel

1. Cambiar `<div className="grid ...">` → `<div className="services-scroll flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 md:-mx-10 px-4 md:px-10 pb-4">`
2. Restaurar tarjetas con `position: relative`, imagen `absolute inset-0`, `figcaption` con `captionVariants` slide-up
3. Restaurar estado `expandedKey` y la lógica mobile accordion
4. Cambiar `bg-on-surface` → quitar (hereda blanco del body)
5. Header: cambiar de dos columnas a `text-center`

### Archivos modificados
```
src/components/sections/Services.tsx    ← REDISEÑADO completo
DEVLOG.md                               ← ACTUALIZADO
```

### Commit relacionado
- Pendiente.

---

## Sesion 06 — 2026-06-12

### Cambio puntual: TrustBar stat3 + labels uppercase

**Stat 3 reemplazado:**
- Antes: `< 1 Hr` / `Response Time` (CountUp de 0.1 → 1 con prefijo `<` y sufijo ` Hr`)
- Ahora: `10+` / `Years Experience` (CountUp de 0 → 10 con sufijo `+`)

**Labels en mayúsculas:** agregado `uppercase` a todos los `<dd>` del TrustBar (4 elementos). La clase `text-label-bold` ya tenía `letter-spacing: 0.08em`, que combinado con `uppercase` da el look de small caps estilo marca.

**Archivos modificados:**
```
messages/en.json    stat3Value / stat3Label actualizados
messages/es.json    stat3Value / stat3Label actualizados ("Años de Experiencia")
src/components/sections/TrustBar.tsx   CountUp de stat3 simplificado + uppercase en todos los dd
```

### Commit relacionado
- Pendiente.

---

## Sesion 07 — 2026-06-12

### Banner de anuncio con ticker horizontal infinito

Nuevo componente `src/components/layout/Banner.tsx` — strip de texto animado debajo del navbar.

#### Arquitectura

El Banner vive **dentro del `motion.header` de Nav.tsx**, entre el nav mobile y el `AnimatePresence` del menú. Comparte la animación hidey-bar sin necesitar un segundo scroll listener.

```
motion.header (fixed top-0 z-50)
  ├── Desktop nav row  (h-20)
  ├── Mobile nav row   (h-16)
  ├── <Banner />       (≈ 36px)
  └── AnimatePresence  (mobile menu)
```

El `y` de ocultamiento se actualizó: `-90` → `-160` para cubrir nav + banner:
```tsx
animate={{ y: visible ? 0 : -160 }}
```

#### Cómo cambiar la velocidad

**Un solo lugar:** `src/app/globals.css`, clase `.animate-banner`:

```css
/* Announcement banner — 28s (ajusta aquí la velocidad) */
.animate-banner {
  animation: ticker 28s linear infinite;
}
```

Valor más bajo = más rápido (`18s`). Valor más alto = más lento (`40s`).
Reutiliza el `@keyframes ticker` existente (`translateX(0) → translateX(-50%)`).

#### Cómo cambiar el texto o el número de repeticiones

En `src/components/layout/Banner.tsx`:

```tsx
const MESSAGE = "Moving soon? Let us handle the junk before the big day.";
const REPEATS = 8;  // copias del texto en el DOM
```

Texto más largo → bajar `REPEATS` a 6. Texto más corto → subir a 10-12.
El separador `★` está en mint (`text-secondary-container`).

#### Diseño

- `bg-primary-container` (#015748) — tono más claro que el navbar (#013e37)
- `border-t border-white/10` — línea sutil de separación
- Texto: `text-white/85 · font-label font-semibold · tracking-widest uppercase`

### Archivos modificados
```
src/components/layout/Banner.tsx   ← NUEVO
src/components/layout/Nav.tsx      ← import Banner + y: -160
src/app/globals.css                ← .animate-banner (28s)
```

### Commit relacionado
- Pendiente.

---

## Sesion 08 — 2026-06-12

### Resumen
Tres cambios independientes: corrección del logo en el Footer, reestructuración del About page (quitar trust bar + nuevas secciones Video y Mapa), y creación del componente CTA reutilizable con i18n aplicado a Services y About.

---

### 1. Footer — logo real en lugar de placeholder

```tsx
// ANTES — texto placeholder:
<span className="text-outline font-mono text-sm select-none opacity-70">⌐_AUTO</span>
<span className="font-headline font-bold text-xl ...">JULIO JUNK</span>

// AHORA — logo real + texto:
<Link href="/" className="flex items-center gap-3 group">
  <Image src="/images/logo-dark.png" className="h-10 w-auto brightness-0 invert" />
  <span className="font-headline font-bold text-xl ... group-hover:text-secondary-container">
    JULIO JUNK
  </span>
</Link>
```

`brightness-0 invert` convierte el logo oscuro a blanco sobre el fondo dark del footer (mismo patrón que el navbar).

---

### 2. About page — quitar trust bar de stats

El bloque `<section className="bg-primary py-16">` con las 4 métricas en `AboutStory.tsx` fue eliminado. Era redundante con el TrustBar global que ya aparece en el home.

```tsx
// ELIMINADO de AboutStory.tsx:
const STATS = [{ value: '2,000+', ... }, ...];
<section className="bg-primary py-16"> ... </section>
```

---

### 3. About page — nuevas secciones: Video y Mapa

Orden del About page actualizado:

```
AboutHero → AboutStory → AboutValues → CTA(about) → AboutVideo → AboutMap
```

#### AboutVideo (`src/components/pages/about/AboutVideo.tsx`)

Sección oscura (`bg-on-surface`) con placeholder de video. Cuando el cliente entregue el video:

```tsx
// AboutVideo.tsx, línea 1:
const VIDEO_SRC = '';  // ← poner aquí la ruta, ej: '/videos/promo.mp4'
```

El componente detecta si `VIDEO_SRC` tiene valor y renderiza `<video>` en lugar del placeholder automáticamente. Soporta rutas locales, YouTube embed e iframe de Vimeo.

#### AboutMap (`src/components/pages/about/AboutMap.tsx`)

Sección clara (`bg-surface-container-low`) con layout 2 columnas:
- **Izquierda:** iframe de Google Maps con `filter: saturate(1.1) contrast(1.05)` para que se vea más vivo
- **Derecha:** panel `bg-primary` con área de servicio, horario, teléfono, botón "Get Directions" (mint shimmer) y botón de teléfono (outline)

El botón "Get Directions" construye la URL de Google Maps dinámicamente desde `siteConfig.city` y `siteConfig.state`:
```tsx
href={`https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.city}, ${siteConfig.state}`)}`}
```

Cuando el cliente entregue coordenadas reales, actualizar el `src` del iframe en línea 70 de `AboutMap.tsx`.

---

### 4. Componente CTA reutilizable

#### Problema resuelto
Cada página tenía su CTA hardcodeado: ~20 líneas duplicadas de JSX + texto en inglés sin traducción.

#### Arquitectura

```
src/components/sections/CTA.tsx     ← componente único
messages/en.json → "ctaBlock"       ← textos EN por variante
messages/es.json → "ctaBlock"       ← textos ES por variante
```

#### Uso

```tsx
<CTA variant="about" />     // en About page
<CTA variant="services" />  // en Services page
```

#### Estructura de traducción

```json
"ctaBlock": {
  "services": {
    "heading": "Ready to Clear Your Space?",
    "subtitle": "Get a free, no-obligation estimate in minutes.",
    "primary": "Get Free Estimate",
    "secondary": "Call Now"
  },
  "about": {
    "heading": "Ready to Work With Us?",
    "subtitle": "Get your free estimate today — no pressure, no obligation.",
    "primary": "Get Free Estimate",
    "secondary": "Call Now"
  }
}
```

#### Cómo agregar una nueva variante

1. Agregar clave en `messages/en.json` y `messages/es.json` bajo `"ctaBlock"`
2. Añadir el string al tipo en `CTA.tsx`:
   ```tsx
   type CTAVariant = 'services' | 'about' | 'nueva-variante';
   ```
3. Usar `<CTA variant="nueva-variante" />` en el componente deseado

**Nota:** `FinalCTA.tsx` no fue tocado — sigue siendo el componente independiente del home.

---

### Archivos modificados
```
src/components/layout/Footer.tsx              ← logo real reemplaza placeholder
src/components/pages/about/AboutStory.tsx     ← STATS eliminado
src/components/pages/about/AboutVideo.tsx     ← NUEVO
src/components/pages/about/AboutMap.tsx       ← NUEVO
src/app/[locale]/about/page.tsx               ← imports AboutVideo + AboutMap
src/components/sections/CTA.tsx               ← NUEVO (componente reutilizable)
src/components/pages/about/AboutValues.tsx    ← usa <CTA variant="about" />
src/components/pages/services/ServiceCategories.tsx ← usa <CTA variant="services" />
messages/en.json                              ← ctaBlock agregado
messages/es.json                              ← ctaBlock agregado (ES)
```

### Commit relacionado
- Pendiente.

---

## Sesion 09 — 2026-06-12

### Hero padding con navbar + banner (patrón reutilizable)

#### Problema
Las páginas interiores (Services, Contact) tenían el badge pill ("WHAT WE DO", "FREE ESTIMATE") parcialmente oculto detrás del banner del navbar.

#### Por qué ocurre

El `motion.header` (Nav) es `fixed top-0` y contiene dos capas:

| Capa | Desktop | Mobile |
|------|---------|--------|
| Navbar (`h-20` / `h-16`) | 80px | 64px |
| Banner (`py-2` + texto) | ~36px | ~36px |
| **Total** | **~116px** | **~100px** |

Los heroes tenían `pt-20` (80px) — suficiente solo para el navbar. El banner tapaba los primeros ~36px del contenido hero.

#### Por qué About no tenía el problema
About hero tiene menos contenido (sin botones CTA). Con `flex items-center` en el section, el contenido se centra verticalmente dentro del espacio disponible. Al ser el contenido más corto, el badge cae naturalmente más abajo del header. En Services y Contact, el contenido es más alto (botones adicionales), el centro baja y el badge queda exactamente detrás del banner.

#### Fix aplicado

```tsx
// ANTES — en ServicesHero.tsx y ContactHero.tsx:
className="... pt-20 ..."

// DESPUÉS:
className="... pt-[104px] md:pt-[120px] ..."
```

**Lógica de los valores:**
- `pt-[104px]` → mobile: 64px nav + 36px banner + 4px buffer
- `md:pt-[120px]` → desktop: 80px nav + 36px banner + 4px buffer

#### Regla para el futuro

> Cualquier sección hero en una página interior que esté fija bajo el navbar+banner debe usar `pt-[104px] md:pt-[120px]`. Si cambias la altura del navbar o del banner, actualiza estos valores.

La Home page es distinto — el Hero del home tiene su propia lógica de offset porque es la primera sección y el nav es transparente ahí.

#### Archivos modificados
```
src/components/pages/services/ServicesHero.tsx   ← pt-20 → pt-[104px] md:pt-[120px]
src/components/pages/contact/ContactHero.tsx     ← pt-20 → pt-[104px] md:pt-[120px]
```

### Commit relacionado
- Pendiente.
