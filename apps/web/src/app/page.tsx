import Header from '@/components/Header';
import HeroSectionContainer from '@/components/HeroSectionContainer';
import ServicesSection from '@/components/ServicesSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { sanityFetch, homepageQuery } from '@/lib/sanity/queries';
import { HomepageSchema } from '@/lib/sanity/schemas';
import { Metadata } from 'next';

async function getHomepageData() {
  return await sanityFetch({
    query: homepageQuery,
    schema: HomepageSchema,
    tags: ['homepage'],
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageData();

  return {
    title: homepage.seo.title,
    description: homepage.seo.description,
    keywords: homepage.seo.keywords?.join(', '),
    openGraph: {
      title: homepage.seo.title,
      description: homepage.seo.description,
      type: 'website',
      locale: 'en_AU',
      siteName: 'JLC Carpentry & Building Services',
    },
    twitter: {
      card: 'summary_large_image',
      title: homepage.seo.title,
      description: homepage.seo.description,
    },
  };
}

export default async function Home() {
  const homepage = await getHomepageData();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {homepage.hero && <HeroSectionContainer />}
      <ServicesSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
