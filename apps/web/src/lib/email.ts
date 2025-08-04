import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { z } from 'zod';
import { getConfig } from './config';

const contactFormSchema = z.object({
  contactDetails: z
    .string()
    .min(1, 'Contact details are required')
    .max(100, 'Contact details must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: ContactFormData) {
  return contactFormSchema.safeParse(data);
}

export async function sendContactEmail(data: ContactFormData) {
  const validation = validateContactForm(data);

  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.issues.map((e) => e.message).join(', ')}`);
  }

  const config = getConfig();

  if (!config.emailEnabled) {
    console.log('Email sending is disabled. Contact form data:', {
      contactDetails: data.contactDetails,
      description: data.description,
      timestamp: new Date().toISOString(),
    });
    return { success: true, message: 'Email logging completed (email disabled)' };
  }

  const sesClient = new SESClient({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  });

  const emailParams = {
    Source: config.emailFrom,
    Destination: {
      ToAddresses: [config.emailTo],
      BccAddresses: ['dejanvasic24@gmail.com'],
    },
    Message: {
      Subject: {
        Data: 'New Contact Form Submission - JLC Carpentry',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `New contact form submission received:

Contact Details: ${data.contactDetails}

Description:
${data.description}

Submitted at: ${new Date().toISOString()}`,
          Charset: 'UTF-8',
        },
        Html: {
          Data: `
            <h2>New Contact Form Submission - JLC Carpentry</h2>
            <p><strong>Contact Details:</strong> ${data.contactDetails}</p>
            <p><strong>Description:</strong></p>
            <p>${data.description.replace(/\n/g, '<br>')}</p>
            <p><em>Submitted at: ${new Date().toISOString()}</em></p>
          `,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(emailParams);
    const result = await sesClient.send(command);

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
}
