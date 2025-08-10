import Image from 'next/image';
import { Metadata } from 'next';
import { getSiteSettingsData } from '@/lib/sanity/client';
import Card from '@/components/Card';

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  quote: {
    text: string;
    author: string;
  };
  showcase: Array<{
    suburb: string;
    image: string;
    date: string;
    description: string;
  }>;
  heroImage: string;
  metaDescription: string;
}

const serviceData: Record<string, ServiceData> = {
  'kitchen-and-bathroom-renovations': {
    title: 'Kitchen & Bathroom Renovations',
    subtitle: 'Transform Your Home with Expert Kitchen & Bathroom Renovations',
    metaDescription:
      'Professional kitchen and bathroom renovation services in Melbourne. Expert craftsmanship, quality materials, and exceptional results. Contact JLC Carpentry today.',
    description:
      'Transform your home with our comprehensive kitchen and bathroom renovation services. Our expert team combines years of experience with premium materials to create spaces that are both beautiful and functional.',
    heroImage: '/kitchen-hero.jpg',
    features: [
      'Complete kitchen design and installation',
      'Bathroom renovation and tiling',
      'Custom cabinetry and joinery',
      'Plumbing and electrical coordination',
      'Quality fixtures and fittings',
      'Project management from start to finish',
      'Licensed and insured professionals',
      'Free consultation and quotes',
    ],
    quote: {
      text: 'JLC Carpentry transformed our outdated kitchen into a modern masterpiece. Their attention to detail and craftsmanship exceeded our expectations.',
      author: 'Sarah M, Richmond',
    },
    showcase: [
      {
        suburb: 'Richmond',
        image: '/showcase-richmond-kitchen.jpg',
        date: 'March 2024',
        description:
          'Complete kitchen renovation featuring custom timber cabinetry, stone benchtops, and premium appliances. Modern design with classic touches.',
      },
      {
        suburb: 'Alphington',
        image: '/showcase-alphington-bathroom.jpg',
        date: 'February 2024',
        description:
          'Luxury bathroom renovation with floor-to-ceiling tiles, frameless shower screen, and custom vanity. Contemporary styling with excellent functionality.',
      },
      {
        suburb: 'Carlton',
        image: '/showcase-carlton-kitchen.jpg',
        date: 'January 2024',
        description:
          'Heritage home kitchen renovation balancing period features with modern convenience. Custom joinery and carefully selected materials.',
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ serviceName: string }> }): Promise<Metadata> {
  const { serviceName } = await params;
  const siteSettings = await getSiteSettingsData();
  const service = serviceData[serviceName];

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  const businessName = siteSettings.company.name;
  const title = `${service.title} | ${businessName}`;

  return {
    title,
    description: service.metaDescription,
    openGraph: {
      title,
      description: service.metaDescription,
      type: 'website',
      locale: 'en_AU',
      siteName: businessName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ serviceName: string }> }) {
  const { serviceName } = await params;
  const service = serviceData[serviceName];

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-4xl font-heading mb-4">Service Not Found</h1>
        <p className="text-gray-600">The requested service could not be found.</p>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Business Logo 2.jpg"
          alt={`${service.title} background`}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-jlc-black/70 via-jlc-blue-dark/60 to-jlc-blue/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight drop-shadow-lg">{service.title}</h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto drop-shadow-md">{service.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl mb-6 text-jlc-black">Expert Renovation Services</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">{service.description}</p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              At JLC Carpentry, we understand that your kitchen and bathroom are the heart of your home. Our
              comprehensive renovation approach ensures every detail is carefully planned and expertly executed,
              delivering results that enhance both the value and enjoyment of your property.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading text-xl mb-6 text-jlc-black text-center">Our Services Include:</h3>
            <ul className="space-y-4" role="list">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-jlc-blue rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-jlc-blue-light/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-jlc-black mb-6 italic">
            "{service.quote.text}"
          </blockquote>
          <cite className="text-lg text-gray-600 font-semibold">— {service.quote.author}</cite>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl mb-4 text-jlc-black">Recent Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See some of our latest kitchen and bathroom renovations across Melbourne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.showcase.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48 mb-4">
                  <Image
                    src="/Business Logo 2.jpg"
                    alt={`${service.title} project in ${project.suburb}`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl mb-2 text-jlc-black">{project.suburb}</h3>
                  <p className="text-sm text-jlc-blue font-semibold mb-3">{project.date}</p>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
