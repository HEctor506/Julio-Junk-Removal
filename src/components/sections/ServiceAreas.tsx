import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export default function ServiceAreas() {
  const t = useTranslations('serviceAreas');
  const cities = t.raw('cities') as string[];

  return (
    <section
      id="service-areas"
      className="py-20 md:py-[120px] bg-surface-container-low"
      aria-labelledby="service-areas-heading"
    >
      <div className="max-w-container mx-auto px-4 md:px-10">
        <div className="text-center mb-12 space-y-4">
          <h2 id="service-areas-heading" className="text-headline-lg font-headline font-bold text-primary">
            {t('h2')}
          </h2>
          <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
            {t('paragraph')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
          <p className="text-label-bold font-label font-semibold text-primary uppercase tracking-widest mb-6">
            {t('label')}
          </p>

          <ul className="flex flex-wrap gap-3 mb-8" aria-label="Service cities">
            {cities.map((city) => (
              <li
                key={city}
                className="bg-surface-container-low text-primary font-label font-semibold text-label-bold px-4 py-2 rounded-full border border-outline-variant"
              >
                {city}
              </li>
            ))}
          </ul>

          <p className="text-body-md font-body text-on-surface-variant mb-6">{t('note')}</p>

          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-headline font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
