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
    <section
      id="contact"
      className={`perf-section py-20 bg-slate-900 text-white relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-jlc-blue-dark"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* CTA Card */}
        <Card
          className="bg-gradient-to-r from-jlc-blue to-jlc-blue-dark p-12 border border-jlc-blue-light/20"
          hover={false}
        >
          <h3 className="font-heading text-3xl md:text-4xl mb-4 text-white">GET YOUR FREE CONSULTATION TODAY</h3>
          <p className="text-xl text-jlc-blue-light/80 mb-8 max-w-2xl mx-auto">
            Call us now or visit our Google Business page for reviews and comprehensive project information
          </p>
          <Button variant="primary" size="lg" onClick={handleOpenDialog}>
            CONTACT US NOW
          </Button>
        </Card>
      </div>

      <ContactDialog isOpen={isContactDialogOpen} onClose={handleCloseDialog} />
    </section>
  );
}
