'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant hover:shadow-card-hover transition-all duration-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full p-6 text-left"
      >
        <h3 className="font-headline font-bold text-primary pr-4">{q}</h3>
        <svg
          className={`w-6 h-6 text-primary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-body-md font-body text-on-surface-variant">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 md:px-10">
        <h2
          id="faq-heading"
          className="text-headline-lg font-headline font-bold text-primary text-center mb-12"
        >
          {t('h2')}
        </h2>

        <dl className="space-y-4">
          {items.map((item, i) => (
            <div key={i}>
              <FAQItem
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
