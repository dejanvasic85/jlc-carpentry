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
  try {
    const homepage = await sanityFetch({
      query: homepageQuery,
      schema: HomepageSchema,
      tags: ['homepage'],
    });
    return homepage;
  } catch {
    // Return default values if homepage data is not available
    return {
      seo: {
        title: 'JLC Carpentry & Building Services - Professional Building Solutions Melbourne',
        description:
          'Expert carpentry and building services in Melbourne. 25+ years experience in decks, pergolas, walls, doors, cladding, and renovations. Licensed & insured.',
        keywords: ['carpentry', 'building', 'melbourne', 'decks', 'pergolas', 'renovations'],
      },
      hero: true,
    };
  }
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
