'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

export default function AboutMap() {
  const t = useTranslations('aboutPage.map');

  const INFO = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: t('serviceAreaLabel'),
      value: `${siteConfig.city}, ${siteConfig.state} & surrounding areas`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t('hoursLabel'),
      value: siteConfig.hours,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('phoneLabel'),
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
    },
  ];

  return (
    <section className="py-20 md:py-[120px] bg-surface-container-low" aria-labelledby="map-heading">
      <div className="max-w-container mx-auto px-4 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 id="map-heading" className="text-headline-lg font-headline font-bold text-primary">
            {t('h2')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl border border-outline-variant/20"
        >
          {/* Map */}
          <div className="h-72 lg:h-auto min-h-[360px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3022.215151767!2d-74.00594!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(1.1) contrast(1.05)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Julio Junk Removal service area"
              className="w-full h-full"
            />
          </div>

          {/* Info panel */}
          <div className="bg-primary p-10 md:p-14 flex flex-col justify-center gap-8">
            <div className="space-y-2">
              <span className="text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
                {t('findUs')}
              </span>
              <h3 className="text-headline-md font-headline font-bold text-white">
                {t('serving', { city: siteConfig.city })}
              </h3>
              <p className="text-white/60 text-body-md font-body">
                {t('subtext')}
              </p>
            </div>

            <ul className="space-y-5">
              {INFO.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="text-secondary-container shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white/40 text-xs font-label font-semibold tracking-widest uppercase mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-white font-body text-body-md hover:text-secondary-container transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-body text-body-md">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.city}, ${siteConfig.state}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer text-on-secondary-container px-6 py-3 rounded-full font-headline font-bold text-center flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('getDirections')}
              </a>
              <Link
                href={siteConfig.phoneHref}
                className="border border-white/20 text-white px-6 py-3 rounded-full font-headline font-bold text-center hover:border-secondary-container hover:text-secondary-container transition-colors active:scale-95"
              >
                {siteConfig.phone}
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
