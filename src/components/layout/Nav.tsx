'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { siteConfig } from '@/lib/config';
import type { Locale } from '@/navigation';
import { Link } from '@/navigation';
import Image from 'next/image';
import Banner from './Banner';

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

  const leftLinks = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('pricing'), href: '/#pricing' },
  ];

  const rightLinks = [
    { label: t('reviews'), href: '/#testimonials' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const isLinkActive = (href: string) => {
    if (href.includes('#')) return false;
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const linkClass = (href: string) =>
    `font-headline font-bold text-[20px]  tracking-widest uppercase transition-colors duration-200 pb-0.5 border-b-2 ${
      isLinkActive(href)
        ? 'text-secondary-container border-secondary-container'
        : 'text-white/85 hover:text-secondary-container border-transparent'
    }`;

  return (
    <motion.header
      animate={{ y: visible ? 0 : -160 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 bg-primary transition-shadow duration-300 ${
        scrolled ? 'shadow-xl' : ''
      }`}
    >
      {/* Desktop: compact centered layout — links | logo | links */}
      <div className="hidden md:flex items-center justify-center h-[100px] px-10 gap-8">
        {/* Left links */}
        <nav className="flex items-center gap-7" aria-label="Main navigation left">
          {leftLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center: Logo */}
        <Link href="/" aria-label="Julio Junk Removal — Home" className="shrink-0 mx-2">
          <Image
            src="/images/logo-dark.png"
            alt="Julio Junk Removal"
            width={140}
            height={54}
            className="h-[190px] w-auto brightness-0 invert"
            priority
          />
        </Link>

        {/* Right links */}
        <nav className="flex items-center gap-7" aria-label="Main navigation right">
          {rightLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lang switch — fuera del grupo central */}
        <button
          type="button"
          onClick={switchLocale}
          className="ml-4 text-label-bold font-label font-semibold transition-colors px-2 py-1 rounded border text-white/60 border-white/20 hover:text-secondary-container hover:border-secondary-container/40"
          aria-label={`Switch to ${altLocale.toUpperCase()}`}
        >
          {t('langSwitch')}
        </button>
      </div>

      {/* Mobile: logo left, lang + hamburger right */}
      <div className="flex md:hidden justify-between items-center h-16 px-4">
        <Link href="/" aria-label="Julio Junk Removal — Home">
          <Image
            src="/images/logo-dark.png"
            alt="Julio Junk Removal"
            width={120}
            height={38}
            className="h-9 w-auto brightness-0 invert"
            priority
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={switchLocale}
            className="text-label-bold font-label font-semibold border px-2 py-1 rounded transition-colors text-white/80 border-white/30 hover:text-secondary-container"
            aria-label={`Switch to ${altLocale.toUpperCase()}`}
          >
            {t('langSwitch')}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white transition-colors hover:text-secondary-container"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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

      <Banner />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-primary-container border-t border-white/10 px-4 overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="py-4 flex flex-col gap-1">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-headline font-bold text-label-bold tracking-widest uppercase py-3 px-2 border-b border-white/10 transition-colors ${
                    isLinkActive(link.href) ? 'text-secondary-container' : 'text-white/85 hover:text-secondary-container'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={siteConfig.phoneHref}
                className="btn-shimmer text-center mt-3 py-3 active:scale-95"
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
