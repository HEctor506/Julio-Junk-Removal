import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

//Esto significa que el inglés carga en / (sin prefijo) y el español en /es/. 
//Así que cuando alguien entra a tu dominio, ve inglés por defecto — ya está configurado correctamente.
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
