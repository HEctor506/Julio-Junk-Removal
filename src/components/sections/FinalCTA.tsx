import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <section
      className="mb-20 md:mb-[120px] px-4 md:px-10 max-w-container mx-auto"
      aria-label="Call to action"
    >
      <div className="bg-primary-container rounded-3xl p-10 md:p-24 text-center space-y-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <h2 className="text-display-mobile md:text-display-lg font-display font-bold text-white max-w-4xl mx-auto relative">
          {t('h2')}
        </h2>

        <p className="text-body-lg font-body text-on-primary-container max-w-2xl mx-auto relative">
          {t('paragraph')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 relative">
          <a
            href="#contact"
            className="bg-secondary-container text-on-secondary-container px-10 py-6 rounded-2xl font-headline font-semibold shadow-xl hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
          >
            {t('ctaPrimary')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href={siteConfig.phoneHref}
            className="bg-transparent text-white border-2 border-white/30 px-10 py-6 rounded-2xl font-headline font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {siteConfig.phone}
          </a>
        </div>

        <p className="text-body-md font-body text-on-primary-container/70 relative">{t('note')}</p>
      </div>
    </section>
  );
}
