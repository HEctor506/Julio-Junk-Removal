'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 3h13v10H1zM14 7h4l3 3v4h-7V7z" />
      <circle cx="5.5" cy="17.5" r="1.5" />
      <circle cx="18.5" cy="17.5" r="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const rawTiers = t.raw('tiers');
  const tiers: { name: string; example: string; cta: string; popular?: boolean }[] = Array.isArray(rawTiers) ? rawTiers : [];
  const rawPerks = t.raw('perks');
  const perks: string[] = Array.isArray(rawPerks) ? rawPerks : [];

  return (
    <section id="pricing" className="py-20 md:py-[120px] bg-on-surface" aria-labelledby="pricing-heading">
      <div className="max-w-container mx-auto px-4 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 id="pricing-heading" className="text-headline-lg font-headline font-bold text-white">
            {t('h2')}
          </h2>
          <p className="text-body-lg font-body text-white/60 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center">
          {tiers.map((tier, i) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-200 ${
                tier.popular
                  ? 'bg-white/[0.07] border-2 border-secondary-container md:scale-105 shadow-glow-mint'
                  : 'bg-white/[0.04] border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="btn-shimmer text-on-secondary-container text-label-bold font-label font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase text-xs">
                    {t('mostPopular')}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                tier.popular ? 'bg-secondary-container/20' : 'bg-white/8'
              }`}>
                <TruckIcon className={`w-6 h-6 ${tier.popular ? 'text-secondary-container' : 'text-white/50'}`} />
              </div>

              {/* Name */}
              <div>
                <h3 className="text-headline-md font-headline font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className={`text-body-md font-body leading-relaxed ${
                  tier.popular ? 'text-secondary-container' : 'text-white/50'
                }`}>
                  {tier.example}
                </p>
              </div>

              {/* Perks */}
              <ul className="flex flex-col gap-2.5">
                {perks.map((perk) => (
                  <li key={perk} className={`flex items-center gap-2.5 text-body-md font-body ${
                    tier.popular ? 'text-secondary-container' : 'text-white/50'
                  }`}>
                    <CheckIcon />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={siteConfig.phoneHref}
                className={`mt-auto text-center px-6 py-3.5 rounded-full font-headline font-bold text-label-bold tracking-wide uppercase transition-all duration-200 active:scale-95 ${
                  tier.popular
                    ? 'btn-shimmer text-on-secondary-container'
                    : 'border border-white/20 text-white/80 hover:border-secondary-container hover:text-secondary-container'
                }`}
              >
                {tier.cta}
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-body-md font-body text-white/40 max-w-2xl mx-auto mb-8">
            {t('includes')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-shimmer text-on-secondary-container px-8 py-4 rounded-full font-headline font-bold flex items-center gap-2 active:scale-95">
              {t('cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-body-md font-body text-white/40">{t('footNote')}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
