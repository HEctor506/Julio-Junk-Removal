import { useTranslations } from 'next-intl';

const BENEFIT_ICONS = [
  // Same-Day
  <svg key="0" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Free Estimates
  <svg key="1" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  // Affordable
  <svg key="2" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Licensed
  <svg key="3" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  // 7 Days
  <svg key="4" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  // Eco
  <svg key="5" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  // Fast
  <svg key="6" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  // Commercial
  <svg key="7" className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
];

export default function WhyChooseUs() {
  const t = useTranslations('about');
  const benefits = t.raw('benefits') as { title: string; copy: string }[];

  return (
    <section
      id="about"
      className="py-20 md:py-[120px] bg-surface-container-low"
      aria-labelledby="about-heading"
    >
      <div className="max-w-container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: copy */}
          <div className="space-y-8">
            <h2 id="about-heading" className="text-headline-lg font-headline font-bold text-primary">
              {t('h2')}
            </h2>
            <p className="text-body-lg font-body text-on-surface-variant">
              {t('paragraph')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-card shrink-0">
                    {BENEFIT_ICONS[i]}
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-primary">{benefit.title}</h3>
                    <p className="text-body-md font-body text-on-surface-variant">{benefit.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + stat badge */}
          <div className="relative">
            <div
              className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10"
              aria-hidden="true"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS4uZmT2sVo6Ld7BQN_jYSzx_rXHWaMih0vTxjEYNZQYkS2Sw3lROGpr75bIzP3-dGbfrGeL4TZk6jAEsmRUK9hNw7bSthnEibW-ojJrWDbe1J2m6V7FvUl4-C8rJuYJ-Du4QwE-ubZ-xCobcycXvVjd71YMOn6gOwwLjHLl4a7TQx8uKNKa69a3OQj_ewZSjIQjyO9xCZLeG4FI5hKXWFMyRUd-mPFzABU8Dc1a_IIdhNRm1oMEtAoUEwasTDdsXTyIsY_8ZJrnw"
              alt="Julio Junk Removal team member next to truck"
              className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              loading="lazy"
            />
            {/* Stat badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs">
              <p className="text-headline-md font-headline font-bold text-primary">
                {t('statValue')}
              </p>
              <p className="text-body-md font-body text-on-surface-variant">{t('statLabel')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
