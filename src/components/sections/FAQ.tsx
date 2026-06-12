'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';

function FAQItem({ q, a, isOpen, onToggle, index }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-primary/20 shadow-card-hover'
          : 'border-outline-variant hover:border-primary/20 shadow-card'
      } bg-white`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full p-6 text-left group"
      >
        <h3 className={`font-headline font-bold pr-4 transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
          {q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isOpen ? 'bg-primary text-white' : 'bg-surface-container-low text-primary'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-outline-variant/30 mb-4" />
              <p className="text-body-md font-body text-on-surface-variant leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const t = useTranslations('faq');
  const rawItems = t.raw('items');
  const items: { q: string; a: string }[] = Array.isArray(rawItems) ? rawItems : [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-surface-container-low" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-3"
        >
          <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 id="faq-heading" className="text-headline-lg font-headline font-bold text-primary">
            {t('h2')}
          </h2>
        </motion.div>

        <dl className="space-y-3">
          {items.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
