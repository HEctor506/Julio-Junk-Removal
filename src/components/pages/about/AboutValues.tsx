'use client';

import { motion } from 'motion/react';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

const VALUES = [
  {
    title: 'Professionalism First',
    copy: 'Every job is handled with care, punctuality, and respect for your property.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  },
  {
    title: 'Eco-Friendly Commitment',
    copy: 'We donate, recycle, and divert as much as possible from landfills on every job.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  },
  {
    title: 'Transparent Pricing',
    copy: 'No hidden fees. We provide upfront estimates with no obligation to book.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  },
  {
    title: 'Community Driven',
    copy: 'We work with local charities and recycling centers to give back to the community.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

export default function AboutValues() {
  return (
    <>
      {/* Our Values */}
      <section className="py-20 md:py-[120px] bg-surface-container-low">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 space-y-3"
          >
            <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
              What Drives Us
            </span>
            <h2 className="text-headline-lg font-headline font-bold text-primary">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-7 rounded-2xl shadow-card border border-outline-variant/20 flex gap-5 hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-12 h-12 bg-secondary-container/10 rounded-xl flex items-center justify-center text-secondary-container shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary mb-1">{val.title}</h3>
                  <p className="text-body-md font-body text-on-surface-variant">{val.copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <h2 className="text-headline-lg md:text-display-mobile font-headline font-bold text-white relative">
            Ready to Work With Us?
          </h2>
          <p className="text-body-lg text-white/75 relative">
            Get your free estimate today — no pressure, no obligation.
          </p>
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
