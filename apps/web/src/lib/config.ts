import { z } from 'zod';

const configSchema = z.object({
  awsRegion: z.string(),
  awsAccessKeyId: z.string(),
  awsSecretAccessKey: z.string(),
  emailEnabled: z.boolean(),
  emailFrom: z.string(),
  emailTo: z.string(),
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
  };

  return configSchema.parse(config);
}
