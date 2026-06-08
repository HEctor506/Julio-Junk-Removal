'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

export default function Pricing() {
  const t = useTranslations('pricing');
  const tiers = t.raw('tiers') as { name: string; example: string; cta: string; popular?: boolean }[];

  return (
    <section id="pricing" className="section-padding container-max" aria-labelledby="pricing-heading">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4"
      >
        <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
          Pricing
        </span>
        <h2 id="pricing-heading" className="text-headline-lg font-headline font-bold text-primary">
          {t('h2')}
        </h2>
        <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-start">
        {tiers.map((tier, i) => (
          <motion.article
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-2xl p-8 flex flex-col gap-6 border transition-all duration-200 ${
              tier.popular
                ? 'bg-primary text-white border-primary shadow-xl md:scale-105 md:-translate-y-2'
                : 'bg-white text-on-surface border-outline-variant shadow-card hover:shadow-card-hover'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="btn-shimmer text-on-secondary-container text-label-bold font-label font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase text-xs">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              <h3 className={`text-headline-md font-headline font-bold mb-2 ${tier.popular ? 'text-white' : 'text-primary'}`}>
                {tier.name}
              </h3>
              <p className={`text-body-md font-body ${tier.popular ? 'text-white/75' : 'text-on-surface-variant'}`}>
                {tier.example}
              </p>
            </div>

            <Link
              href={siteConfig.phoneHref}
              className={`mt-auto text-center px-6 py-3.5 rounded-xl font-headline font-semibold transition-all duration-200 active:scale-95 ${
                tier.popular
                  ? 'btn-shimmer text-on-secondary-container hover:brightness-110'
                  : 'bg-primary text-white hover:brightness-110'
              }`}
            >
              {tier.cta}
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <p className="text-body-md font-body text-on-surface-variant max-w-2xl mx-auto mb-8">
          {t('includes')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            {t('cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-body-md font-body text-on-surface-variant">{t('footNote')}</p>
        </div>
      </motion.div>
    </section>
  );
}
