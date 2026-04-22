'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';

interface LightboxImage {
  asset: { _ref: string };
  alt: string;
  caption?: string | null;
}

interface ProjectImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProjectImageLightbox({ images, currentIndex, onClose, onNavigate }: ProjectImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const currentImage = images[currentIndex];
  const total = images.length;

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? total - 1 : currentIndex - 1);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex === total - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (dialog.open) dialog.close();
    };
  }, [handlePrev, handleNext]);

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!currentImage) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleDialogClick}
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${total}: ${currentImage.alt}`}
      className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-black/90 backdrop:bg-black/90 p-0 open:flex open:items-center open:justify-center"
    >
      <div className="relative flex flex-col items-center w-full h-full">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-10 text-white text-sm bg-black/60 rounded-full px-3 py-1">
          {currentIndex + 1} / {total}
        </div>

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            loader={sanityImageLoader}
            src={urlFor(currentImage).url()}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="absolute bottom-14 left-0 right-0 text-center px-6">
            <p className="text-white/90 text-sm bg-black/50 inline-block rounded px-3 py-1">{currentImage.caption}</p>
          </div>
        )}

        {/* Navigation */}
        {total > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}
