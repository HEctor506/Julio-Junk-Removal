export const siteConfig = {
  phone: process.env.NEXT_PUBLIC_PHONE ?? '(555) 012-3456',
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? 'tel:+15550123456',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '15551234567',
  city: process.env.NEXT_PUBLIC_CITY ?? 'Your City',
  state: process.env.NEXT_PUBLIC_STATE ?? 'State',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'info@juliojunkremoval.com',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? '#',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? '#',
  googleReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS ?? '#',
};
