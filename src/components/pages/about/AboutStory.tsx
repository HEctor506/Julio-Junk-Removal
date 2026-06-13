'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function AboutStory() {
  const t = useTranslations('aboutPage.story');
  const rawBullets = t.raw('bullets');
  const bullets: string[] = Array.isArray(rawBullets) ? rawBullets : [];

  return (
    <>
      <section className="py-20 md:py-[120px]">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={  { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img
                src="/images/scene3.jpeg"
                alt="Julio Junk Removal team"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-8 right-0 lg:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-outline-variant/20"
              >
                <p className="text-headline-md font-headline font-bold text-secondary-container">{t('badge1')}</p>
                <p className="text-sm text-on-surface-variant">{t('badge2')}</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
                {t('eyebrow')}
              </span>
              <h2 className="text-headline-lg font-headline font-bold text-primary">
                {t('h2')}
              </h2>
              <p className="text-body-lg font-body text-on-surface-variant">{t('p1')}</p>
              <p className="text-body-lg font-body text-on-surface-variant">{t('p2')}</p>
              <ul className="space-y-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-md font-body text-on-surface">
                    <svg className="w-5 h-5 text-secondary-container shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
