'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function ContactHero() {
  const t = useTranslations('contactPage.hero');

  return (
    <section
      className="relative min-h-[40vh] flex items-center pt-[150px] md:pt-[160px] pb-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #013e37 0%, #015748 100%)' }}
    >
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '36px 36px' }} aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl space-y-5"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-semibold tracking-widest">
            {t('badge')}
          </span>
          <h1 className="text-display-mobile md:text-display-lg font-display font-bold text-white leading-tight">
            {t('h1Prefix')} <span className="text-secondary-container">{t('h1Highlight')}</span>
          </h1>
          <p className="text-body-lg text-white/80">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
