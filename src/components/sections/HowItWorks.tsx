import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as { number: string; title: string; copy: string }[];

  return (
    <section className="section-padding container-max" aria-labelledby="how-it-works-heading">
      <div className="text-center mb-16">
        <h2 id="how-it-works-heading" className="text-headline-lg font-headline font-bold text-primary mb-4">
          {t('h2')}
        </h2>
        <p className="text-body-lg font-body text-on-surface-variant">{t('subtitle')}</p>
      </div>

      <div className="relative">
        {/* Connector line (desktop) */}
        <div
          className="hidden md:block absolute top-8 left-[12.5%] w-3/4 h-0.5 bg-surface-container-highest -z-10"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <li
              key={step.number}
              className="bg-white p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 text-center space-y-4 border border-outline-variant/30"
            >
              <div
                className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-headline-md font-headline font-bold mb-6"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <h3 className="text-headline-md font-headline font-semibold text-primary">
                {step.title}
              </h3>
              <p className="text-body-md font-body text-on-surface-variant">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
