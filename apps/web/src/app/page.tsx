import Header from '@/components/Header';
import HeroSectionContainer from '@/components/HeroSectionContainer';
import ServicesSection from '@/components/ServicesSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSectionContainer />
      <ServicesSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
