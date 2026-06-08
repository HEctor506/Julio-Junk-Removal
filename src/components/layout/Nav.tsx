'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { siteConfig } from '@/lib/config';
import type { Locale } from '@/navigation';
import { Link } from '@/navigation';

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevScrollY = useRef(0);

  const altLocale: Locale = locale === 'en' ? 'es' : 'en';

  const switchLocale = () => {
    router.replace(pathname, { locale: altLocale, scroll: false });
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 100) {
        setVisible(true);
      } else {
        setVisible(y < prevScrollY.current);
      }
      prevScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('pricing'), href: '/#pricing' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <motion.header
      animate={{ y: visible ? 0 : -90 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-10 max-w-container mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Julio Junk Removal — Home"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          <span
            className={`text-headline-md font-headline font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
          >
            {t('brand')}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label font-semibold text-label-bold tracking-widest uppercase transition-colors duration-200 hover:text-secondary-container ${
                scrolled ? 'text-on-surface-variant' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={switchLocale}
            className={`text-label-bold font-label font-semibold transition-colors px-3 py-1 rounded border ${
              scrolled
                ? 'text-on-surface-variant border-outline-variant hover:text-primary'
                : 'text-white border-white/40 hover:border-white'
            }`}
            aria-label={`Switch to ${altLocale.toUpperCase()}`}
          >
            {t('langSwitch')}
          </button>
          <Link
            href={siteConfig.phoneHref}
            className="btn-shimmer text-on-secondary-container px-5 py-2.5 rounded-full font-label font-semibold text-label-bold tracking-widest active:scale-95 transition-transform duration-150"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={switchLocale}
            className={`text-label-bold font-label font-semibold border px-2 py-1 rounded transition-colors ${
              scrolled
                ? 'text-on-surface-variant border-outline-variant'
                : 'text-white border-white/40'
            }`}
            aria-label={`Switch to ${altLocale.toUpperCase()}`}
          >
            {t('langSwitch')}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}
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
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-outline-variant/30 px-4 overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-on-surface font-label font-semibold text-label-bold tracking-widest uppercase py-3 px-2 border-b border-outline-variant/20 hover:text-secondary-container transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={siteConfig.phoneHref}
                className="btn-shimmer text-on-secondary-container text-center mt-3 py-3 rounded-xl font-label font-semibold text-label-bold tracking-widest active:scale-95"
                onClick={() => setMenuOpen(false)}
              >
                {t('cta')}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
