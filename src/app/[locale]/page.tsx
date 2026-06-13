import { Suspense } from 'react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import ContactForm from '@/components/sections/ContactForm';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Suspense>
          <Services />
          <WhyChooseUs />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
