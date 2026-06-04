import { useTranslations } from 'next-intl';

type ServiceKey = 'residential' | 'commercial' | 'yard' | 'construction' | 'cleanout' | 'furniture' | 'appliances' | 'recycling';

const SERVICE_ICONS: Record<ServiceKey, React.ReactNode> = {
  residential: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  commercial: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  yard: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  construction: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  cleanout: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  furniture: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  appliances: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  ),
  recycling: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
};

const SERVICE_IMAGES: Record<ServiceKey, string> = {
  residential: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  commercial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIRrtk0DcZ01tFUZ_iwm16CVZTV8wk32inRW7vOUH4D4AsUqegTc9RIqUxJy3bRyabkTZCoacS6f3U1FLUyxWap-aSgkuHPE3_dXVJQR0Tq4YF6QC0GR_AA9DkcP5dapkuKJ7qhbK530In7xmJjDaaDg1VIVmQKVW37R38prWK5Pqfg1TLnuNXCx8SyDQEzZCXEW9XSR9IwEkn43oYr6bgah8siitB7U4UbeWBz9x4BokPkQ1ULM-cSd24_NU5v7fnk0dt587z-gA',
  yard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuokji2Au9_qcisuAe45bU6_kjpDabtDq5NxSBnO98dVXs4d2OSPNb3U_W9Wc-WLO9e_iZ3mzucJQ3tL1bbjq3Cs8xgvS5Te6sPIAbgJoEo_U0EH2EunfJyQ5ceJIeY0aUMRIGIm-Yosvutenyfra5OeW_LuFPq4HEHdrAxqQw_f9To026bTKOiLb4izemXHTgHC5Xa217IuwQSFEw-cPTU9fEDhUy-hykUS6lMGJ9pLOqdGDgf82a2UlYM15QdIfv3W9vk_tE6oM',
  construction: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLM2qPtVDoIsyYjLzYPHTQ8Xq7tWIpXz9oevYdV95B0mCOO_TFMR3fUJxlsUADrzvaWbHoRm7FoDJUjPOsmzY9CEQ07V2tJaGde0RetPthER47YxCI9xwnlYbBJ7JxOVgQ37o27uf3BiU8tcTL8tbUeYETc8-O0pCvN1A20AhvpIxur9LjsT_Hs0wiVP5ZkQNIPq4fA0F0Pge8Q31dOdtCTwcg7mSTeKlPlOP74Vk6E2m3BnRffzItwNSC0',
  cleanout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  furniture: '',
  appliances: '',
  recycling: '',
};

type ServiceItemData = { h3: string; copy: string; items: string[] };

function ServiceCard({
  serviceKey,
  data,
  variant = 'image',
  colSpan = '',
}: {
  serviceKey: ServiceKey;
  data: ServiceItemData;
  variant?: 'image' | 'color' | 'accent';
  colSpan?: string;
}) {
  const imgSrc = SERVICE_IMAGES[serviceKey];
  const icon = SERVICE_ICONS[serviceKey];

  if (variant === 'color') {
    return (
      <article className={`group relative overflow-hidden rounded-xl shadow-card bg-primary-container h-64 ${colSpan}`}>
        <div className="relative p-8 h-full flex flex-col justify-center items-center text-center text-white">
          <div className="text-white/80 mb-4">{icon}</div>
          <h3 className="text-headline-md font-headline font-semibold mb-2">{data.h3}</h3>
          <p className="text-body-md font-body opacity-80">{data.copy}</p>
        </div>
      </article>
    );
  }

  if (variant === 'accent') {
    return (
      <article className={`group relative overflow-hidden rounded-xl shadow-card bg-secondary-container h-64 ${colSpan}`}>
        <div className="relative p-8 h-full flex flex-col justify-center items-center text-center text-on-secondary-container">
          <div className="mb-4">{icon}</div>
          <h3 className="text-headline-md font-headline font-semibold mb-2">{data.h3}</h3>
          <p className="text-body-md font-body opacity-90">{data.copy}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={`group relative overflow-hidden rounded-xl shadow-card bg-white ${colSpan}`}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={data.h3}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-headline-md font-headline font-semibold mb-1">{data.h3}</h3>
        <p className="text-body-md font-body opacity-90">{data.copy}</p>
      </div>
    </article>
  );
}

export default function Services() {
  const t = useTranslations('services');

  const getItem = (key: ServiceKey): ServiceItemData =>
    t.raw(`items.${key}`) as ServiceItemData;

  return (
    <section
      id="services"
      className="section-padding container-max"
      aria-labelledby="services-heading"
    >
      <div className="text-center mb-16 space-y-4">
        <h2 id="services-heading" className="text-headline-lg font-headline font-bold text-primary">
          {t('h2')}
        </h2>
        <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Residential — large feature */}
        <ServiceCard
          serviceKey="residential"
          data={getItem('residential')}
          colSpan="md:col-span-2 md:row-span-2 min-h-[32rem]"
        />
        {/* Commercial */}
        <ServiceCard
          serviceKey="commercial"
          data={getItem('commercial')}
          colSpan="md:col-span-2 h-64"
        />
        {/* Construction */}
        <ServiceCard
          serviceKey="construction"
          data={getItem('construction')}
          colSpan="h-64"
        />
        {/* Yard */}
        <ServiceCard
          serviceKey="yard"
          data={getItem('yard')}
          colSpan="h-64"
        />
        {/* Cleanout */}
        <ServiceCard
          serviceKey="cleanout"
          data={getItem('cleanout')}
          colSpan="h-64"
        />
        {/* Furniture — color card */}
        <ServiceCard
          serviceKey="furniture"
          data={getItem('furniture')}
          variant="color"
          colSpan="md:col-span-2 h-64"
        />
        {/* Appliances */}
        <ServiceCard
          serviceKey="appliances"
          data={getItem('appliances')}
          variant="color"
          colSpan="h-64"
        />
        {/* Recycling — accent */}
        <ServiceCard
          serviceKey="recycling"
          data={getItem('recycling')}
          variant="accent"
          colSpan="md:col-span-2 h-64"
        />
      </div>
    </section>
  );
}
