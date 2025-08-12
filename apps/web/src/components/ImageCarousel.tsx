'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { urlFor } from '@/lib/sanity/image';
import { RecentProject } from '@/lib/sanity/schemas';

interface ImageCarouselProps {
  project: RecentProject;
}

export default function ImageCarousel({ project }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning || !project.imageGallery || currentIndex >= project.imageGallery.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => setIsTransitioning(false), 500); // Match transition duration
  }, [project.imageGallery, currentIndex, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 500); // Match transition duration
  }, [currentIndex, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentIndex, isTransitioning],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (event.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            event.preventDefault();
            goToPrevious();
          }
          break;
        case 'ArrowRight':
          if (project.imageGallery && currentIndex < project.imageGallery.length - 1) {
            event.preventDefault();
            goToNext();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, isTransitioning, currentIndex, project.imageGallery]);

  if (!project.imageGallery || project.imageGallery.length === 0) {
    return null;
  }

  const currentImage = project.imageGallery[currentIndex];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Project Info Header */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-xl text-jlc-black mb-1">{project.suburb}</h3>
            <p className="text-jlc-blue font-medium">
              {project.date.month} {project.date.year}
            </p>
          </div>
          <div className="text-gray-500">
            {currentIndex + 1} / {project.imageGallery.length}
          </div>
        </div>
      </div>

      {/* Carousel with Sliding Animation */}
      <div className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-80 overflow-hidden md:h-[500px] lg:h-[600px] xl:h-[700px]">
          {/* Sliding Container */}
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              willChange: 'transform',
            }}
          >
            {/* Carousel Items */}
            {project.imageGallery.map((image, index) => (
              <div
                key={index}
                className="relative w-full flex-shrink-0"
                data-carousel-item={index === currentIndex ? 'active' : ''}
              >
                <Image
                  src={urlFor(image).width(1400).height(800).url()}
                  alt={image.alt || `${project.suburb} project image ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={95}
                  priority={index === currentIndex}
                />
              </div>
            ))}
          </div>

          {/* Image Caption Overlay */}
          {currentImage.caption && (
            <div className="absolute bottom-4 left-4 z-10 max-w-xs">
              <div className="bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                <p className="font-medium">{currentImage.caption}</p>
              </div>
            </div>
          )}
        </div>

        {/* Slider indicators */}
        {project.imageGallery.length > 1 && (
          <div className="absolute z-30 flex bottom-3 right-3 space-x-2 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
            {project.imageGallery.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white shadow-sm' : 'bg-white/60 hover:bg-white/90'
                } ${isTransitioning ? 'cursor-wait' : 'cursor-pointer'}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                data-carousel-slide-to={index}
              />
            ))}
          </div>
        )}

        {/* Previous Button - Only show if not at first image */}
        {currentIndex > 0 && (
          <button
            type="button"
            className={`absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none transition-all duration-200 ${
              isTransitioning ? 'cursor-wait opacity-50' : 'cursor-pointer hover:opacity-100'
            }`}
            onClick={goToPrevious}
            disabled={isTransitioning}
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 group-hover:bg-gray-50 group-hover:shadow-xl group-focus:ring-4 group-focus:ring-jlc-blue/20 group-focus:outline-none transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-800 rtl:rotate-180"
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
        )}

        {/* Next Button - Only show if not at last image */}
        {currentIndex < project.imageGallery.length - 1 && (
          <button
            type="button"
            className={`absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none transition-all duration-200 ${
              isTransitioning ? 'cursor-wait opacity-50' : 'cursor-pointer hover:opacity-100'
            }`}
            onClick={goToNext}
            disabled={isTransitioning}
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 group-hover:bg-gray-50 group-hover:shadow-xl group-focus:ring-4 group-focus:ring-jlc-blue/20 group-focus:outline-none transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-800 rtl:rotate-180"
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
        )}
      </div>

      {/* Description */}
      {project.description && (
        <div className="px-6 py-4">
          <p className="text-gray-700">{project.description}</p>
        </div>
      )}
    </div>
  );
}
