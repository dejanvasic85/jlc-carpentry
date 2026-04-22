import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug, getProjectSlugs, getSiteSettingsData } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import ProjectGalleryClient from '@/components/ProjectGalleryClient';

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((item) => ({ slug: item.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [siteSettings, project] = await Promise.all([getSiteSettingsData(), getProjectBySlug(slug)]);

  if (!project) return notFound();

  const businessName = siteSettings.company.name;
  const title = `${project.title} | ${businessName}`;
  const description = project.description;
  const firstImage = project.imageGallery?.[0];
  const ogImageUrl = firstImage ? urlFor(firstImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_AU',
      siteName: businessName,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return notFound();

  const heroImage = project.imageGallery?.[0];

  return (
    <article className="pb-20">
      {/* Hero */}
      <section className="relative py-32 md:py-44 text-white overflow-hidden">
        {heroImage && (
          <Image
            loader={sanityImageLoader}
            src={urlFor(heroImage).url()}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-jlc-black/70 via-jlc-blue-dark/60 to-jlc-blue/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4 leading-tight drop-shadow-lg">{project.title}</h1>
          <p className="text-jlc-blue-light text-lg font-medium drop-shadow-md">
            {project.suburb} &middot; {project.date.month} {project.date.year}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-gray-700 leading-relaxed">{project.description}</p>
        </div>
      </section>

      {/* Gallery */}
      {project.imageGallery && project.imageGallery.length > 0 && (
        <section className="py-8" aria-label="Project gallery">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-2xl md:text-3xl text-jlc-black mb-8">Gallery</h2>
            <ProjectGalleryClient images={project.imageGallery} />
          </div>
        </section>
      )}
    </article>
  );
}
