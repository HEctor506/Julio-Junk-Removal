'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/navigation';

const MotionImage = motion.create(Image);

const SLIDES = [
  { src: '/images/Camionete-julio-mejorada.png' },
  { src: '/images/scene12.jpeg' },
  { src: '/images/image19.jpeg' },
];

const AUTOPLAY_INTERVAL = 8500;

export default function Hero() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section
      id="home"
      aria-label="Hero"
      // ALTURA Y PADDING VERTICAL:
      //   min-h-[0px]       → altura mínima en MOBILE (sin altura fija, crece con el contenido)
      //   md:min-h-svh      → altura mínima en DESKTOP (ocupa toda la pantalla)
      //   pt-[120px]        → padding top en MOBILE (espacio para el nav)
      //   md:pt-[10px]      → padding top en DESKTOP
      //   pb-16             → padding bottom (igual en MOBILE y DESKTOP — md:pb-16 repite el mismo valor)
      className="relative min-h-[0px] md:min-h-svh flex items-start pt-[118px] md:pt-[160px] pb-16 md:pb-[16px] overflow-hidden"
    >
      {/* ── Ken Burns background ── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, zIndex: 1 }}
            exit={{ opacity: 0, zIndex: 0 }}
            transition={{ duration: 3.3, ease: 'easeInOut' }}
          >
            <MotionImage
              src={SLIDES[current].src}
              alt=""
              fill
              priority={current === 0}
              sizes="100vw"
              // OPACIDAD DE LAS IMÁGENES DE FONDO: cambia el número (0 = invisible, 100 = sólido)
              // grayscale → quita el color de las fotos (eliminar esa clase para ver en color)
              className="object-cover object-center grayscale opacity-50"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay oscuro encima de las imágenes — ajusta los valores rgba para más/menos oscuridad */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(1,30,22,0.72) 0%, rgba(1,17,13,0.6) 100%)' }}
        />
        {/* Degradado inferior para que la sección se funda suavemente con la siguiente */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Puntitos de navegación del slideshow ── */}
      {/* bottom-8 → distancia desde abajo (igual en MOBILE y DESKTOP) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        aria-label="Slide navigation"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* El px-4 es el padding horizontal en mobile (izquierda Y derecha igual). Si quieres más espacio solo a la derecha, cambias px-4 por valores separados:
// px-4 = 16px en ambos lados
// pl-4 = padding izquierdo | pr-10 = padding derecho más grande
pl-4 pr-10
O si quieres controlarlo solo en mobile sin tocar desktop:
// solo mobile: más padding derecho
// desktop (md:): sigue con px-10 en ambos lados
pl-4 pr-10 md:px-10 */}

      {/* ── Contenido principal ── */}
      {/* px-4 → padding horizontal en MOBILE | md:px-10 → en DESKTOP */}
      <div className="max-w-container mx-auto pl-3 pr-8 md:px-10 w-full relative z-10">
        {/* space-y-4 → espacio entre elementos en MOBILE | md:space-y-8 → en DESKTOP */}
        <div className="max-w-3xl space-y-4 md:space-y-8">

          {/* Badge (pastillita verde con estrella arriba del título) */}
          {/* px-4 py-2 → tamaño del badge (igual en MOBILE y DESKTOP) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-2 text-white backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-secondary-container" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12z" />
            </svg>
            {/* text-sm → tamaño del texto del badge (igual en MOBILE y DESKTOP) */}
            <span className="font-semibold tracking-widest text-sm">{t('badge')}</span>
          </motion.div>

          {/* Título principal (H1) */}
          {/* text-display-mobile → tamaño en MOBILE | md:text-display-lg → tamaño en DESKTOP */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-display-mobile md:text-display-lg font-display font-bold leading-tight text-white"
          >
            {t('h1Line1')}
            <br />
            {/* Segunda línea del título — en color verde menta */}
            <span className="text-secondary-container">{t('h1Line2')}</span>
          </motion.h1>

          {/* Subtítulo */}
          {/* text-[16px] → tamaño en MOBILE | md:text-[22px] → tamaño en DESKTOP */}
          {/* Para cambiar el tamaño: edita los números dentro de text-[...] */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="max-w-2xl  pr-6  text-[16px] md:text-[22px] font-weight font-body font-semibold text-[#ffffff] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]"
          >
            {t('subtitle')}
          </motion.p>

          {/* Botones CTA */}
          {/* flex-col → apilados en MOBILE | sm:flex-row → lado a lado en DESKTOP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 items-start"
          >
            {/*
              ══════════════════════════════════════════
              BOTÓN PRIMARIO (verde — "Get a Free Quote")
              ══════════════════════════════════════════
              ANCHO:   px-11 → padding horizontal en MOBILE
                       md:px-8 → padding horizontal en DESKTOP
                       (no tiene w-fijo, el ancho lo define el padding + texto)

              ALTO:    py-3 → padding vertical en MOBILE  (botón más chico)
                       md:py-5 → padding vertical en DESKTOP (botón más alto)

              Para hacerlo más ancho  → sube el número de px-11 / md:px-8
              Para hacerlo más angosto → bájalo
              Para hacerlo más alto   → sube py-3 / md:py-5
              Para hacerlo más bajo   → bájalo

              El estilo visual (color verde, bordes redondeados) viene de
              la clase "btn-shimmer" definida en globals.css — no está aquí.
            */}
            <Link
              href="/contact"
              className="btn-shimmer px-11 py-3 md:px-11 md:py-5 shadow-xl hover:brightness-110 active:scale-95 transition-transform flex items-center justify-center gap-3"
            >
              {t('ctaPrimary')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/*
              ══════════════════════════════════════════
              BOTÓN SECUNDARIO (transparente — "Call Now")
              ══════════════════════════════════════════
              ANCHO:   px-16 → padding horizontal (igual en MOBILE y DESKTOP)
                       Para mobile distinto: reemplazar px-16 por  px-8 md:px-16

              ALTO:    py-3 → padding vertical (igual en MOBILE y DESKTOP)
                       Para mobile distinto: reemplazar py-3 por   py-2 md:py-3

              FORMA:   rounded-full → cápsula totalmente redondeada
                       Para esquinas menos redondas: rounded-xl o rounded-2xl

              BORDE:   border-2 → grosor del borde blanco
                       border-white/30 → opacidad del borde (30%)
            */}
            <Link
              href={siteConfig.phoneHref}
              className="bg-white/15 border-2 border-white/30 text-white px-16 md:px-16 py-3 md:py-[19px] rounded-full font-headline font-bold shadow-xl hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28l1.5 4.5-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3 4.5 1.5V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
              </svg>
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          {/* Trust indicators — DESACTIVADOS (comentados) */}
          {/* Para reactivarlos: quitar el bloque de comentario */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-6 pt-4 text-white"
          >

            <span className="font-semibold text-sm">♻️ {t('trust2')}</span>
            <span className="hidden sm:block opacity-30">|</span>
            <span className="font-semibold text-sm">📅 {t('trust3')}</span>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
