import Card from '@/components/Card';
import { Service } from '@/lib/sanity/schemas';
import { urlFor } from '@/lib/sanity/image';
import Image from 'next/image';

interface ServicesSectionProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Service[];
}

export default function ServicesSection({
  className = '',
  title = '',
  description = '',
  services,
}: ServicesSectionProps) {
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

          {description && <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{description}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services?.map((service, index) => (
            <div key={service._id || index} className="group relative">
              <Card className="p-0 h-full border-l-4 border-jlc-blue overflow-hidden">
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="font-heading text-xl uppercase sm:text-2xl text-jlc-black transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {service.image?.asset && (
                  <div className="relative w-full aspect-video mb-6">
                    <Image
                      src={urlFor(service.image).width(400).height(225).format('webp').url()}
                      alt={service.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 pt-0">
                  <p className="text-slate-600 leading-relaxed text-base mb-6">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-jlc-blue rounded-full"></div>
                        <span className="text-slate-700 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button className="text-jlc-blue font-bold hover:text-jlc-blue-dark transition-colors">
                      <span className="uppercase">{service.link?.text || 'Learn More'}</span> →
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
