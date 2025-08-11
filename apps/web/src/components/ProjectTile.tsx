import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { RecentProject } from '@/lib/sanity/schemas';

interface ProjectTileProps {
  project: RecentProject;
  onClick: () => void;
}

export default function ProjectTile({ project, onClick }: ProjectTileProps) {
  const primaryImage = project.imageGallery?.[0];

  if (!primaryImage) {
    return null;
  }

  return (
    <div
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      {/* Main Image */}
      <Image
        src={urlFor(primaryImage).width(600).height(450).url()}
        alt={primaryImage.alt || `${project.title || project.suburb} project`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Project Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-heading text-xl mb-1">{project.suburb}</h3>
        <p className="text-jlc-blue-light text-sm font-medium mb-2">
          {project.date.month} {project.date.year}
        </p>
        <p className="text-sm opacity-90 line-clamp-2">{project.description}</p>
      </div>

      {/* Image Count Badge */}
      {project.imageGallery.length > 1 && (
        <div
          className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
          aria-hidden="true"
        >
          {project.imageGallery.length} photos
        </div>
      )}

      {/* View Gallery Hint */}
      <div
        className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div className="flex items-center space-x-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span>View Gallery</span>
        </div>
      </div>
    </div>
  );
}
