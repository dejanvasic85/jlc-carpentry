'use client';

import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useActionState, useTransition } from 'react';
import Alert from './Alert';
import { FormInput, FormTextarea } from './forms';
import { gtag } from '@/components/GoogleTagManager';
import { executeReCaptcha } from '@/components/ReCaptcha';
import { submitContactForm, type ContactFormState } from '@/app/actions/contact';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  contactDetails: string;
  description: string;
  recaptchaToken?: string;
}

export default function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(async (prevState, formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('contactDetails', formData.contactDetails);
    data.append('description', formData.description);
    if (formData.recaptchaToken) {
      data.append('recaptchaToken', formData.recaptchaToken);
    }
    return submitContactForm(prevState, data);
  }, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      reset();
      // Track contact dialog opening
      gtag.event('contact_dialog_open', {
        category: 'lead_generation',
        action: 'dialog_open',
      });
    } else {
      dialog.close();
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Execute reCAPTCHA before form submission
      const recaptchaToken = await executeReCaptcha('contact_form');

      // Track form submission attempt
      gtag.trackContact('form');
      gtag.event('form_submit', {
        form_name: 'contact_dialog',
        category: 'lead_generation',
      });

      startTransition(() => {
        formAction({ ...data, recaptchaToken });
      });
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      // Still allow form submission if reCAPTCHA fails (fallback)
      startTransition(() => {
        formAction(data);
      });
    }
  };

  const showForm = !state?.success;

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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {state && (
              <div className="mb-4">
                <Alert
                  type={state.success ? 'success' : 'error'}
                  message={state.message}
                  onClose={() => {
                    if (state.success) {
                      handleClose();
                    }
                  }}
                  autoClose={state.success}
                />
              </div>
            )}

            {showForm && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                  label="Name"
                  placeholder="Your full name"
                  error={errors.name}
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: {
                      value: 50,
                      message: 'Name must be 50 characters or less',
                    },
                  })}
                />

                <FormInput
                  label="Contact Details (Email or Phone)"
                  placeholder="your.email@example.com or 0400 000 000"
                  error={errors.contactDetails}
                  {...register('contactDetails', {
                    required: 'Contact details are required',
                    maxLength: {
                      value: 100,
                      message: 'Contact details must be 100 characters or less',
                    },
                  })}
                />

                <FormTextarea
                  label="Project Description"
                  rows={4}
                  placeholder="Tell us about your project..."
                  error={errors.description}
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: {
                      value: 1000,
                      message: 'Description must be 1000 characters or less',
                    },
                  })}
                />

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-jlc-blue text-white px-4 py-2 rounded-lg hover:bg-jlc-blue-dark disabled:bg-jlc-blue-light disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    {isPending && (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {isPending ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isPending}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
