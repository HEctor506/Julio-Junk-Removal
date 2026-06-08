export const siteConfig = {
  phone: process.env.NEXT_PUBLIC_PHONE ?? '(555) 012-3456',
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? 'tel:+15550123456',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '15551234567',
  whatsappHref: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? '15551234567'}`,
  city: process.env.NEXT_PUBLIC_CITY ?? 'Your City',
  state: process.env.NEXT_PUBLIC_STATE ?? 'State',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'hello@juliojunk.com',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? '#',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? '#',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK ?? '#',
  googleReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS ?? '#',
  hours: 'Mon – Sat: 7:00 – 19:00',
};
