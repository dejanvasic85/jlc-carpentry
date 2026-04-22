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

  if (images.length === 0) return null;

  const [first, ...rest] = images;

  return (
    <>
      <div className="space-y-3">
        {/* Feature image — full width, tall */}
        <button
          onClick={() => handleOpen(0)}
          aria-label={`Open photo 1: ${first.alt}`}
          className="block w-full relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2"
        >
          <Image
            loader={sanityImageLoader}
            src={urlFor(first).width(1800).url()}
            alt={first.alt}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              Expand
            </span>
          </div>
        </button>

        {/* Remaining images — 2-col grid, large enough to appreciate */}
        {rest.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="More project photos">
            {rest.map((image, i) => {
              const index = i + 1;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleOpen(index)}
                    aria-label={`Open photo ${index + 1}: ${image.alt}`}
                    className="block w-full relative aspect-[4/3] overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2"
                  >
                    <Image
                      loader={sanityImageLoader}
                      src={urlFor(image).width(900).url()}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 rounded-xl" />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm">{image.caption}</p>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {lightboxIndex !== null && (
        <ProjectImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
