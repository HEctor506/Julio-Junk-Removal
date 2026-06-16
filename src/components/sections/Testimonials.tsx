'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

function StarRating() {
  return (
    <div className="flex text-secondary-container" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

type Review = { text: string; author: string };

function ReviewCard({ review }: { review: Review }) {
  const initials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <article className="bg-white text-on-surface p-7 rounded-2xl shadow-card flex-shrink-0 w-[340px] md:w-[380px] flex flex-col justify-between gap-5 border border-outline-variant/20">
      <div className="space-y-4">
        <StarRating />
        <blockquote>
          <p className="text-body-md font-body text-on-surface-variant leading-relaxed">
            &ldquo;{review.text}&rdquo;
          </p>
        </blockquote>
      </div>
      <footer className="flex items-center gap-3 border-t border-outline-variant/30 pt-4">
        <div
          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-headline font-bold text-sm shrink-0"
          aria-hidden="true"
        >
          {initials(review.author)}
        </div>
        <cite className="font-headline font-bold not-italic text-on-surface">{review.author}</cite>
      </footer>
    </article>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const rawReviews = t.raw('reviews');
  const reviews: Review[] = Array.isArray(rawReviews) ? rawReviews : [];
  // Duplicate for seamless infinite loop
  const all = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-[120px] bg-primary overflow-hidden relative"
      aria-labelledby="testimonials-heading"
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="max-w-container mx-auto px-4 md:px-10 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          >
            <div>
              <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase mb-3">
                {t('eyebrow')}
              </span>
              <h2 id="testimonials-heading" className="text-headline-lg font-headline font-bold text-white mb-3">
                {t('h2')}
              </h2>
              <p className="text-body-lg font-body text-white/70 max-w-md">{t('subtitle')}</p>
            </div>
            {/* Google badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 bg-white/10 px-5 py-4 rounded-xl backdrop-blur-md border border-white/15 shrink-0"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div>
                <p className="font-headline font-bold text-white">{t('badge')}</p>
                <p className="text-xs text-white/60">{t('badgeSub')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Infinite ticker */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-ticker w-max px-4">
            {all.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
       
        {/* Leave a review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-container mx-auto px-4 md:px-10 mt-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white/10 border border-white/12 backdrop-blur-sm rounded-2xl px-6 py-5 md:px-8 md:py-6">
            {/* Left: Google logo + stars + text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card" aria-hidden="true">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div>
                <div className="flex text-secondary-container mb-1.5" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-body-md font-body text-white/80 leading-relaxed">{t('review-text')}</p>
              </div>
            </div>
            {/* CTA button */}
            <a
              href="https://www.google.com/maps/place/Julio+Junk+removal/@33.835649,-118.0405815,9z/data=!4m18!1m9!3m8!1s0x9adc18a1f99ef51:0x729536e5212a192a!2sJulio+Junk+removal!8m2!3d33.835649!4d-118.0405815!9m1!1b1!16s%2Fg%2F11mm7dh3pl!3m7!1s0x9adc18a1f99ef51:0x729536e5212a192a!8m2!3d33.835649!4d-118.0405815!9m1!1b1!16s%2Fg%2F11mm7dh3pl?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-headline font-bold text-sm hover:brightness-105 hover:shadow-glow-mint transition-all duration-200 active:scale-95 flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
            >
              {t('reviewCta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
