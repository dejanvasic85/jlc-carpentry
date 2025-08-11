import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { PropsWithChildren } from 'react';

interface LinkProps extends PropsWithChildren {
  value?: { href?: string };
}

interface ImageProps {
  value?: { alt?: string; caption?: string; asset?: { _ref?: string } };
}

// Portable Text components for rendering rich content
export const portableTextComponents = {
  block: {
    h2: ({ children }: PropsWithChildren) => <h2 className="font-heading text-3xl mb-6 text-jlc-black">{children}</h2>,
    h3: ({ children }: PropsWithChildren) => <h3 className="font-heading text-xl mb-4 text-jlc-black">{children}</h3>,
    normal: ({ children }: PropsWithChildren) => (
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: PropsWithChildren) => (
      <blockquote className="border-l-4 border-jlc-blue pl-6 italic text-gray-600 my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: PropsWithChildren) => (
      <ul className="space-y-3 mb-6" role="list">
        {children}
      </ul>
    ),
    number: ({ children }: PropsWithChildren) => (
      <ol className="space-y-3 mb-6 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PropsWithChildren) => (
      <li className="flex items-start space-x-3">
        <span className="w-2 h-2 bg-jlc-blue rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
        <span className="text-gray-700">{children}</span>
      </li>
    ),
    number: ({ children }: PropsWithChildren) => <li className="text-gray-700">{children}</li>,
  },
  marks: {
    strong: ({ children }: PropsWithChildren) => <strong className="font-semibold text-jlc-black">{children}</strong>,
    em: ({ children }: PropsWithChildren) => <em className="italic">{children}</em>,
    underline: ({ children }: PropsWithChildren) => <span className="underline">{children}</span>,
    link: ({ children, value }: LinkProps) => (
      <a
        href={value?.href || '#'}
        className="text-jlc-blue hover:text-jlc-blue-dark underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: ImageProps) => (
      <div className="my-8">
        {value?.asset && (
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Service image'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
        )}
        {value?.caption && <p className="text-sm text-gray-500 mt-2 text-center italic">{value.caption}</p>}
      </div>
    ),
  },
} as const;
