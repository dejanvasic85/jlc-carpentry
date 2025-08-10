import Header from '@/components/Header';
import HeroSectionContainer from '@/components/HeroSectionContainer';
import ServicesSection from '@/components/ServicesSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { sanityFetch, homepageQuery, siteSettingsQuery, servicesQuery } from '@/lib/sanity/queries';
import { HomepageSchema, SiteSettingsSchema, ServiceSchema } from '@/lib/sanity/schemas';
import { z } from 'zod';
import { Metadata } from 'next';

async function getHomepageData() {
  return await sanityFetch({
    query: homepageQuery,
    schema: HomepageSchema,
    tags: ['homepage'],
  });
}

async function getSiteSettingsData() {
  return await sanityFetch({
    query: siteSettingsQuery,
    schema: SiteSettingsSchema,
    tags: ['siteSettings'],
  });
}

async function getServicesData() {
  return await sanityFetch({
    query: servicesQuery,
    schema: z.array(ServiceSchema),
    tags: ['service'],
  });
}

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
  const [homepage, services, siteSettings] = await Promise.all([
    getHomepageData(), 
    getServicesData(), 
    getSiteSettingsData()
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {homepage.hero && <HeroSectionContainer />}
      <ServicesSection 
        title={homepage.servicesSection?.title} 
        description={homepage.servicesSection?.description}
        services={services}
      />
      <About />
      <Contact />
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
