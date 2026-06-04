import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export default function Pricing() {
  const t = useTranslations('pricing');
  const tiers = t.raw('tiers') as { name: string; example: string; cta: string; popular?: boolean }[];

  return (
    <section
      id="pricing"
      className="section-padding container-max"
      aria-labelledby="pricing-heading"
    >
      <div className="text-center mb-16 space-y-4">
        <h2 id="pricing-heading" className="text-headline-lg font-headline font-bold text-primary">
          {t('h2')}
        </h2>
        <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={`relative rounded-2xl p-8 flex flex-col gap-6 border transition-all duration-200 ${
              tier.popular
                ? 'bg-primary text-white border-primary shadow-xl scale-105'
                : 'bg-white text-on-surface border-outline-variant shadow-card hover:shadow-card-hover'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-secondary-container text-on-secondary-container text-label-bold font-label font-semibold px-4 py-1 rounded-full tracking-widest uppercase">
                  Most Popular
                </span>
              </div>
            )}

            <div>
              <h3 className={`text-headline-md font-headline font-bold mb-2 ${tier.popular ? 'text-white' : 'text-primary'}`}>
                {tier.name}
              </h3>
              <p className={`text-body-md font-body ${tier.popular ? 'text-white/80' : 'text-on-surface-variant'}`}>
                {tier.example}
              </p>
            </div>

            <a
              href={siteConfig.phoneHref}
              className={`mt-auto text-center px-6 py-3 rounded-xl font-headline font-semibold transition-all duration-200 active:scale-95 ${
                tier.popular
                  ? 'bg-secondary-container text-on-secondary-container hover:brightness-110'
                  : 'bg-primary text-white hover:brightness-110'
              }`}
            >
              {tier.cta}
            </a>
          </article>
        ))}
      </div>

      <p className="text-center text-body-md font-body text-on-surface-variant max-w-2xl mx-auto mb-8">
        {t('includes')}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#contact" className="btn-primary">
          {t('cta')}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <p className="text-body-md font-body text-on-surface-variant">{t('footNote')}</p>
      </div>
    </section>
  );
}
