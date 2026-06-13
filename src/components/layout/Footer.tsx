import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/config';
import { Link } from '@/navigation';

type NavLink = { label: string; href: string };

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h5 className="text-white font-headline font-bold text-sm tracking-widest uppercase">
        {children}
      </h5>
      <div className="mt-2 w-8 h-0.5 bg-secondary-container rounded-full" />
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container hover:brightness-110 transition-all duration-200 hover:scale-110 active:scale-95"
    >
      {children}
    </a>
  );
}

export default async function Footer() {
  const t = await getTranslations('footer');
  const navLinks = t.raw('navLinks') as NavLink[];
  const serviceLinks = t.raw('serviceLinks') as NavLink[];
  const trustBadges = t.raw('trustBadges') as string[];
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#011f1c' }} className="w-full text-white">
      <div className="max-w-container mx-auto px-4 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* ── Col 1: Brand ── */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Julio Junk Removal — Home">
              <Image
                src="/images/Horizontal-02.png"
                alt=""
                width={140}
                height={44}
                className="h-[90px] w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {t('tagline')}
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <SocialIcon href={siteConfig.facebook} label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.instagram} label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.tiktok} label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.74a4.85 4.85 0 01-1.01-.05z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={siteConfig.whatsappHref} label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.133 1.415 4.75 1.416 5.482 0 9.94-4.458 9.944-9.94.002-2.656-1.032-5.153-2.91-7.034-1.878-1.882-4.375-2.915-7.03-2.917-5.483 0-9.942 4.459-9.944 9.941-.001 1.704.436 3.367 1.266 4.837l-1.013 3.7 3.799-.996z" />
                </svg>
              </SocialIcon>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 border border-white/20 text-white/70 text-xs px-3 py-1.5 rounded-full"
                >
                  <svg className="w-3 h-3 text-secondary-container shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Col 2: Links ── */}
          <div>
            <ColTitle>{t('linksTitle')}</ColTitle>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <ColTitle>{t('servicesTitle')}</ColTitle>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact Us ── */}
          <div>
            <ColTitle>{t('contactTitle')}</ColTitle>
            <ul className="space-y-4 mb-5">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-secondary-container shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={siteConfig.phoneHref} className="text-sm text-white/70 hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              {/* WhatsApp */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-secondary-container shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656z" />
                  </svg>
                </div>
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  {siteConfig.phone} (WhatsApp)
                </a>
              </li>
              {/* Email */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-secondary-container shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-white/70 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              {/* Hours */}
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-secondary-container shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-white/70">{siteConfig.hours}</span>
              </li>
            </ul>

            {/* Mini map */}
            <div className="rounded-xl overflow-hidden border border-white/10 h-28">
              <iframe
                src="https://maps.google.com/maps?q=Julio+Junk+removal&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Service area map"
              />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-white/40">
            {t('copyright', { year })}
          </p>
          <p className="text-xs text-white/40">
            {t('certLine')}
          </p>
        </div>
      </div>
    </footer>
  );
}
