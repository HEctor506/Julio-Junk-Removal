'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export default function ContactInfo() {
  const t = useTranslations('contactPage.info');
  const rawBadges = t.raw('badges');
  const badges: string[] = Array.isArray(rawBadges) ? rawBadges : [];

  const CONTACT_INFO = [
    {
      label: t('phoneLabel'),
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    },
    {
      label: t('whatsappLabel'),
      value: `${siteConfig.phone} (WhatsApp)`,
      href: siteConfig.whatsappHref,
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656z" /></svg>,
    },
    {
      label: t('emailLabel'),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    },
    {
      label: t('hoursLabel'),
      value: siteConfig.hours,
      href: null,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-headline-md font-headline font-bold text-primary mb-2">{t('h2')}</h2>
      <p className="text-body-md text-on-surface-variant mb-6">{t('subtitle')}</p>

      <div className="space-y-4">
        {CONTACT_INFO.map((info, i) => (
          <motion.div
            key={info.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-outline-variant/20 shadow-card"
          >
            <div className="w-11 h-11 bg-secondary-container/10 rounded-xl flex items-center justify-center text-secondary-container shrink-0">
              {info.icon}
            </div>
            <div>
              <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-widest mb-0.5">{info.label}</p>
              {info.href ? (
                <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-body-md font-semibold text-primary hover:text-secondary-container transition-colors">
                  {info.value}
                </a>
              ) : (
                <p className="text-body-md font-semibold text-primary">{info.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1.5 bg-surface-container-low border border-outline-variant text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 text-secondary-container" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            {badge}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
