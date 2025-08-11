'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { urlFor } from '@/lib/sanity/image';
import { RecentProject } from '@/lib/sanity/schemas';

interface ImageCarouselProps {
  project: RecentProject;
}

export default function ImageCarousel({ project }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (project.imageGallery && currentIndex < project.imageGallery.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (project.imageGallery) {
      setCurrentIndex(0); // Loop back to first image
    }
  }, [project.imageGallery, currentIndex]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (project.imageGallery) {
      setCurrentIndex(project.imageGallery.length - 1); // Loop to last image
    }
  }, [currentIndex, project.imageGallery]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (!project.imageGallery || project.imageGallery.length === 0) {
    return null;
  }

  const currentImage = project.imageGallery[currentIndex];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Project Info Header */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-xl text-jlc-black mb-1">{project.suburb}</h3>
            <p className="text-jlc-blue text-sm font-medium">
              {project.date.month} {project.date.year}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {currentIndex + 1} / {project.imageGallery.length}
          </div>
        </div>
      </div>

      {/* Carousel - Following Flowbite Structure */}
      <div className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-64 overflow-hidden md:h-80 lg:h-96">
          {/* Carousel Items */}
          {project.imageGallery.map((image, index) => (
            <div
              key={index}
              className={`${index === currentIndex ? 'block' : 'hidden'} duration-700 ease-in-out absolute inset-0`}
              data-carousel-item={index === currentIndex ? 'active' : ''}
            >
              <Image
                src={urlFor(image).width(1200).url()}
                alt={image.alt || `${project.suburb} project image ${index + 1}`}
                fill
                className="object-contain"
                quality={90}
                priority={index === currentIndex}
              />
            </div>
          ))}

          {/* Image Caption Overlay */}
          {currentImage.caption && (
            <div className="absolute bottom-4 left-4 z-10 max-w-xs">
              <div className="bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">{currentImage.caption}</p>
              </div>
            </div>
          )}
        </div>

        {/* Slider indicators */}
        {project.imageGallery.length > 1 && (
          <div className="absolute z-30 flex bottom-4 right-4 space-x-2">
            {project.imageGallery.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                data-carousel-slide-to={index}
              />
            ))}
          </div>
        )}

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={goToPrevious}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={goToNext}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* Description */}
      {project.description && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-700 text-sm">{project.description}</p>
        </div>
      )}
    </div>
  );
}
