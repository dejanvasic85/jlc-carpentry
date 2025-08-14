'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import ContactDialog from '@/components/ContactDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Statistic } from '@/lib/sanity/schemas';
import { urlFor } from '@/lib/sanity/image';

interface ButtonData {
  text: string;
  action: 'contact' | 'navigate' | 'page' | 'external';
  link?: string | null;
}

interface HeroImage {
  asset: {
    _ref: string;
  };
  alt: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string | null;
  primaryButton: ButtonData;
  secondaryButton: ButtonData | null | undefined;
  stats: Statistic[];
  showStats?: boolean;
  heroImage?: HeroImage | null;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  stats,
  showStats = true,
  heroImage,
  className = '',
}: HeroSectionProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const router = useRouter();

  const handleOpenDialog = () => {
    setIsContactDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsContactDialogOpen(false);
  };

  const handleButtonAction = (button: ButtonData) => {
    switch (button.action) {
      case 'contact':
        handleOpenDialog();
        break;
      case 'navigate':
        if (button.link) {
          // Navigate to section (scroll to element with ID)
          const element = document.getElementById(button.link.replace('#', ''));
          element?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'page':
        if (button.link) {
          // Navigate to internal page using Next.js router
          router.push(button.link);
        }
        break;
      case 'external':
        if (button.link) {
          // Open external link in new tab
          window.open(button.link, '_blank', 'noopener,noreferrer');
        }
        break;
    }
  };

  return (
    <section
      id="home"
      className={`perf-section relative py-20 bg-gradient-to-br from-jlc-blue via-jlc-blue to-jlc-blue-light text-jlc-black overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-jlc-black/10 to-transparent"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-jlc-black/5 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-jlc-blue-dark/10 rounded-full blur-xl opacity-70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Mobile Heading - Shows first on mobile */}
        <div className="lg:hidden text-center mb-8">
          <h2 className="font-display text-5xl md:text-6xl mb-4 leading-tight">
            <span className="capitalize block">{title.split(' ')[0]}</span>
            <span className="bg-gradient-to-r from-jlc-blue-dark to-jlc-black bg-clip-text capitalize block">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[600px]">
          {/* Text Content Column - Desktop Only Heading */}
          <div className="text-center lg:text-left order-3 lg:order-1">
            {/* Desktop Heading */}
            <div className="hidden lg:block">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="capitalize block">{title.split(' ')[0]}</span>
                <span className="bg-gradient-to-r from-jlc-blue-dark to-jlc-black bg-clip-text capitalize block">
                  {title.split(' ').slice(1).join(' ')}
                </span>
              </h2>
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light">{subtitle}</p>
            {description && (
              <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-jlc-black">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 lg:mb-0">
              <Button variant="primary" size="lg" onClick={() => handleButtonAction(primaryButton)}>
                <span className="capitalize">{primaryButton.text}</span>
              </Button>
              {secondaryButton && (
                <Button variant="outline" size="lg" onClick={() => handleButtonAction(secondaryButton)}>
                  <span className="capitalize">{secondaryButton.text}</span>
                </Button>
              )}
            </div>
          </div>

          {/* Image Column - Only render if heroImage exists or fallback is available */}
          {(heroImage || true) && (
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-jlc-blue-dark/20 to-transparent z-10"></div>
                <Image
                  src={heroImage ? urlFor(heroImage).width(800).height(600).url() : '/hero.webp'}
                  alt={heroImage?.alt || 'JLC Carpentry professional work showcase'}
                  width={800}
                  height={600}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  priority
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <p className="text-white font-medium">Professional Carpentry & Building Services</p>
                    <p className="text-jlc-blue-light text-sm">Serving Melbourne & Alphington</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-jlc-blue-light/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>
          )}
        </div>

        {/* Stats Section - Full Width Below */}
        {showStats && (
          <div className="mt-16 pt-16 border-t border-jlc-black/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} variant="glass" className="p-6 text-center" hover={false}>
                  <div className="text-3xl md:text-4xl font-bold text-jlc-blue-dark mb-2">{stat.number}</div>
                  <div className="text-jlc-black font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs opacity-60">{stat.subtitle}</div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <ContactDialog isOpen={isContactDialogOpen} onClose={handleCloseDialog} />
    </section>
  );
}
