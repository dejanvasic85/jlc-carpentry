'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import ContactDialog from '@/components/ContactDialog';
import { useState } from 'react';

interface HeroSectionProps {
  className?: string;
}

interface Stat {
  number: string;
  label: string;
  subtitle: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const stats: Stat[] = [
    { number: '25+', label: 'Years Experience', subtitle: 'Established 1995' },
    { number: '1000+', label: 'Projects Completed', subtitle: 'Residential & Commercial' },
    { number: '100%', label: 'Licensed & Insured', subtitle: 'Full Compliance' },
    { number: '24/7', label: 'Support Available', subtitle: 'Emergency Services' },
  ];

  const handleOpenDialog = () => {
    setIsContactDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsContactDialogOpen(false);
  };

  return (
    <section
      id="home"
      className={`perf-section relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 text-white overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-xl opacity-70"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl mb-6 leading-tight">
            PROFESSIONAL
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              BUILDING SOLUTIONS
            </span>
          </h2>
          <p className="text-2xl md:text-3xl mb-8 text-blue-100 font-light">
            25+ Years of Excellence in Carpentry and Construction
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button variant="primary" size="md" onClick={handleOpenDialog}>
            FREE ESTIMATE
          </Button>
          <Button variant="outline" size="md">
            VIEW OUR WORK
          </Button>
        </div>

        {/* Corporate Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} variant="glass-dark" className="p-6 text-center" hover={false}>
              <div className="text-4xl font-bold text-blue-200 mb-2">{stat.number}</div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-blue-200 text-xs">{stat.subtitle}</div>
            </Card>
          ))}
        </div>
      </div>

      <ContactDialog isOpen={isContactDialogOpen} onClose={handleCloseDialog} />
    </section>
  );
}
