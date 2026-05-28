'use client';

import { useRef, useEffect } from 'react';
import ContactFormBody from '@/components/ContactFormBody';
import { gtag } from '@/components/GoogleTagManager';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      gtag.event('contact_dialog_open', {
        category: 'lead_generation',
        action: 'dialog_open',
      });
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 max-w-none w-full h-full"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading text-slate-900">Get In Touch</h2>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close dialog"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ContactFormBody
              submitLabel="Send Message"
              formName="contact_dialog"
              showServiceDropdown={false}
              onSuccess={handleClose}
              onCancel={handleClose}
              cancelLabel="Cancel"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
