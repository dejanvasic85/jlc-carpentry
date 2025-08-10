import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {
  getHomepageData,
  getSiteSettingsData,
  getServicesData,
  getHeroData,
  getStatisticsData,
} from '@/lib/sanity/client';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const [homepage, siteSettings] = await Promise.all([getHomepageData(), getSiteSettingsData()]);

  const businessName = siteSettings.company.name;
  const pageTitle = `${businessName} - ${homepage.seo.title}`;

  return {
    title: pageTitle,
    description: homepage.seo.description,
    keywords: homepage.seo.keywords?.join(', '),
    openGraph: {
      title: pageTitle,
      description: homepage.seo.description,
      type: 'website',
      locale: 'en_AU',
      siteName: businessName,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: homepage.seo.description,
    },
  };
}

export default async function Home() {
  const [homepage, services, siteSettings, heroData, statsData] = await Promise.all([
    getHomepageData(),
    getServicesData(),
    getSiteSettingsData(),
    getHeroData(),
    getStatisticsData(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {homepage.hero && heroData?.content && (
        <HeroSection
          title={heroData.content.title}
          subtitle={heroData.content.subtitle}
          description={heroData.content.description}
          primaryButton={heroData.buttons.primaryButton}
          secondaryButton={heroData.buttons.secondaryButton}
          stats={statsData}
          showStats={heroData.stats}
        />
      )}
      {homepage.servicesSection && (
        <ServicesSection
          title={homepage.servicesSection.title}
          description={homepage.servicesSection.description}
          services={services}
        />
      )}
      <About />
      <Contact />
      {siteSettings && <Footer siteSettings={siteSettings} />}
    </div>
  );
}
