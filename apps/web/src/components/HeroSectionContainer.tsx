import { sanityFetch } from '@/lib/sanity/queries';
import { HeroSectionSchema } from '@/lib/sanity/schemas';
import HeroSection from './HeroSection';

interface HeroSectionProps {
  className?: string;
}

const HERO_QUERY = `*[_type == "heroSection"][0]`;

export default async function HeroSectionContainer({ className = '' }: HeroSectionProps) {
  const { content, buttons } = await sanityFetch({
    query: HERO_QUERY,
    schema: HeroSectionSchema,
    tags: ['heroSection'],
  });

  const title = content.title || 'Professional Building Solutions';
  const subtitle = content.subtitle || '25+ Years of Excellence in Carpentry and Construction';
  const description = content.description;

  const primaryButtonText = buttons.primaryButton.text || 'Free Estimate';
  const secondaryButtonText = buttons.secondaryButton?.text || 'View Our Work';

  return (
    <HeroSection
      title={title}
      subtitle={subtitle}
      description={description}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      className={className}
    />
  );
}
