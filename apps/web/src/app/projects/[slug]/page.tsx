import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
  const title = `${project.title} - ${project.suburb} ${project.date.month} ${project.date.year} | ${businessName}`;
  const description = project.description;
  const ogSource = project.featuredImage ?? project.imageGallery?.[0];
  const ogImageUrl = ogSource ? urlFor(ogSource).width(1200).height(630).url() : undefined;

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

  const heroImage = project.featuredImage ?? project.imageGallery?.[0];
  const galleryImages = project.imageGallery ?? [];

  return (
    <article>
      {/* Full-bleed hero — image fills viewport height */}
      <section className="relative h-[70vh] md:h-[85vh] min-h-[480px] overflow-hidden bg-jlc-black">
        {heroImage && (
          <Image
            loader={sanityImageLoader}
            src={urlFor(heroImage).width(1800).url()}
            alt={heroImage.alt ?? project.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}

        {/* Gradient: strong at bottom for legibility, subtle at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-jlc-black via-jlc-black/20 to-transparent" />

        {/* Back link — top left */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            All Projects
          </Link>
        </div>

        {/* Project identity — anchored to bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-10 md:pb-14">
          <div className="max-w-7xl mx-auto">
            {/* Location pill */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-white/60" aria-hidden="true" />
              <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
                {project.suburb} &nbsp;·&nbsp; {project.date.month} {project.date.year}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-wide">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Description strip — dark ground, contrasts with white gallery below */}
      <section className="bg-jlc-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-jlc-blue" aria-hidden="true" />
              <span className="font-heading text-jlc-blue text-sm tracking-widest uppercase">Project Overview</span>
            </div>
            {/* Body */}
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Gallery — large images on white, 2-col grid so photos are substantial */}
      {galleryImages.length > 0 && (
        <section className="bg-white py-12 md:py-16" aria-label="Project gallery">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-heading text-2xl md:text-3xl text-jlc-black tracking-wide">Photos</h2>
              <span className="text-gray-400 text-sm font-medium">
                {galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''}
              </span>
            </div>
            <ProjectGalleryClient images={galleryImages} />
          </div>
        </section>
      )}

      {/* Bottom nav — back to projects */}
      <section className="bg-jlc-black py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors font-medium group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jlc-blue rounded"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 group-hover:border-white/60 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </span>
            Back to all projects
          </Link>
        </div>
      </section>
    </article>
  );
}
