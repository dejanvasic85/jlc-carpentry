'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { urlFor } from '@/lib/sanity/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';
import { VideoPlayer } from '@/components/VideoPlayer';
import type { ProjectVideo } from '@/lib/sanity/schemas';

interface GalleryImage {
  asset: { _ref: string };
  alt: string;
  caption?: string | null;
}

type MediaItem = { type: 'image'; data: GalleryImage } | { type: 'video'; data: ProjectVideo };

interface ProjectMediaViewerProps {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}

export default function ProjectMediaViewer({ items, initialIndex, onClose }: ProjectMediaViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [enableMousewheel, setEnableMousewheel] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    setActiveIndex(initialIndex);
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (dialog.open) dialog.close();
    };
  }, [initialIndex, onClose]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateMousewheel = () => setEnableMousewheel(mediaQuery.matches);

    updateMousewheel();
    mediaQuery.addEventListener('change', updateMousewheel);

    return () => mediaQuery.removeEventListener('change', updateMousewheel);
  }, []);

  useEffect(() => {
    const hintKey = 'project-media-viewer-hint-seen';
    const hintSeen = window.localStorage.getItem(hintKey);
    if (hintSeen) return;

    setShowSwipeHint(true);
    window.localStorage.setItem(hintKey, 'true');

    const timeout = window.setTimeout(() => {
      setShowSwipeHint(false);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, []);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleDialogClick}
      role="dialog"
      aria-modal="true"
      aria-label="Project media viewer"
      className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-black/95 backdrop:bg-black/95 p-0 open:flex open:items-center open:justify-center"
    >
      <div className="relative w-full h-full">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close media viewer"
          className="absolute top-4 right-4 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute top-4 left-4 z-30 rounded-full bg-black/60 px-3 py-1.5 text-white text-sm">
          {activeIndex + 1} / {items.length}
        </div>

        <div className="absolute right-4 bottom-4 z-30 hidden md:flex flex-col gap-2">
          <button
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous media item"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            aria-label="Next media item"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        <Swiper
          modules={[A11y, Keyboard, Mousewheel]}
          direction="vertical"
          slidesPerView={1}
          initialSlide={initialIndex}
          speed={360}
          mousewheel={enableMousewheel ? { forceToAxis: true, releaseOnEdges: true, sensitivity: 0.75 } : false}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onSwiper={setSwiper}
          onSlideChange={(slider) => setActiveIndex(slider.activeIndex)}
          className="h-full w-full"
        >
          {items.map((item, index) => {
            if (item.type === 'image') {
              return (
                <SwiperSlide key={`image-${index}`}>
                  <div className="h-full w-full flex items-center justify-center p-4 md:p-8">
                    <div className="relative h-full w-full max-w-6xl">
                      <Image
                        loader={sanityImageLoader}
                        src={urlFor(item.data).width(2200).url()}
                        alt={item.data.alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority={index === initialIndex}
                      />
                    </div>
                    {item.data.caption && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4">
                        <p className="rounded-md bg-black/60 px-3 py-2 text-white text-sm text-center">
                          {item.data.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            }

            const poster = item.data.thumbnail ? urlFor(item.data.thumbnail).width(1920).height(1080).url() : undefined;

            return (
              <SwiperSlide key={`video-${index}`}>
                <div className="h-full w-full flex items-center justify-center p-4 md:p-8">
                  <div className="w-full max-w-5xl">
                    <div className="overflow-hidden rounded-xl border border-white/15 bg-jlc-black shadow-2xl">
                      <VideoPlayer
                        src={item.data.video.asset.url}
                        title={item.data.title}
                        description={item.data.description ?? undefined}
                        transcript={item.data.transcript ?? undefined}
                        poster={poster}
                        className="rounded-none"
                      />
                    </div>
                    <div className="mt-3 px-1 text-white">
                      <h3 className="font-heading text-xl tracking-wide">{item.data.title}</h3>
                      {item.data.description && (
                        <p className="mt-1 text-white/75 text-sm md:text-base">{item.data.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />

        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${showSwipeHint ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          aria-hidden="true"
        >
          <div className="rounded-2xl border border-white/20 bg-black/55 px-4 py-3 backdrop-blur-sm text-white text-center shadow-xl">
            <p className="text-sm font-medium tracking-wide">Swipe up/down</p>
            <p className="text-xs text-white/75 mt-1">Browse photos and videos</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
