import Card from '@/components/Card';
import { Service } from '@/lib/sanity/schemas';

interface ServicesSectionProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Service[];
}

export default function ServicesSection({ className = '', title = '', description = '', services }: ServicesSectionProps) {
  const [firstWord, secondWord = ''] = title.split(' ');

  return (
    <section id="services" className={`perf-section py-20 bg-gradient-to-br from-slate-50 to-slate-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {title && (
            <h2 className="font-heading text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight capitalize">
              {firstWord} <span className="text-jlc-blue">{secondWord}</span>
            </h2>
          )}

          {/* <div className="w-24 h-1 bg-jlc-blue mx-auto mb-6"></div> */}

          {description && (
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services?.map((service, index) => (
            <div key={service._id || index} className="group relative">
              <Card className="p-8 h-full border-l-4 border-jlc-blue">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl sm:text-3xl text-jlc-black mb-2 transition-colors capitalize">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed text-lg mb-6">{service.description}</p>

                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-jlc-blue rounded-full"></div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button className="text-jlc-blue font-bold hover:text-jlc-blue-dark transition-colors">
                    <span className="capitalize">{service.link?.text || 'Learn More'}</span> →
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
