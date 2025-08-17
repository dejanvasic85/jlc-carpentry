import Image from 'next/image';
import { Metadata } from 'next';
import { getSiteSettingsData, getServicePageData, getServiceSlugs } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { portableTextComponents } from '@/components/PortableText';
import ProjectGallery from '@/components/ProjectGallery';

// Configure revalidation
export const revalidate = false; // Use tag-based revalidation
export const dynamic = 'force-static';

// Generate static params for all service pages
export async function generateStaticParams() {
  const services = await getServiceSlugs();
  
  return services.map((service) => ({
    serviceName: service.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ serviceName: string }> }): Promise<Metadata> {
  const { serviceName } = await params;
  const [siteSettings, serviceData] = await Promise.all([getSiteSettingsData(), getServicePageData(serviceName)]);

  if (!serviceData) {
    return notFound();
  }

  const businessName = siteSettings.company.name;
  const title = `${serviceData.seo?.metaTitle || serviceData.title} | ${businessName}`;
  const description =
    serviceData.seo?.metaDescription || `Professional ${serviceData.title.toLowerCase()} services in Melbourne.`;

  return {
    title,
    description,
    keywords: serviceData.seo?.keywords?.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_AU',
      siteName: businessName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ serviceName: string }> }) {
  const { serviceName } = await params;

  const serviceData = await getServicePageData(serviceName);

  if (!serviceData) {
    return notFound();
  }

  return (
    <article className="pb-20">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 text-white overflow-hidden">
        {/* Background Image */}
        {serviceData.heroImage && (
          <Image
            src={urlFor(serviceData.heroImage).width(1920).url()}
            alt={`${serviceData.title} background`}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-jlc-black/70 via-jlc-blue-dark/60 to-jlc-blue/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight drop-shadow-lg">{serviceData.title}</h1>
          {serviceData.subtitle && (
            <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto drop-shadow-md">
              {serviceData.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {serviceData.mainContent && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={serviceData.mainContent} components={portableTextComponents} />
            </div>
          )}
        </div>
      </section>

      {/* Quote Section */}
      {serviceData.testimonial && (
        <section className="py-16 bg-jlc-blue-light/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="text-2xl md:text-3xl font-light text-jlc-black mb-6 italic">
              &quot;{serviceData.testimonial.quote}&quot;
            </blockquote>
            <cite className="text-lg text-gray-600 font-semibold">— {serviceData.testimonial.author}</cite>
          </div>
        </section>
      )}

      {/* Recent Projects Gallery */}
      {serviceData.recentProjects && serviceData.recentProjects.length > 0 && (
        <ProjectGallery projects={serviceData.recentProjects} serviceTitle={serviceData.title} />
      )}
    </article>
  );
}
