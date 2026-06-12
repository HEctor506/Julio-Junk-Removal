'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

type FormState = 'idle' | 'submitting' | 'success' | 'error';
type ServiceOption = { value: string; label: string };

const inputClass =
  'w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 text-body-md font-body text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200';

export default function ContactFormFull() {
  const t = useTranslations('contactForm');
  const rawOptions = t.raw('serviceOptions');
  const serviceOptions: ServiceOption[] = Array.isArray(rawOptions) ? rawOptions : [];

  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', service: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-2xl shadow-card border border-outline-variant/20 p-12 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-tertiary-container rounded-full flex items-center justify-center mx-auto"
          >
            <svg className="w-12 h-12 text-on-tertiary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </svg>
          </motion.div>

          <div className="space-y-3">
            <h2 className="text-headline-lg font-headline font-bold text-primary">{t('successTitle')}</h2>
            <p className="text-body-lg text-on-surface-variant max-w-md mx-auto">
              {t('fullSuccessMessage')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm mx-auto">
            <a href={siteConfig.phoneHref} className="btn-shimmer text-on-secondary-container py-3 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28l1.5 4.5-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3 4.5 1.5V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" /></svg>
              {t('callNow')}
            </a>
            <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 hover:brightness-110 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656z" /></svg>
              WhatsApp
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-card border border-outline-variant/20 p-8 md:p-10 space-y-5"
          noValidate
        >
          <h2 className="text-headline-md font-headline font-bold text-primary mb-6">{t('fullFormH2')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-label font-semibold text-on-surface mb-1.5">{t('nameLabel')} *</label>
              <input id="name" name="name" type="text" required autoComplete="name" placeholder={t('nameInputPlaceholder')} value={form.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-label font-semibold text-on-surface mb-1.5">{t('phoneLabel')} *</label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder={t('phoneInputPlaceholder')} value={form.phone} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-label font-semibold text-on-surface mb-1.5">{t('emailLabel')}</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder={t('emailInputPlaceholder')} value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-label font-semibold text-on-surface mb-1.5">{t('serviceLabel')}</label>
              <select id="service" name="service" value={form.service} onChange={handleChange} className={inputClass}>
                <option value="">{t('serviceDefault')}</option>
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-label font-semibold text-on-surface mb-1.5">{t('messageLabel')} *</label>
            <textarea
              id="message" name="message" required rows={5}
              placeholder={t('messageInputPlaceholder')}
              value={form.message} onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          {state === 'error' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert" className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl">
              {t('errorWithPhone', { phone: siteConfig.phone })}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="w-full btn-shimmer text-on-secondary-container py-4 rounded-xl font-headline font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {state === 'submitting' ? t('submitting') : t('fullSubmit')}
            {state !== 'submitting' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            )}
          </button>

          <p className="text-center text-xs text-on-surface-variant">
            {t('note')}{' '}
            <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">WhatsApp</a>
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
