'use client';

import Card from '@/components/Card';
import { AboutFeature } from '@/lib/sanity/schemas';

interface AboutSectionProps {
  features: AboutFeature[];
  className?: string;
}

export default function AboutSection({ features, className = '' }: AboutSectionProps) {
  return (
    <section id="about" className={`perf-section py-20 bg-slate-900 text-white relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-jlc-blue-dark"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl mb-12 tracking-tight uppercase">
          Why choose <span className="text-jlc-blue-light">JLC Carpentry & Building services?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="glass-dark" className="p-8 text-center" hover={false}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-heading text-xl text-jlc-blue-light mb-4 uppercase">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
