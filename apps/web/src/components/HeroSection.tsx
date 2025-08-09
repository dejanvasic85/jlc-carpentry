'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import ContactDialog from '@/components/ContactDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Statistic } from '@/lib/sanity/schemas';

interface ButtonData {
  text: string;
  action: 'contact' | 'navigate' | 'page' | 'external';
  link?: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string | null;
  primaryButton: ButtonData;
  secondaryButton: ButtonData | null;
  stats: Statistic[];
  showStats?: boolean;
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
      className={`perf-section relative py-20 bg-gradient-to-br from-jlc-black via-jlc-blue-dark to-jlc-blue text-white overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-jlc-blue-light/10 rounded-full blur-xl opacity-70"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl mb-6 leading-tight">
            <span className="capitalize">{title.split(' ')[0]}</span>
            <br />
            <span className="bg-gradient-to-r from-jlc-blue-light to-white bg-clip-text capitalize">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <p className="text-2xl md:text-3xl mb-8  font-light">{subtitle}</p>
          {description && <p className="text-lg mb-8 max-w-3xl mx-auto">{description}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button variant="primary" size="md" onClick={() => handleButtonAction(primaryButton)}>
            <span className="capitalize">{primaryButton.text}</span>
          </Button>
          {secondaryButton && (
            <Button variant="outline" size="md" onClick={() => handleButtonAction(secondaryButton)}>
              <span className="capitalize">{secondaryButton.text}</span>
            </Button>
          )}
        </div>

        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} variant="glass-dark" className="p-6 text-center" hover={false}>
                <div className="text-4xl font-bold text-jlc-blue-light mb-2">{stat.number}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-xs">{stat.subtitle}</div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ContactDialog isOpen={isContactDialogOpen} onClose={handleCloseDialog} />
    </section>
  );
}
