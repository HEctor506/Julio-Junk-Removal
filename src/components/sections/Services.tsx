'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

type ServiceKey = 'residential' | 'commercial' | 'yard' | 'construction' | 'cleanout' | 'furniture' | 'appliances' | 'recycling';
type ServiceItemData = { h3: string; copy: string; items: string[] };

const SERVICE_IMAGES: Record<ServiceKey, string> = {
  residential: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  commercial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIRrtk0DcZ01tFUZ_iwm16CVZTV8wk32inRW7vOUH4D4AsUqegTc9RIqUxJy3bRyabkTZCoacS6f3U1FLUyxWap-aSgkuHPE3_dXVJQR0Tq4YF6QC0GR_AA9DkcP5dapkuKJ7qhbK530In7xmJjDaaDg1VIVmQKVW37R38prWK5Pqfg1TLnuNXCx8SyDQEzZCXEW9XSR9IwEkn43oYr6bgah8siitB7U4UbeWBz9x4BokPkQ1ULM-cSd24_NU5v7fnk0dt587z-gA',
  yard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuokji2Au9_qcisuAe45bU6_kjpDabtDq5NxSBnO98dVXs4d2OSPNb3U_W9Wc-WLO9e_iZ3mzucJQ3tL1bbjq3Cs8xgvS5Te6sPIAbgJoEo_U0EH2EunfJyQ5ceJIeY0aUMRIGIm-Yosvutenyfra5OeW_LuFPq4HEHdrAxqQw_f9To026bTKOiLb4izemXHTgHC5Xa217IuwQSFEw-cPTU9fEDhUy-hykUS6lMGJ9pLOqdGDgf82a2UlYM15QdIfv3W9vk_tE6oM',
  construction: 'https://www.junkhappens.com/wp-content/uploads/2017/08/Effective-Construction-Debris-Removal.jpg',
  cleanout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  furniture: 'https://byejunk.com/wp-content/uploads/2018/09/junk-furniture-003.jpeg',
  appliances: 'https://www.jdogjunkremoval.com/wp-content/uploads/2019/11/appliance-540x540.jpg',
  recycling: 'https://www.junkhappens.com/wp-content/uploads/2019/01/Junk-Removal.jpg',
};

const SERVICE_KEYS: ServiceKey[] = [
  'residential', 'commercial', 'yard', 'construction',
  'cleanout', 'furniture', 'appliances', 'recycling',
];

const captionVariants = {
  idle: { y: '100%' },
  hover: { y: 0 },
};

const mobileDetailsVariants = {
  collapsed: { opacity: 0, y: 14 },
  expanded: { opacity: 1, y: 0 },
};

const mobileTitleVariants = {
  collapsed: { y: 0 },
  expanded: { y: -124 },
};

function ServiceCard({
  serviceKey,
  data,
  isExpanded,
  onToggle,
}: {
  serviceKey: ServiceKey;
  data: ServiceItemData;
  isExpanded: boolean;
  onToggle: () => void;
}) {

  return (
    <>
      <motion.figure
        className="hidden md:block snap-start shrink-0 relative overflow-hidden rounded-2xl md:w-[320px] md:h-[440px] cursor-pointer"
        initial="idle"
        whileHover="hover"
      >
        <ServiceImage serviceKey={serviceKey} alt={data.h3} />

        {/* Gradient overlay slides up from below on desktop hover. */}
        <motion.figcaption
          className="absolute bottom-0 left-0 right-0 pt-20 px-5 pb-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white will-change-transform"
          variants={captionVariants}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <ServiceCopy data={data} />
        </motion.figcaption>
      </motion.figure>

      <motion.button
        type="button"
        className="md:hidden snap-start shrink-0 relative overflow-hidden rounded-2xl w-[260px] h-[380px] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${data.h3}`}
        onClick={onToggle}
        whileTap={{ scale: 0.985 }}
      >
        <ServiceImage serviceKey={serviceKey} alt="" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
          <motion.h3
            className="absolute inset-x-5 bottom-5 text-base font-headline font-bold leading-tight will-change-transform"
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={mobileTitleVariants}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.h3}
          </motion.h3>
          <motion.div
            className="absolute inset-x-5 bottom-5 will-change-transform"
            aria-hidden={!isExpanded}
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={mobileDetailsVariants}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServiceCopy data={data} hideTitle />
          </motion.div>
        </div>
      </motion.button>
    </>
  );
}

function ServiceImage({ serviceKey, alt }: { serviceKey: ServiceKey; alt: string }) {
  return (
    <img
      src={SERVICE_IMAGES[serviceKey]}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
  );
}

function ServiceCopy({ data, hideTitle = false }: { data: ServiceItemData; hideTitle?: boolean }) {
  return (
    <>
      {!hideTitle && (
        <h3 className="text-base font-headline font-bold leading-tight mb-2">
          {data.h3}
        </h3>
      )}
      <p className="text-sm font-body text-white/80 leading-snug mb-3">
        {data.copy}
      </p>
      <span className="text-xs font-semibold text-secondary-container tracking-wide uppercase">
        Get a Free Quote
      </span>
    </>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const getItem = (key: ServiceKey): ServiceItemData => t.raw(`items.${key}`) as ServiceItemData;
  const [expandedKey, setExpandedKey] = useState<ServiceKey | null>(null);

  return (
    <section id="services" className="section-padding container-max" aria-labelledby="services-heading">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-4"
      >
        <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
          What We Do
        </span>
        <h2 id="services-heading" className="text-headline-lg font-headline font-bold text-primary">
          {t('h2')}
        </h2>
        <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Horizontal scroll carousel */}
      <div className="services-scroll flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 md:-mx-10 px-4 md:px-10 pb-4">
        {SERVICE_KEYS.map((key) => {
          const data = getItem(key);
          return (
            <ServiceCard
              key={key}
              serviceKey={key}
              data={data}
              isExpanded={expandedKey === key}
              onToggle={() => setExpandedKey(expandedKey === key ? null : key)}
            />
          );
        })}
      </div>

      <p className="text-center text-sm text-on-surface-variant/40 mt-4 select-none md:hidden">
        Swipe to explore
      </p>
    </section>
  );
}
