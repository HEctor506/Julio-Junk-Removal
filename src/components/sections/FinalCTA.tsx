'use client';

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';
import { motion } from 'motion/react';
import { Link } from '@/navigation';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <section className="pt-20 md:pt-[120px] mb-20 md:mb-[120px] px-4 md:px-10 max-w-6xl mx-auto" aria-label="Call to action">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-primary-container rounded-3xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden"
      >
        {/* Decorative orbs */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/3 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display-mobile md:text-[44px] font-display font-bold text-white max-w-4xl mx-auto relative"
        >
          {t('h2')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg font-body text-on-primary-container/80 max-w-2xl mx-auto relative"
        >
          {t('paragraph')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center pt-4 relative"
        >
          <Link
            href="/contact"
            className="btn-shimmer px-7 py-4 md:px-10 md:py-6 shadow-xl hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
          >
            {t('ctaPrimary')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href={siteConfig.phoneHref}
            className="bg-white/15 text-white border-2 border-white/25 px-7 py-4 md:px-10 md:py-6 rounded-full font-headline font-semibold hover:bg-white/25 transition-all duration-200 flex items-center justify-center gap-3 active:scale-95 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {siteConfig.phone}
          </Link>
        </motion.div>


      </motion.div>
    </section>
  );
}
