import { sanityFetch, statisticsQuery } from '@/lib/sanity/queries';
import { HeroSectionSchema, StatisticSchema } from '@/lib/sanity/schemas';
import { z } from 'zod';
import HeroSection from './HeroSection';

interface HeroSectionProps {
  className?: string;
}

export default async function HeroSectionContainer({ className = '' }: HeroSectionProps) {
  // Fetch both hero section and statistics in parallel
  const [heroData, statsData] = await Promise.all([
    sanityFetch({
      query: `*[_type == "heroSection"][0]`,
      schema: HeroSectionSchema,
      tags: ['heroSection'],
    }),
    sanityFetch({
      query: statisticsQuery,
      schema: z.array(StatisticSchema),
      tags: ['statistic'],
    }),
  ]);

  const { content, buttons } = heroData;

  const title = content.title || 'Professional Building Solutions';
  const subtitle = content.subtitle || '25+ Years of Excellence in Carpentry and Construction';
  const description = content.description;

  const primaryButton = {
    text: buttons.primaryButton.text || 'Free Estimate',
    action: buttons.primaryButton.action || 'contact',
    link: buttons.primaryButton.link,
  };

  const secondaryButton = buttons.secondaryButton ? {
    text: buttons.secondaryButton.text || 'View Our Work',
    action: buttons.secondaryButton.action || 'navigate',
    link: buttons.secondaryButton.link,
  } : null;

  return (
    <HeroSection
      title={title}
      subtitle={subtitle}
      description={description}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      stats={statsData}
      className={className}
    />
  );
}
