'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  };

  const inputClass =
    'w-full bg-white border border-outline-variant rounded-xl px-4 py-3 text-body-md font-body text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200';

  return (
    <section
      id="contact"
      className="section-padding container-max"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h2 id="contact-heading" className="text-headline-lg font-headline font-bold text-primary">
            {t('h2')}
          </h2>
          <p className="text-body-lg font-body text-on-surface-variant">{t('subtitle')}</p>
        </div>

        {state === 'success' ? (
          <div className="bg-tertiary-container rounded-2xl p-10 text-center space-y-4">
            <svg className="w-16 h-16 text-on-tertiary-container mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-headline-md font-headline font-bold text-on-tertiary-container">
              {t('successTitle')}
            </h3>
            <p className="text-body-lg font-body text-on-tertiary-container/80">
              {t('successMessage')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-card p-8 md:p-10 space-y-5"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="sr-only">{t('namePlaceholder')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t('namePlaceholder')}
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">{t('phonePlaceholder')}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder={t('phonePlaceholder')}
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">{t('emailPlaceholder')}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('emailPlaceholder')}
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">{t('messagePlaceholder')}</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder={t('messagePlaceholder')}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {state === 'error' && (
              <p role="alert" className="text-error text-body-md font-body text-center">
                {t('errorMessage')}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full btn-primary py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'submitting' ? t('submitting') : t('submit')}
              {state !== 'submitting' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
