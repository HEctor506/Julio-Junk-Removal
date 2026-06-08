import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import AboutHero from '@/components/pages/about/AboutHero';
import AboutStory from '@/components/pages/about/AboutStory';
import AboutValues from '@/components/pages/about/AboutValues';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
