'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as { number: string; title: string; copy: string }[];

  return (
    <section className="section-padding bg-surface-container-low" aria-labelledby="how-it-works-heading">
      <div className="max-w-container mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase mb-3">
            Simple Process
          </span>
          <h2 id="how-it-works-heading" className="text-headline-lg font-headline font-bold text-primary mb-4">
            {t('h2')}
          </h2>
          <p className="text-body-lg font-body text-on-surface-variant">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] w-3/4 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center space-y-4 border border-outline-variant/20 group"
              >
                <div
                  className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-headline-md font-headline font-bold mb-6 group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors duration-300 shadow-lg"
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <h3 className="text-headline-md font-headline font-semibold text-primary">{step.title}</h3>
                <p className="text-body-md font-body text-on-surface-variant">{step.copy}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
