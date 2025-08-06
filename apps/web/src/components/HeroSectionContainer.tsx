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
      className={className}
    />
  );
}
