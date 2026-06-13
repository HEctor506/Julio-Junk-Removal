'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const rawSteps = t.raw('steps');
  const steps: { number: string; title: string; copy: string }[] = Array.isArray(rawSteps) ? rawSteps : [];

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
            {t('eyebrow')}
          </span>
          <h2 id="how-it-works-heading" className="text-headline-lg font-headline font-bold text-primary mb-4">
            {t('h2')}
          </h2>
          <p className="text-body-lg font-body text-on-surface-variant">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          {/* Connector line — solo desktop, no aplica en carrusel mobile */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] w-3/4 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10"
            aria-hidden="true"
          />

          {/* MOBILE: grid-flow-col + auto-cols-[82vw] → carrusel horizontal de 1 fila
              DESKTOP (md+): md:grid-flow-row md:grid-cols-4 → grid normal de 4 columnas */}
          <ol className="grid grid-flow-col auto-cols-[65vw] overflow-x-auto overscroll-x-contain gap-6 pb-3 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid-flow-row md:auto-cols-auto md:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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
