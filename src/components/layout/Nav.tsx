'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/lib/config';

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const altLocale = locale === 'en' ? 'es' : 'en';
  const altHref = locale === 'en' ? '/es' : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('home'), href: '#home' },
    { label: t('services'), href: '#services' },
    { label: t('pricing'), href: '#pricing' },
    { label: t('about'), href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-card h-16'
          : 'bg-surface/95 backdrop-blur-md h-16'
      }`}
    >
      <div className="flex justify-between items-center h-full px-4 md:px-10 max-w-container mx-auto">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2" aria-label="Julio Junk Removal - Home">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
          <span className="text-headline-md font-headline font-bold text-primary tracking-tight">
            {t('brand')}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-secondary font-label font-semibold text-label-bold tracking-widest uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={altHref}
            className="text-label-bold font-label font-semibold text-on-surface-variant hover:text-primary transition-colors px-3 py-1 rounded border border-outline-variant"
            aria-label={`Switch to ${altLocale.toUpperCase()}`}
          >
            {t('langSwitch')}
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-full font-label font-semibold text-label-bold tracking-widest active:scale-95 transition-all duration-150"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={altHref}
            className="text-label-bold font-label font-semibold text-on-surface-variant border border-outline-variant px-2 py-1 rounded"
          >
            {t('langSwitch')}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-primary"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-surface border-t border-outline-variant px-4 py-4 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-on-surface font-label font-semibold text-label-bold tracking-widest uppercase py-2 border-b border-outline-variant/30"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="btn-primary text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            {t('cta')}
          </a>
        </nav>
      )}
    </header>
  );
}
