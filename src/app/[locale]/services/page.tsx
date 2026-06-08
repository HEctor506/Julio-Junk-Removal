import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ServicesHero from '@/components/pages/services/ServicesHero';
import ServiceCategories from '@/components/pages/services/ServiceCategories';

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <ServiceCategories />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
