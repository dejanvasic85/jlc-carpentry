'use client';

import { useForm } from 'react-hook-form';
import { useActionState, useTransition } from 'react';
import Alert from '@/components/Alert';
import { FormInput, FormTextarea } from '@/components/forms';
import { gtag } from '@/components/GoogleTagManager';
import { executeReCaptcha } from '@/components/ReCaptcha';
import { submitContactForm, type ContactFormState } from '@/app/actions/contact';

const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'Decks & Pergolas', label: 'Decks & Pergolas' },
  { value: 'Kitchen Renovation', label: 'Kitchen Renovation' },
  { value: 'Bathroom Renovation', label: 'Bathroom Renovation' },
  { value: 'Structural Work', label: 'Structural Work' },
  { value: 'Doors & Windows', label: 'Doors & Windows' },
  { value: 'Other', label: 'Other' },
] as const;

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  description?: string;
  recaptchaToken?: string;
}

interface ContactFormBodyProps {
  submitLabel?: string;
  formName?: string;
  showServiceDropdown?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  cancelLabel?: string;
}

export default function ContactFormBody({
  submitLabel = 'Send Message',
  formName = 'contact_dialog',
  showServiceDropdown = false,
  onSuccess,
  onCancel,
  cancelLabel,
}: ContactFormBodyProps) {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(async (_prevState, formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone || '');
    const descriptionParts = [];
    if (formData.service) descriptionParts.push(`Service: ${formData.service}`);
    if (formData.description) descriptionParts.push(formData.description);
    data.append('description', descriptionParts.join('\n') || '');
    if (formData.recaptchaToken) {
      data.append('recaptchaToken', formData.recaptchaToken);
    }
    return submitContactForm(_prevState, data);
  }, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleSuccess = () => {
    reset();
    onSuccess?.();
  };

  const onSubmit = async (data: FormData) => {
    try {
      const recaptchaToken = await executeReCaptcha('contact_form');
      gtag.trackContact('form');
      gtag.event('form_submit', {
        form_name: formName,
        category: 'lead_generation',
      });
      gtag.conversion('quote_request_submitted');
      startTransition(() => {
        formAction({ ...data, recaptchaToken });
      });
    } catch {
      startTransition(() => {
        formAction(data);
      });
    }
  };

  const showForm = !state?.success;

  return (
    <>
      {state && (
        <div className="mb-4">
          <Alert
            type={state.success ? 'success' : 'error'}
            message={state.message}
            onClose={state.success ? handleSuccess : undefined}
            autoClose={state.success}
          />
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormInput
            label="Name"
            placeholder="Your full name"
            error={errors.name}
            {...register('name', {
              required: 'Name is required',
              maxLength: { value: 50, message: 'Name must be 50 characters or less' },
            })}
          />

          <FormInput
            label="Phone"
            type="tel"
            placeholder="0400 000 000"
            error={errors.phone}
            {...register('phone', {
              required: 'Phone number is required',
              maxLength: { value: 20, message: 'Phone must be 20 characters or less' },
            })}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            error={errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
              maxLength: { value: 100, message: 'Email must be 100 characters or less' },
            })}
          />

          {showServiceDropdown && (
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                What can we help with?
              </label>
              <select
                id="service"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jlc-blue focus:border-jlc-blue transition-colors bg-white ${
                  errors.service ? 'border-red-300' : 'border-slate-300'
                }`}
                aria-invalid={errors.service ? 'true' : 'false'}
                aria-describedby={errors.service ? 'service-error' : undefined}
                {...register('service', { required: 'Please select a service' })}
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p id="service-error" className="mt-1 text-sm text-red-600">
                  {errors.service.message}
                </p>
              )}
            </div>
          )}

          <FormTextarea
            label="Brief description (optional)"
            rows={3}
            placeholder="Tell us a bit about your project..."
            error={errors.description}
            {...register('description', {
              maxLength: { value: 1000, message: 'Description must be 1000 characters or less' },
            })}
          />

          <div className={`pt-2 ${onCancel ? 'flex space-x-3' : ''}`}>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 w-full bg-jlc-blue text-white px-4 py-3 rounded-lg hover:bg-jlc-blue-dark disabled:bg-jlc-blue-light disabled:cursor-not-allowed transition-colors font-bold text-base flex items-center justify-center gap-2"
            >
              {isPending && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isPending ? 'Sending...' : submitLabel}
            </button>
            {onCancel && cancelLabel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isPending}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
              >
                {cancelLabel}
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
}
