import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('trustBar');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  return (
    <section className="bg-primary" aria-label="Trust statistics">
      <div className="max-w-container mx-auto px-4 md:px-10 py-6">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center py-2 md:px-6">
              <dt className="text-headline-md md:text-headline-lg font-headline font-bold text-secondary-container">
                {stat.value}
              </dt>
              <dd className="text-label-bold font-label font-semibold text-white/80 mt-1 tracking-wide">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
