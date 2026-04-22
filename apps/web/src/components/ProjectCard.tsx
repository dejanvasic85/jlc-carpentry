import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import { ProjectSummary } from '@/lib/sanity/schemas';

interface ProjectCardProps {
  project: ProjectSummary;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const image = project.featuredImage ?? project.imageGallery;

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2"
      aria-label={`View ${project.title} project in ${project.suburb}`}
    >
      {image ? (
        <Image
          loader={sanityImageLoader}
          src={urlFor(image).url()}
          alt={image.alt ?? project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-heading text-lg leading-tight mb-0.5">{project.title}</h3>
        <p className="text-jlc-blue-light text-sm font-medium">
          {project.suburb} &middot; {project.date.month} {project.date.year}
        </p>
      </div>
    </Link>
  );
}
