import Card from '@/components/Card';

interface ServicesSectionProps {
  className?: string;
}

interface Service {
  title: string;
  desc: string;
  features: string[];
  icon: string;
  color: string;
}

const services: Service[] = [
  {
    title: 'Decks & Pergolas',
    desc: "Custom-designed outdoor structures built to withstand Melbourne's diverse weather conditions. From simple decks to elaborate pergolas, we create outdoor living spaces that enhance your lifestyle and property value.",
    features: ['Weather-resistant materials', 'Council-approved designs', '10-year structural warranty'],
    icon: '🏗️',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Kitchen & Bathroom Renovations',
    desc: 'Complete renovation services from initial concept through to final completion. We coordinate all trades and manage every aspect of your project for seamless, stress-free results.',
    features: ['Full project management', 'Licensed trades coordination', 'Quality assurance guarantee'],
    icon: '🔨',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Doors, Windows & Cladding',
    desc: 'Professional installation of premium doors, windows, and exterior cladding systems. We focus on improving both the aesthetic appeal and energy efficiency of your property.',
    features: ['Energy-efficient solutions', 'Premium materials only', 'Professional installation'],
    icon: '🚪',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Structural Modifications',
    desc: 'Safe and compliant structural changes including wall removal, extensions, and load-bearing modifications. All work includes professional engineering consultation and council compliance.',
    features: ['Engineering consultation', 'Council permit assistance', 'Structural warranties'],
    icon: '🏢',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function ServicesSection({ className = '' }: ServicesSectionProps) {
  return (
    <section id="services" className={`perf-section py-20 bg-gradient-to-br from-slate-50 to-slate-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight capitalize">
            Our <span className="text-blue-600">expertise</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive building solutions delivered with precision, professionalism, and unwavering commitment to
            quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              <Card className="p-8 h-full border-l-4 border-blue-600 hover:border-l-8 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl sm:text-2xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors capitalize">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>

                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-700 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                    <span className="capitalize">Learn More</span> →
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
