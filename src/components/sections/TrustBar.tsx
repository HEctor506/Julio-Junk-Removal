'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import CountUp from '@/components/ui/CountUp';

const DURATION = 0.5;

export default function TrustBar() {
  const t = useTranslations('trustBar');

  const valueClass = 'text-headline-md md:text-headline-lg font-headline font-bold text-secondary-container';

  return (
    <section className="bg-primary" aria-label="Trust statistics">
      <div className="max-w-container mx-auto px-4 md:px-10 py-6">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20">

          {/* Stat 1: 2,000+ Jobs Completed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex flex-col items-center text-center py-2 md:px-6"
          >
            <dt className={valueClass}>
              <CountUp from={0} to={2000} separator="," duration={DURATION} />
              <span>+</span>
            </dt>
            <dd className="text-label-bold font-label font-semibold text-white/80 mt-1 tracking-wide">
              {t('stat1Label')}
            </dd>
          </motion.div>

          {/* Stat 2: 98% Satisfaction Rate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center py-2 md:px-6"
          >
            <dt className={valueClass}>
              <CountUp from={0} to={98} duration={DURATION} />
              <span>%</span>
            </dt>
            <dd className="text-label-bold font-label font-semibold text-white/80 mt-1 tracking-wide">
              {t('stat2Label')}
            </dd>
          </motion.div>

          {/* Stat 3: < 1 Hr Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center py-2 md:px-6"
          >
            <dt className={valueClass}>
              <span>{'< '}</span>
              <CountUp from={0.1} to={1} duration={DURATION} />
              <span>{' Hr'}</span>
            </dt>
            <dd className="text-label-bold font-label font-semibold text-white/80 mt-1 tracking-wide">
              {t('stat3Label')}
            </dd>
          </motion.div>

          {/* Stat 4: Licensed & Insured — text only, no counter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center py-2 md:px-6"
          >
            <dt className={valueClass}>
              {t('stat4Value')}
            </dt>
            <dd className="text-label-bold font-label font-semibold text-white/80 mt-1 tracking-wide">
              {t('stat4Label')}
            </dd>
          </motion.div>

        </dl>
      </div>
    </section>
  );
}