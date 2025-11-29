import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const builder = createImageUrlBuilder({
  projectId: '365wnpgg',
  dataset: 'production',
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
