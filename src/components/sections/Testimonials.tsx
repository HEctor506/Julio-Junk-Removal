import { useTranslations } from 'next-intl';

function StarRating() {
  return (
    <div className="flex text-secondary-container" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const reviews = t.raw('reviews') as { text: string; author: string; role: string }[];

  const initials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <section className="py-20 md:py-[120px] bg-primary text-on-primary overflow-hidden relative" aria-labelledby="testimonials-heading">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="max-w-container mx-auto px-4 md:px-10 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 id="testimonials-heading" className="text-headline-lg font-headline font-bold mb-4">
              {t('h2')}
            </h2>
            <p className="text-body-lg font-body text-primary-fixed">{t('subtitle')}</p>
          </div>
          {/* Google rating badge */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
            <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div>
              <p className="font-headline font-bold">{t('badge')}</p>
              <p className="text-xs text-white/75">{t('badgeSub')}</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <article
              key={review.author}
              className="bg-white text-on-surface p-8 rounded-2xl space-y-6 shadow-xl"
            >
              <StarRating />
              <blockquote>
                <p className="text-body-md font-body italic">"{review.text}"</p>
              </blockquote>
              <footer className="flex items-center gap-4 border-t border-outline-variant pt-6">
                <div
                  className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-white font-headline font-bold text-sm"
                  aria-hidden="true"
                >
                  {initials(review.author)}
                </div>
                <div>
                  <cite className="font-headline font-bold not-italic">{review.author}</cite>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">
                    {review.role}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
