import { z } from 'zod';

const configSchema = z.object({
  awsRegion: z.string(),
  awsAccessKeyId: z.string(),
  awsSecretAccessKey: z.string(),
  emailEnabled: z.boolean(),
  emailFrom: z.string(),
  emailTo: z.string(),
  recaptchaSiteKey: z.string(),
  recaptchaSecretKey: z.string(),
  googleCloudProjectId: z.string(),
  sanityProjectId: z.string(),
  sanityDataset: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export function getConfig(): Config {
  const config = {
    awsRegion: process.env.AWS_REGION || 'ap-southeast-2',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    emailEnabled: process.env.EMAIL_ENABLED === 'true',
    emailFrom: process.env.EMAIL_FROM || '',
    emailTo: process.env.EMAIL_TO || '',
    recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
    sanityProjectId: process.env.SANITY_PROJECT_ID || '',
    sanityDataset: process.env.SANITY_DATASET || '',
  };

  return configSchema.parse(config);
}
