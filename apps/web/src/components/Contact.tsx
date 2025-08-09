'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import ContactDialog from '@/components/ContactDialog';
import { useState } from 'react';

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsContactDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsContactDialogOpen(false);
  };

  return (
    <section id="contact" className={`perf-section py-20 text-white relative overflow-hidden ${className}`}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-heading text-3xl md:text-4xl mb-4 text-jlc-blue-dark uppercase">
          Get your free quote today
        </h3>
        <p className="text-xl text-jlc-black mb-8 max-w-2xl mx-auto">
          Call us now or visit our Google Business page for reviews and comprehensive project information
        </p>
        <Button variant="primary" size="lg" onClick={handleOpenDialog}>
          Contact us now
        </Button>
      </div>

      <ContactDialog isOpen={isContactDialogOpen} onClose={handleCloseDialog} />
    </section>
  );
}
