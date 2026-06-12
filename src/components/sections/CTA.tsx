'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { siteConfig } from '@/lib/config';

type CTAVariant = 'services' | 'about';

export default function CTA({ variant }: { variant: CTAVariant }) {
  const t = useTranslations(`ctaBlock.${variant}`);

  return (
    <section className="py-20 px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-primary-container rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <h2 className="text-headline-lg md:text-display-mobile font-headline font-bold text-white relative">
          {t('heading')}
        </h2>
        <p className="text-body-lg text-white/75 relative">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <Link
            href="/contact"
            className="btn-shimmer text-on-secondary-container px-8 py-4 rounded-full font-headline font-bold flex items-center justify-center gap-2 active:scale-95"
          >
            {t('primary')}
          </Link>
          <Link
            href={siteConfig.phoneHref}
            className="bg-white/15 border-2 border-white/25 text-white px-8 py-4 rounded-full font-headline font-bold hover:bg-white/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {siteConfig.phone}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
