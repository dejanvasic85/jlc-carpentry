import Image from 'next/image';
import { Metadata } from 'next';
import { getSiteSettingsData, getServicePageData, getServiceSlugs } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { portableTextComponents } from '@/components/PortableText';
import ProjectGallery from '@/components/ProjectGallery';
import ReviewTestimonial from '@/components/ReviewTestimonial';
import { getServiceReview } from '@/lib/reviewDistribution';
import { VideoPlayer } from '@/components/VideoPlayer';

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

  // Video structured data
  const videoStructuredData = serviceData.featuredVideo
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: serviceData.featuredVideo.title,
        description: serviceData.featuredVideo.description || description,
        uploadDate: new Date().toISOString(),
        contentUrl: serviceData.featuredVideo.video.asset.url,
        thumbnailUrl: serviceData.featuredVideo.thumbnail
          ? urlFor(serviceData.featuredVideo.thumbnail).width(800).url()
          : undefined,
        duration: serviceData.featuredVideo.duration ? `PT${serviceData.featuredVideo.duration}S` : undefined,
        transcript: serviceData.featuredVideo.transcript || undefined,
      }
    : undefined;

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
      videos: serviceData.featuredVideo
        ? [
            {
              url: serviceData.featuredVideo.video.asset.url,
              type: serviceData.featuredVideo.video.asset.mimeType,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: videoStructuredData
      ? {
          'application/ld+json': JSON.stringify(videoStructuredData),
        }
      : undefined,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ serviceName: string }> }) {
  const { serviceName } = await params;

  const serviceData = await getServicePageData(serviceName);

  if (!serviceData) {
    return notFound();
  }

  // Get the assigned review for this service
  const review = getServiceReview(serviceName);
  console.log('🎯 Service page review assignment:', { serviceName, hasReview: !!review });

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
      {serviceData.mainContent && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-lg max-w-none">
              <PortableText value={serviceData.mainContent} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}

      {/* Featured Video Section */}
      {serviceData.featuredVideo && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-jlc-black mb-8 text-center">
                {serviceData.featuredVideo.title || 'Featured Video'}
              </h2>
              <VideoPlayer
                src={serviceData.featuredVideo.video.asset.url}
                title={serviceData.featuredVideo.title}
                description={serviceData.featuredVideo.description || undefined}
                transcript={serviceData.featuredVideo.transcript || undefined}
                poster={
                  serviceData.featuredVideo.thumbnail
                    ? urlFor(serviceData.featuredVideo.thumbnail).width(800).url()
                    : undefined
                }
                aspectRatio={16 / 9}
                className="shadow-lg"
                serviceName={serviceName}
              />
            </div>
          </div>
        </section>
      )}

      {/* Recent Projects Gallery */}
      {serviceData.recentProjects && serviceData.recentProjects.length > 0 && (
        <ProjectGallery projects={serviceData.recentProjects} serviceTitle={serviceData.title} />
      )}

      {/* Customer Review Section */}
      {review && <ReviewTestimonial review={review} />}
    </article>
  );
}
