import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ContactHero from '@/components/pages/contact/ContactHero';
import ContactInfo from '@/components/pages/contact/ContactInfo';
import ContactFormFull from '@/components/pages/contact/ContactFormFull';

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactHero />
        <section className="py-20 md:py-[120px]">
          <div className="max-w-container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <ContactInfo />
              <div className="lg:col-span-2">
                <ContactFormFull />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
