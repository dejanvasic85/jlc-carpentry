import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import About from '@/components/About';
import GoogleReviews from '@/components/GoogleReviews';
import Contact from '@/components/Contact';
import {
  getHomepageData,
  getSiteSettingsData,
  getServicesData,
  getHeroData,
  getStatisticsData,
  getAboutFeaturesData,
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
  const [homepage, services, heroData, statsData, aboutFeatures, siteSettings] = await Promise.all([
    getHomepageData(),
    getServicesData(),
    getHeroData(),
    getStatisticsData(),
    getAboutFeaturesData(),
    getSiteSettingsData(),
  ]);

  return (
    <>
      {homepage.hero && heroData?.content && (
        <HeroSection
          title={heroData.content.title}
          subtitle={heroData.content.subtitle}
          description={heroData.content.description}
          primaryButton={heroData.buttons.primaryButton}
          secondaryButton={heroData.buttons.secondaryButton}
          stats={statsData}
          showStats={heroData.stats}
          heroImage={heroData.heroImage}
        />
      )}
      {homepage.servicesSection && (
        <ServicesSection
          title={homepage.servicesSection.title}
          description={homepage.servicesSection.description}
          services={services}
        />
      )}
      <About features={aboutFeatures} />
      <GoogleReviews />
      <Contact siteSettings={siteSettings} />
    </>
  );
}
