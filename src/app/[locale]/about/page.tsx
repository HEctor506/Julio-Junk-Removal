import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import AboutHero from '@/components/pages/about/AboutHero';
import AboutStory from '@/components/pages/about/AboutStory';
import AboutValues from '@/components/pages/about/AboutValues';
import AboutVideo from '@/components/pages/about/AboutVideo';
import AboutMap from '@/components/pages/about/AboutMap';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutVideo />
        <AboutMap />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
