import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteSettingsData, getServicePageData, getServiceSlugs } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { portableTextComponents } from '@/components/PortableText';
import ReviewTestimonial from '@/components/ReviewTestimonial';
import { getServiceReview } from '@/lib/reviewDistribution';
import ProjectCard from '@/components/ProjectCard';

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
            loader={sanityImageLoader}
            src={urlFor(serviceData.heroImage).url()}
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

      {/* Recent Projects */}
      {serviceData.recentProjects &&
        serviceData.recentProjects.length > 0 &&
        (() => {
          const linkedProjects = serviceData.recentProjects!.filter((p) => p.slug?.current).slice(0, 6);
          if (linkedProjects.length === 0) return null;
          return (
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl mb-4 text-jlc-black">Recent Projects</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our latest {serviceData.title.toLowerCase()} projects across Melbourne
                  </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Recent projects">
                  {linkedProjects.map((project) => {
                    const summary = {
                      _id: project._id ?? '',
                      title: project.title,
                      slug: { current: project.slug!.current },
                      suburb: project.suburb,
                      date: project.date,
                      description: project.description,
                      imageGallery: project.imageGallery?.[0] ?? null,
                    };
                    return (
                      <li key={project._id}>
                        <ProjectCard project={summary} />
                      </li>
                    );
                  })}
                </ul>
                <div className="text-center mt-10">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-jlc-blue font-medium hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue rounded"
                  >
                    View all projects
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}

      {/* Customer Review Section */}
      {review && <ReviewTestimonial review={review} />}
    </article>
  );
}
