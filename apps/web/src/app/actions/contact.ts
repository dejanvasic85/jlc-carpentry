'use server';

import { sendContactEmail, type ContactFormData } from '@/lib/email';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    contactDetails?: string[];
    description?: string[];
  };
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    // Verify reCAPTCHA token if provided
    const recaptchaToken = formData.get('recaptchaToken') as string;

    if (recaptchaToken) {
      // Get headers for better assessment (optional but recommended)
      const { headers } = await import('next/headers');
      const headersList = await headers();
      const userAgent = headersList.get('user-agent') || undefined;
      const userIpAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || undefined;

      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken, userAgent, userIpAddress, 'contact_form');

      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed:', recaptchaResult.error);
        return {
          success: false,
          message: 'Security verification failed. Please try again.',
        };
      }
    } else {
      // Log when no reCAPTCHA token is provided (fallback scenario)
      console.warn('No reCAPTCHA token provided');
    }

    const data: ContactFormData = {
      name: formData.get('name') as string,
      contactDetails: formData.get('contactDetails') as string,
      description: formData.get('description') as string,
    };

    await sendContactEmail(data);

    return {
      success: true,
      message: 'Thank you for your message! Our team has been notified and will get back to you shortly.',
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation failed')) {
      return {
        success: false,
        message: 'Please check your input and try again.',
        errors: {
          name: error.message.includes('Name') ? [error.message] : undefined,
          contactDetails: error.message.includes('Contact details') ? [error.message] : undefined,
          description: error.message.includes('Description') ? [error.message] : undefined,
        },
      };
    }

    console.error('Contact form submission error:', error);

    return {
      success: false,
      message: "We're experiencing technical difficulties. Please try again later or contact us directly.",
    };
  }
}
