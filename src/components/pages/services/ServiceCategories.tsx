'use client';

import { motion } from 'motion/react';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

const SERVICES = [
  {
    key: 'residential',
    title: 'Residential Junk Removal',
    copy: 'We remove unwanted items from your home quickly and efficiently — no job too big or too small.',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    items: ['Old furniture', 'Sofas & mattresses', 'Appliances', 'TVs & electronics', 'Garage cleanouts', 'Attic cleanouts', 'Basement cleanouts'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  },
  {
    key: 'commercial',
    title: 'Commercial Junk Removal',
    copy: 'Reliable junk removal for businesses, offices, warehouses, and commercial properties of any size.',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    items: ['Office cleanouts', 'Office furniture removal', 'Warehouse cleanouts', 'Retail store cleanouts', 'Property management cleanouts', 'Inventory disposal'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIRrtk0DcZ01tFUZ_iwm16CVZTV8wk32inRW7vOUH4D4AsUqegTc9RIqUxJy3bRyabkTZCoacS6f3U1FLUyxWap-aSgkuHPE3_dXVJQR0Tq4YF6QC0GR_AA9DkcP5dapkuKJ7qhbK530In7xmJjDaaDg1VIVmQKVW37R38prWK5Pqfg1TLnuNXCx8SyDQEzZCXEW9XSR9IwEkn43oYr6bgah8siitB7U4UbeWBz9x4BokPkQ1ULM-cSd24_NU5v7fnk0dt587z-gA',
  },
  {
    key: 'construction',
    title: 'Construction Debris Removal',
    copy: 'Fast, reliable cleanup for renovation and construction sites. We handle drywall, lumber, tile, and more.',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    items: ['Drywall', 'Wood & lumber', 'Tile & flooring materials', 'Renovation debris', 'Construction waste'],
    img: 'https://www.junkhappens.com/wp-content/uploads/2017/08/Effective-Construction-Debris-Removal.jpg',
  },
  {
    key: 'yard',
    title: 'Yard Waste Removal',
    copy: 'Keep your outdoor spaces clean and clutter-free year-round with professional yard waste removal.',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    items: ['Tree branches', 'Yard debris', 'Leaves & green waste', 'Old fencing', 'Landscaping debris'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuokji2Au9_qcisuAe45bU6_kjpDabtDq5NxSBnO98dVXs4d2OSPNb3U_W9Wc-WLO9e_iZ3mzucJQ3tL1bbjq3Cs8xgvS5Te6sPIAbgJoEo_U0EH2EunfJyQ5ceJIeY0aUMRIGIm-Yosvutenyfra5OeW_LuFPq4HEHdrAxqQw_f9To026bTKOiLb4izemXHTgHC5Xa217IuwQSFEw-cPTU9fEDhUy-hykUS6lMGJ9pLOqdGDgf82a2UlYM15QdIfv3W9vk_tE6oM',
  },
  {
    key: 'cleanout',
    title: 'Cleanout Services',
    copy: 'Complete property cleanout solutions for any situation — estate cleanouts, evictions, foreclosures, and more.',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    items: ['House cleanouts', 'Garage cleanouts', 'Storage unit cleanouts', 'Estate cleanouts', 'Foreclosure cleanouts', 'Eviction cleanouts'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoA89doiH7LveFRl56NlMN_2DO9KhtDoba7cyFrnWANKdVTsyVcLNob3vniN4SVNtwex4CDMkRzifPdpY9VFpIBIfXUqzJI8GTAfLablqCxwwfe3ngr0s_nRfoHz5r0-FcUiPmKRrAW7zCGC443VI6za_3R6QtJFNHfjTIE2M3EAnKwWw70l5NjhOgLz6eElVrF4CoF_NIXi51GFD6GMq5ij3WWMwuejF8fvVvSdLS60L4AA4Q9cKmcIxFkeYJxV-ld6hgWUU7Eqc',
  },
  {
    key: 'furniture',
    title: 'Furniture & Appliance Removal',
    copy: 'We safely remove and responsibly dispose of furniture and appliances of all sizes, including same-day pickup.',
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    items: ['Sofas & sectionals', 'Beds & mattresses', 'Tables & chairs', 'Refrigerators', 'Washing machines', 'Stoves & ovens'],
    img: 'https://byejunk.com/wp-content/uploads/2018/09/junk-furniture-003.jpeg',
  },
  {
    key: 'recycling',
    title: 'Recycling & Donation',
    copy: "We're committed to eco-friendly practices — donating usable items to local charities and recycling as much as possible.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    items: ['Eco-friendly disposal', 'Recycling services', 'Charity donation drop-offs', 'Zero-landfill goal'],
    img: 'https://www.junkhappens.com/wp-content/uploads/2019/01/Junk-Removal.jpg',
  },
];

export default function ServiceCategories() {
  return (
    <>
      {/* Services grid */}
      <section className="py-20 md:py-[120px]" aria-label="All services">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <div className="space-y-16">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-xl ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>

                <div className={`space-y-6 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary-container/10 rounded-xl flex items-center justify-center text-secondary-container">
                      {service.icon}
                    </div>
                    <span className="text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase text-sm">
                      Service {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 className="text-headline-lg font-headline font-bold text-primary">{service.title}</h2>
                  <p className="text-body-lg font-body text-on-surface-variant">{service.copy}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-body-md font-body text-on-surface-variant">
                        <svg className="w-4 h-4 text-secondary-container shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary inline-flex">
                    Book This Service
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-primary py-10" aria-label="Trust indicators">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '2,000+', label: 'Jobs Completed' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: 'Same-Day', label: 'Service Available' },
              { value: 'Licensed', label: '& Insured' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <p className="text-headline-lg font-headline font-bold text-secondary-container">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-primary-container rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-headline-lg md:text-display-mobile font-headline font-bold text-white relative">Ready to Clear Your Space?</h2>
          <p className="text-body-lg text-white/75 relative">Get a free, no-obligation estimate in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <Link href="/contact" className="btn-shimmer text-on-secondary-container px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95">
              Get Free Estimate
            </Link>
            <Link href={siteConfig.phoneHref} className="bg-white/15 border-2 border-white/25 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/25 transition-all flex items-center justify-center gap-2 active:scale-95">
              {siteConfig.phone}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
