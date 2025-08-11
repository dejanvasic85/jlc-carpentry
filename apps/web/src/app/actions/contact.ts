'use server';

import { sendContactEmail, type ContactFormData } from '@/lib/email';

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    contactDetails?: string[];
    description?: string[];
  };
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    const data: ContactFormData = {
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
