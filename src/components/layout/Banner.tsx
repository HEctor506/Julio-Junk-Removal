'use client';

import { useTranslations } from 'next-intl';

const REPEATS = 4;

function Separator() {
  return (
    <span className="mx-6 text-secondary-container shrink-0" aria-hidden="true">★</span>
  );
}

export default function Banner() {
  const t = useTranslations('banner');
  const MESSAGE1 = t('message1');
  const MESSAGE2 = t('message2');
  const MESSAGE3 = t('message3');
  return (
    <div
      className="w-full overflow-hidden bg-secondary-container border-t border-white/10"
      aria-label="Announcement"
      role="marquee"
    >
      <div className="flex w-max animate-banner py-2">
        {Array.from({ length: REPEATS }).map((_, i) => (
          <span
            key={i}
            className="flex items-center shrink-0 gap-[0px] text-label-bold font-headline font-bold text-primary-container' tracking-widest uppercase whitespace-nowrap"
          >
            <Separator />
            <span>{MESSAGE1}</span>
            <Separator />
            <span>{MESSAGE2}</span>
            <Separator />
            <span>{MESSAGE3}</span>

          </span>
        ))}
      </div>
    </div>
  );
}
