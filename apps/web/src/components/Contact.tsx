'use client';

import Button from '@/components/Button';
import ContactDialog from '@/components/ContactDialog';
import GoogleMap from '@/components/GoogleMap';
import { useState } from 'react';
import type { SiteSettings } from '@/lib/sanity/schemas';

interface ContactSectionProps {
  className?: string;
  siteSettings?: SiteSettings;
}

export default function ContactSection({ className = '', siteSettings }: ContactSectionProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsContactDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsContactDialogOpen(false);
  };

  return (
    <section id="contact" className={`perf-section py-20 text-white relative overflow-hidden ${className}`}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Map Section */}
        {siteSettings?.location?.address && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl md:text-3xl mb-2 text-jlc-blue-dark uppercase">Find Us</h3>
              <p className="text-lg text-jlc-black">
                Based in {siteSettings.location.address.suburb}, serving all Melbourne areas
              </p>
            </div>
            <GoogleMap
              address={siteSettings.location.address}
              businessName={siteSettings.company.name}
              className="max-w-4xl mx-auto"
            />
          </div>
        )}

        {/* Contact CTA Section */}
        <div className="text-center">
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
      </div>

      <ContactDialog isOpen={isContactDialogOpen} onClose={handleCloseDialog} />
    </section>
  );
}
