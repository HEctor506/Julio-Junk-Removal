'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/navigation';

type ServiceKey = 'residential' | 'commercial' | 'yard' | 'construction' | 'cleanout' | 'furniture' | 'appliances' | 'recycling';
type ServiceItemData = { h3: string; copy: string; items: string[] };

const SERVICE_IMAGES: Record<ServiceKey, string> = {
  residential: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  commercial: '/images/image8.jpeg',
  yard: '/images/photo11.jpeg',
  construction: '/images/photo12.jpeg',
  cleanout: '/images/scene12.jpeg',
  furniture: 'https://byejunk.com/wp-content/uploads/2018/09/junk-furniture-003.jpeg',
  appliances: '/images/image6.jpeg',
  recycling: 'https://www.junkhappens.com/wp-content/uploads/2019/01/Junk-Removal.jpg',
};

const SERVICE_KEYS: ServiceKey[] = [
  'residential', 'commercial', 'yard', 'construction',
  'cleanout', 'furniture', 'appliances', 'recycling',
];

function ServiceIcon({ serviceKey }: { serviceKey: ServiceKey }) {
  const icons: Record<ServiceKey, React.ReactNode> = {
    residential: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" />
      </svg>
    ),
    commercial: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="18" rx="1" /><path d="M8 3v18M16 3v18M2 9h20M2 15h20" />
      </svg>
    ),
    yard: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12" /><path d="M5 12a7 7 0 0014 0c0-4-3-8-7-10C8 4 5 8 5 12z" />
      </svg>
    ),
    construction: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    cleanout: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
      </svg>
    ),
    furniture: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3" /><path d="M2 11a2 2 0 012-2h16a2 2 0 012 2v4H2v-4z" /><path d="M6 19v-4M18 19v-4" />
      </svg>
    ),
    appliances: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M15 7h.01M9 7h.01" /><rect x="9" y="11" width="6" height="8" rx="1" />
      </svg>
    ),
    recycling: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
      </svg>
    ),
  };
  return <>{icons[serviceKey]}</>;
}

function ServiceCard({ serviceKey, data, index, className = '' }: { serviceKey: ServiceKey; data: ServiceItemData; index: number; className?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className={`group bg-white/[0.05] rounded-2xl overflow-hidden flex flex-col border border-white/[0.07] hover:border-white/[0.14] transition-colors duration-300 ${className}`}
    >
      {/* Image — zoom on hover via CSS group */}
      <div className="overflow-hidden h-48 shrink-0">
        <img
          src={SERVICE_IMAGES[serviceKey]}
          alt={data.h3}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <span className="text-secondary-container">
          <ServiceIcon serviceKey={serviceKey} />
        </span>
        <h3 className="text-white font-headline font-bold text-headline-md leading-snug">
          {data.h3}
        </h3>
        <p className="text-white/55 text-body-md font-body leading-relaxed flex-1">
          {data.copy}
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-secondary-container font-label font-semibold text-label-bold tracking-wide uppercase transition-all duration-200 hover:gap-3 group/link"
          aria-label={`Learn more about ${data.h3}`}
        >
          Learn More
          <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const getItem = (key: ServiceKey): ServiceItemData => t.raw(`items.${key}`) as ServiceItemData;

  return (
    <section id="services" className="py-20 md:py-[120px] bg-on-surface" aria-labelledby="services-heading">
      <div className="max-w-container mx-auto px-4 md:px-10">

        {/* Header — two column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 mb-12"
        >
          <div className="shrink-0">
            <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase mb-3">
              {t('eyebrow')}
            </span>
            <h2 id="services-heading" className="text-display-mobile md:text-headline-lg font-headline font-bold text-white">
              {t('h2')}
            </h2>
          </div>
          <p className="text-body-lg font-body text-white/55 md:max-w-sm md:pb-1">
            {t('subtitle')}
          </p>
        </motion.div>

        {/*
          MOBILE (<sm): carrusel horizontal — flex row, scroll suave, sin scrollbar visible.
          DESKTOP (sm+): grid 2 columnas → 4 columnas en lg.
          Se usan max-sm: para aislar estilos mobile y evitar conflictos con el grid.
        */}
        {/*
          MOBILE: grid-flow-col + auto-cols-[82vw] crea un carrusel horizontal de 1 fila.
            [touch-action:pan-x] le indica al browser que este elemento solo captura
            gestos horizontales — evita que el scroll vertical de la página interfiera.
          DESKTOP (sm+): sm:grid-flow-row + sm:grid-cols-2 → lg:grid-cols-4 vuelve al grid normal.
        */}
        {/* overscroll-x-contain evita que el scroll horizontal encadene al padre,
            sin bloquear el scroll vertical de la página cuando el dedo está sobre el carrusel */}
        <div className="grid grid-flow-col auto-cols-[82vw] overflow-x-auto overscroll-x-contain gap-4 pb-3 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:gap-5 sm:pb-0 sm:mx-0 sm:px-0">
          {SERVICE_KEYS.map((key, i) => (
            <ServiceCard
              key={key}
              serviceKey={key}
              data={getItem(key)}
              index={i}
            />
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-[100px] relative overflow-hidden rounded-2xl border border-secondary-container/20 bg-gradient-to-br from-primary-container via-primary to-[#011f1b] p-5 md:p-9 flex flex-row items-center gap-4 md:gap-6 group"
        >
          {/* Ambient glow top-left */}
          <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-secondary-container/10 blur-3xl" />
          {/* Top accent line */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-container/50 to-transparent" />

          {/* Icon */}
          <div className="shrink-0 w-11 h-11 md:w-16 md:h-16 rounded-full bg-secondary-container/15 border border-secondary-container/25 flex items-center justify-center text-secondary-container shadow-glow-mint/30">
            <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 4v4h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>

          {/* Text
              Para cambiar tamaño en MOBILE: editar el primer valor  → text-[15px]
              Para cambiar tamaño en DESKTOP: editar el valor md:    → md:text-headline-md
              Valores disponibles del design system: text-label-bold(13px) · text-body-md(16px) · text-body-lg(18px) · text-headline-md(24px) · text-headline-lg(32px)
              También podés usar px directos: text-[14px], text-[16px], etc.
          */}
          <div className="flex-1 text-left">
            <h3 className="text-white font-headline font-bold text-[16px] md:text-headline-md leading-snug">
              {t('ctaCard.title')}
            </h3>
            <p className="text-white/55 text-[12px] md:text-body-md font-body mt-1">
              {t('ctaCard.desc')}
            </p>
          </div>

          {/* Arrow button → /contact */}
          <Link
            href="/contact"
            aria-label={t('ctaCard.cta')}
            className="shrink-0 w-9 h-9 md:w-14 md:h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary transition-all duration-300 hover:scale-110 hover:shadow-glow-mint group-hover:translate-x-0.5"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
