'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import CTA from '@/components/sections/CTA';

type ValueItem = { title: string; copy: string };

const ICONS = [
  <svg key="prof" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="eco" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  <svg key="price" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  <svg key="comm" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
];

export default function AboutValues() {
  const t = useTranslations('aboutPage.values');
  const rawItems = t.raw('items');
  const items: ValueItem[] = Array.isArray(rawItems) ? rawItems : [];

  return (
    <>
      <section className="py-20 md:py-[120px] bg-surface-container-low">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 space-y-3"
          >
            <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
              {t('eyebrow')}
            </span>
            <h2 className="text-headline-lg font-headline font-bold text-primary">{t('h2')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-7 rounded-2xl shadow-card border border-outline-variant/20 flex gap-5 hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-12 h-12 bg-secondary-container/10 rounded-xl flex items-center justify-center text-secondary-container shrink-0">
                  {ICONS[i]}
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary mb-1">{val.title}</h3>
                  <p className="text-body-md font-body text-on-surface-variant">{val.copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA variant="about" />
    </>
  );
}
