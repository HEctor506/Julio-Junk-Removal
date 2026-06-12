import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const city = `${siteConfig.city}, ${siteConfig.state}`;

  return {
    title: {
      default: t('titleDefault'),
      template: `%s | Julio Junk Removal`,
    },
    description: t('description', { city }),
    keywords: [
      `junk removal ${siteConfig.city}`,
      'junk removal near me',
      `same day junk removal ${siteConfig.city}`,
      `affordable junk removal ${siteConfig.state}`,
      'furniture removal',
      'appliance removal',
      'estate cleanout',
      'construction debris removal',
    ],
    authors: [{ name: 'Julio Junk Removal' }],
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      siteName: 'Julio Junk Removal',
      title: `Julio Junk Removal — ${city}'s #1 Rated Service`,
      description: t('description', { city }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Julio Junk Removal — ${city}`,
      description: t('description', { city }),
    },
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        en: '/',
        es: '/es',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Julio Junk Removal',
    description: `Fast & affordable junk removal in ${siteConfig.city}, ${siteConfig.state}.`,
    telephone: siteConfig.phone,
    url: 'https://juliojunkremoval.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: 'US',
    },
    openingHours: 'Mo-Su 07:00-19:00',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '240',
    },
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
