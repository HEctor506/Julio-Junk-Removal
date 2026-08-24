import type { MetadataRoute } from 'next';

// URL base del sitio en producción; se usa para construir la ruta absoluta del sitemap.
const baseUrl = 'https://juliojunkremoval.com';

// Genera /robots.txt nativo de Next. Antes /robots.txt caía en el catch-all [locale]
// y devolvía HTML (<html lang="robots.txt">), lo que impedía a Google leer las reglas.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Rutas internas de API sin valor de indexación.
      disallow: '/api/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
