'use client';

import { motion } from 'motion/react';

const STATS = [
  { value: '2,000+', label: 'Jobs Completed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '7 Days', label: 'We Operate' },
];

export default function AboutStory() {
  return (
    <>
      {/* Our Story */}
      <section className="py-20 md:py-[120px]">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS4uZmT2sVo6Ld7BQN_jYSzx_rXHWaMih0vTxjEYNZQYkS2Sw3lROGpr75bIzP3-dGbfrGeL4TZk6jAEsmRUK9hNw7bSthnEibW-ojJrWDbe1J2m6V7FvUl4-C8rJuYJ-Du4QwE-ubZ-xCobcycXvVjd71YMOn6gOwwLjHLl4a7TQx8uKNKa69a3OQj_ewZSjIQjyO9xCZLeG4FI5hKXWFMyRUd-mPFzABU8Dc1a_IIdhNRm1oMEtAoUEwasTDdsXTyIsY_8ZJrnw"
                alt="Julio Junk Removal team"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-8 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-outline-variant/20"
              >
                <p className="text-headline-md font-headline font-bold text-secondary-container">Licensed</p>
                <p className="text-sm text-on-surface-variant">& Fully Insured</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <span className="inline-block text-secondary-container font-label font-semibold text-label-bold tracking-widest uppercase">
                Who We Are
              </span>
              <h2 className="text-headline-lg font-headline font-bold text-primary">
                Premium Junk Removal You Can Trust
              </h2>
              <p className="text-body-lg font-body text-on-surface-variant">
                Julio Junk Removal was founded with a simple mission: make decluttering effortless for homeowners and businesses alike. What started as a one-truck operation has grown into a trusted local service with hundreds of satisfied clients.
              </p>
              <p className="text-body-lg font-body text-on-surface-variant">
                We believe junk removal shouldn&apos;t be stressful. From the moment you call to the moment we sweep up after ourselves, our team delivers a premium, worry-free experience every single time.
              </p>
              <ul className="space-y-3">
                {['Fully licensed and insured', 'Same-day service available', 'Eco-friendly disposal practices', '7 days a week operation'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-md font-body text-on-surface">
                    <svg className="w-5 h-5 text-secondary-container shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16" aria-label="Company statistics">
        <div className="max-w-container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-headline-lg md:text-display-mobile font-headline font-bold text-secondary-container">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
