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
