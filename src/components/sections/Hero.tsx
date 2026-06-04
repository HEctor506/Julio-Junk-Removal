import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/config';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="home"
      className="relative min-h-[700px] flex items-center pt-12 pb-24 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhMQ69x5HAGvJI5FELpqyMq7Hq1G8D4fpMqd3rD-FJIq5tOXY8kgZDA-bUDl7MpPXCqGCmRDjlbSne7WoJFeSVawjPtjF0LVqdCmAgGxOEYh62MBWsJIM0AxPMnMujASn-CU066Jj_1uoT8Lt5IwBh3b7IlHzCvk8ajguzGc6wVZ04oK4JRFi2U3SXSTuRrwHpoHiA7sJBiDi79dMAGny9w0U1JzeTm-me1KkGKkq9C-62BukiwBBB6f5kMlB2qfsAGz_Yw1vvGPc"
          alt="Professional junk removal truck"
          className="w-full h-full object-cover grayscale opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20, 45, 80, 0.55)' }} />
      </div>

      <div className="max-w-container mx-auto px-4 md:px-10 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full border border-white/20">
            <svg className="w-4 h-4 text-secondary-container" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12z"/>
            </svg>
            <span className="text-label-bold font-label font-semibold tracking-widest">
              {t('badge')}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-display-mobile md:text-display-lg font-display font-bold leading-tight text-white">
            {t('h1Line1')}
            <br className="hidden md:block" />
            {t('h1Line2')}
          </h1>

          <p className="text-body-lg font-body max-w-xl text-blue-100">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contact"
              className="bg-secondary-container text-on-secondary-container px-8 py-5 rounded-xl font-headline font-semibold text-headline-md shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
            >
              {t('ctaPrimary')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={siteConfig.phoneHref}
              className="bg-primary text-on-primary px-8 py-5 rounded-xl font-headline font-semibold text-headline-md shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('ctaSecondary')}
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 pt-6">
            <div className="flex items-center gap-2">
              <div className="flex text-secondary-container" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <span className="text-label-bold font-label font-semibold text-white">
                {t('trust1')}
              </span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-label-bold font-label font-semibold text-white">{t('trust2')}</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-label-bold font-label font-semibold text-white">{t('trust3')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
