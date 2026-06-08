'use client';

import { motion } from 'motion/react';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

export default function ServicesHero() {
  return (
    <section
      className="relative min-h-[55vh] flex items-center pt-20 pb-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #00355f 0%, #0f4c81 100%)' }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(253,118,26,0.08) 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
      <div className="max-w-container mx-auto px-4 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl space-y-6"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-semibold tracking-widest">
            WHAT WE DO
          </span>
          <h1 className="text-display-mobile md:text-display-lg font-display font-bold text-white leading-tight">
            Comprehensive <span className="text-secondary-container">Removal Services</span>
          </h1>
          <p className="text-body-lg text-white/80 max-w-2xl">
            From a single item to a full property cleanout — we handle it all professionally, efficiently, and with a smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/contact" className="btn-shimmer text-on-secondary-container px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95">
              Get Free Estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href={siteConfig.phoneHref} className="bg-white/15 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/25 transition-all flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28l1.5 4.5-2.3 1.1a11 11 0 005.5 5.5l1.1-2.3 4.5 1.5V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" /></svg>
              {siteConfig.phone}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
