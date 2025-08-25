import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { z } from 'zod';
import { getConfig } from './config';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be 100 characters or less'),
  phone: z.string().max(20, 'Phone must be 20 characters or less').optional(),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: ContactFormData) {
  return contactFormSchema.safeParse(data);
}

async function sendConfirmationEmail(data: ContactFormData, sesClient: SESClient, config: { emailFrom: string }) {
  const confirmationEmailParams = {
    Source: config.emailFrom,
    Destination: {
      ToAddresses: [data.email],
    },
    Message: {
      Subject: {
        Data: 'Thank you for contacting JLC Carpentry & Building Services',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `Dear ${data.name},

Thank you for contacting JLC Carpentry & Building Services Pty Ltd!

We have received your message and someone from our team will get back to you within 24 hours.

For urgent matters, you can also call us directly using the phone button on our homepage.

Best regards,
JLC Carpentry & Building Services Team`,
          Charset: 'UTF-8',
        },
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af;">Thank you for contacting JLC Carpentry & Building Services</h2>
              
              <p>Dear ${data.name},</p>
              
              <p>Thank you for contacting <strong>JLC Carpentry & Building Services Pty Ltd</strong>!</p>
              
              <p>We have received your message and someone from our team will get back to you within <strong>24 hours</strong>.</p>
              
              <p>For urgent matters, you can also call us directly using the phone button on our homepage.</p>
              
              <p>Best regards,<br>
              <strong>JLC Carpentry & Building Services Team</strong></p>
            </div>
          `,
          Charset: 'UTF-8',
        },
      },
    },
  };

  const confirmationCommand = new SendEmailCommand(confirmationEmailParams);
  await sesClient.send(confirmationCommand);
}

export async function sendContactEmail(data: ContactFormData) {
  const validation = validateContactForm(data);

  if (!validation.success) {
    throw new Error(`Validation failed: ${validation.error.issues.map((e) => e.message).join(', ')}`);
  }

  const config = getConfig();

  if (!config.emailEnabled) {
    console.log('Email sending is disabled. Contact form data:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
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
        Data: `New Contact Form Submission from ${data.name} - JLC Carpentry`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `New contact form submission received:

Name: ${data.name}
Email: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}

Description:
${data.description}

Submitted at: ${new Date().toISOString()}`,
          Charset: 'UTF-8',
        },
        Html: {
          Data: `
            <h2>New Contact Form Submission - JLC Carpentry</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
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
    // Send notification email to business
    const command = new SendEmailCommand(emailParams);
    const result = await sesClient.send(command);

    // Send confirmation email to user
    await sendConfirmationEmail(data, sesClient, config);

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
