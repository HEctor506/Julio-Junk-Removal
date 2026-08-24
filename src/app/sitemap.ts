import type { MetadataRoute } from 'next';

const baseUrl = 'https://juliojunkremoval.com';

// Rutas públicas del sitio. '' es el home. Cada una existe en en (/) y es (/es).
const paths = ['', '/about', '/services', '/contact'] as const;

// Genera /sitemap.xml nativo. Antes no existía y /sitemap.xml devolvía HTML.
// Incluye alternates hreflang para que Google entienda la relación en <-> es.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.map((path) => {
    // Inglés vive sin prefijo (localePrefix: 'as-needed'); español bajo /es.
    const enUrl = `${baseUrl}${path}`;
    const esUrl = `${baseUrl}/es${path}`;

    return {
      url: enUrl,
      lastModified,
      changeFrequency: 'monthly',
      // El home es la página más importante para conversión → prioridad máxima.
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: enUrl,
          es: esUrl,
        },
      },
    };
  });
}
