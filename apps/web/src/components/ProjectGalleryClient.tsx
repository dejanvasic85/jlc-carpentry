'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import ProjectMediaViewer from '@/components/ProjectMediaViewer';
import type { ProjectVideo } from '@/lib/sanity/schemas';

interface GalleryImage {
  asset: { _ref: string };
  alt: string;
  caption?: string | null;
}

interface ProjectGalleryClientProps {
  images: GalleryImage[];
  videos: ProjectVideo[];
}

type GalleryItem =
  | { type: 'image'; data: GalleryImage; imageIndex: number }
  | { type: 'video'; data: ProjectVideo; videoIndex: number };

type MediaViewerItem = { type: 'image'; data: GalleryImage } | { type: 'video'; data: ProjectVideo };

export default function ProjectGalleryClient({ images, videos }: ProjectGalleryClientProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setViewerIndex(index);
  const handleClose = () => setViewerIndex(null);

  if (images.length === 0 && videos.length === 0) return null;

  const [firstImage, ...restImages] = images;
  const mediaItems: MediaViewerItem[] = [
    ...images.map((image) => ({ type: 'image' as const, data: image })),
    ...videos.map((video) => ({ type: 'video' as const, data: video })),
  ];

  const galleryItems: GalleryItem[] = [
    ...restImages.map((image, i) => ({ type: 'image' as const, data: image, imageIndex: i + 1 })),
    ...videos.map((video, i) => ({ type: 'video' as const, data: video, videoIndex: i })),
  ];

  return (
    <>
      <div className="space-y-3">
        {firstImage && (
          <button
            onClick={() => handleOpen(0)}
            aria-label={`Open photo 1: ${firstImage.alt}`}
            className="block w-full relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2"
          >
            <Image
              loader={sanityImageLoader}
              src={urlFor(firstImage).width(1800).url()}
              alt={firstImage.alt}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1.5 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
                Expand
              </span>
            </div>
          </button>
        )}

        {galleryItems.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Project gallery items">
            {galleryItems.map((item, index) => {
              if (item.type === 'image') {
                return (
                  <li key={`image-${item.imageIndex}`}>
                    <button
                      onClick={() => handleOpen(item.imageIndex)}
                      aria-label={`Open photo ${item.imageIndex + 1}: ${item.data.alt}`}
                      className="block w-full relative aspect-[4/3] overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2"
                    >
                      <Image
                        loader={sanityImageLoader}
                        src={urlFor(item.data).width(900).url()}
                        alt={item.data.alt}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 rounded-xl" />
                      {item.data.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm">{item.data.caption}</p>
                        </div>
                      )}
                    </button>
                  </li>
                );
              }

              const posterUrl = item.data.thumbnail
                ? urlFor(item.data.thumbnail).width(900).height(675).url()
                : undefined;
              const videoLabel = item.data.description ?? `Open video: ${item.data.title}`;

              return (
                <li key={`video-${item.videoIndex}-${index}`}>
                  <button
                    onClick={() => handleOpen(images.length + item.videoIndex)}
                    aria-label={videoLabel}
                    className="block w-full relative aspect-[4/3] overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jlc-blue focus-visible:ring-offset-2"
                  >
                    {posterUrl ? (
                      <Image
                        loader={sanityImageLoader}
                        src={posterUrl}
                        alt={item.data.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-jlc-black via-jlc-blue-dark to-jlc-black"
                        aria-hidden="true"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300 rounded-xl" />

                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 text-jlc-black group-hover:scale-110 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-7 h-7 ml-0.5"
                        >
                          <path d="M8 5.14v13.72A1 1 0 0 0 9.54 19.7l10.8-6.86a1 1 0 0 0 0-1.68l-10.8-6.86A1 1 0 0 0 8 5.14Z" />
                        </svg>
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 to-transparent">
                      <p className="text-white text-sm font-medium">{item.data.title}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {viewerIndex !== null && (
        <ProjectMediaViewer items={mediaItems} initialIndex={viewerIndex} onClose={handleClose} />
      )}
    </>
  );
}
