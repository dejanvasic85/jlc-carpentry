import Button from '@/components/Button';
import Card from '@/components/Card';

interface TrustSectionProps {
  className?: string;
}

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

export default function TrustSection({ className = '' }: TrustSectionProps) {
  const features: Feature[] = [
    {
      title: 'LICENSED & INSURED',
      desc: 'Fully licensed builders with comprehensive insurance coverage for complete peace of mind.',
      icon: '🛡️',
    },
    {
      title: 'QUALITY GUARANTEE',
      desc: 'We stand behind our work with extensive warranties and use only premium materials and finishes.',
      icon: '⭐',
    },
    {
      title: 'LOCAL EXPERTISE',
      desc: 'Based in Alphington, serving all Melbourne areas with deep local knowledge and established relationships.',
      icon: '📍',
    },
  ];

  return (
    <section className={`perf-section py-20 bg-slate-900 text-white relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl mb-12 tracking-tight">
          WHY CHOOSE <span className="text-blue-400">JLC CARPENTRY?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} variant="glass-dark" className="p-8 text-center" hover={false}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-heading text-xl text-blue-300 mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>

        {/* CTA Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 border border-blue-400/20" hover={false}>
          <h3 className="font-heading text-3xl md:text-4xl mb-4 text-white">GET YOUR FREE CONSULTATION TODAY</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Call us now or visit our Google Business page for reviews and comprehensive project information
          </p>
          <Button variant="primary" size="lg">
            CONTACT US NOW
          </Button>
        </Card>
      </div>
    </section>
  );
}
