'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

const BENEFIT_ICONS = [
  <svg key="0" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg key="5" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  <svg key="6" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="7" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
];

export default function WhyChooseUs() {
  const t = useTranslations('about');
  const benefits = t.raw('benefits') as { title: string; copy: string }[];

  return (
    <section id="about" className="py-20 md:py-[120px]" aria-labelledby="about-heading">
      <div className="max-w-container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase mb-3">
                Why Us
              </span>
              <h2 id="about-heading" className="text-headline-lg font-headline font-bold text-primary">
                {t('h2')}
              </h2>
            </div>
            <p className="text-body-lg font-body text-on-surface-variant">
              {t('paragraph')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 hover:border-primary/20 hover:shadow-card transition-all duration-200"
                >
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-card shrink-0 text-secondary-container">
                    {BENEFIT_ICONS[i]}
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary text-sm">{benefit.title}</h3>
                    <p className="text-body-md font-body text-on-surface-variant text-sm">{benefit.copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: image + badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-12 right-0 w-64 h-64 bg-secondary-container/15 rounded-full blur-3xl -z-10" aria-hidden="true" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS4uZmT2sVo6Ld7BQN_jYSzx_rXHWaMih0vTxjEYNZQYkS2Sw3lROGpr75bIzP3-dGbfrGeL4TZk6jAEsmRUK9hNw7bSthnEibW-ojJrWDbe1J2m6V7FvUl4-C8rJuYJ-Du4QwE-ubZ-xCobcycXvVjd71YMOn6gOwwLjHLl4a7TQx8uKNKa69a3OQj_ewZSjIQjyO9xCZLeG4FI5hKXWFMyRUd-mPFzABU8Dc1a_IIdhNRm1oMEtAoUEwasTDdsXTyIsY_8ZJrnw"
              alt="Julio Junk Removal professional team"
              className="rounded-2xl shadow-xl w-full object-cover h-[480px]"
              loading="lazy"
            />
            {/* Stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 left-0 lg:-left-6 bg-white p-5 rounded-2xl shadow-xl border border-outline-variant/20"
            >
              <p className="text-headline-lg font-headline font-bold text-secondary-container">{t('statValue')}</p>
              <p className="text-body-md font-body text-on-surface-variant text-sm max-w-[180px]">{t('statLabel')}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
