import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/PortableText';
import { type LegalPage } from '@/lib/sanity/schemas';

interface LegalPageContentProps {
  page: NonNullable<LegalPage>;
}

const lastUpdatedDateOptionsValue: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

function formatLastUpdated(date: string) {
  return new Date(date).toLocaleDateString('en-AU', lastUpdatedDateOptionsValue);
}

export default function LegalPageContent({ page }: LegalPageContentProps) {
  return (
    <article className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-jlc-black mb-3">{page.title}</h1>
          {page.lastUpdated && <p className="text-gray-600">Last updated: {formatLastUpdated(page.lastUpdated)}</p>}
        </header>
        <div className="prose prose-lg max-w-none">
          <PortableText value={page.content} components={portableTextComponents} />
        </div>
      </div>
    </article>
  );
}
