'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import ProjectImageLightbox from '@/components/ProjectImageLightbox';

interface GalleryImage {
  asset: { _ref: string };
  alt: string;
  caption?: string | null;
}

interface ProjectGalleryClientProps {
  images: GalleryImage[];
}

export default function ProjectGalleryClient({ images }: ProjectGalleryClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setLightboxIndex(index);
  const handleClose = () => setLightboxIndex(null);
  const handleNavigate = (index: number) => setLightboxIndex(index);

  return (
    <>
      {/* Masonry grid via CSS columns */}
      <ul className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4" aria-label="Project photos">
        {images.map((image, index) => (
          <li key={index} className="break-inside-avoid">
            <button
              onClick={() => handleOpen(index)}
              aria-label={`Open photo ${index + 1}: ${image.alt}`}
              className="block w-full overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2 group"
            >
              <Image
                loader={sanityImageLoader}
                src={urlFor(image).url()}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </button>
          </li>
        ))}
      </ul>

      {lightboxIndex !== null && (
        <ProjectImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
