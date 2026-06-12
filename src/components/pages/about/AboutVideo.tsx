'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const VIDEO_SRC = '/videos/video1.mp4';

export default function AboutVideo() {
  const t = useTranslations('aboutPage.video');

  return (
    <section className="py-20 md:py-[120px] bg-on-surface" aria-labelledby="video-heading">
      <div className="max-w-container mx-auto px-4 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 id="video-heading" className="text-headline-lg font-headline font-bold text-white">
            {t('h2')}
          </h2>
          <p className="text-body-lg font-body text-white/55 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/[0.04]"
        >
          {VIDEO_SRC ? (
            <video
              src={VIDEO_SRC}
              controls
              className="w-full h-full object-cover"
              poster=""
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center shadow-glow-mint">
                <svg className="w-8 h-8 text-on-secondary-container ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/30 text-sm font-label tracking-widest uppercase">
                {t('comingSoon')}
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
