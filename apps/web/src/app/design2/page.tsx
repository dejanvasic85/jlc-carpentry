'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Design2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Corporate Header with Glass Effect */}
      <header className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900"></div>
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Image 
                src="/Business Logo 1.jpg" 
                alt="JLC Logo" 
                width={40} 
                height={40}
                className="rounded-lg border border-white/20 md:w-12 md:h-12"
              />
              <div>
                <h1 className="text-sm md:text-2xl font-bold tracking-wide leading-tight">
                  JLC CARPENTRY & BUILDING SERVICES
                </h1>
                <p className="text-blue-200 text-xs md:text-sm font-medium">PTY LTD</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#home" className="text-blue-300 font-semibold hover:text-white transition-colors border-b-2 border-blue-300 pb-1">HOME</a>
              <a href="#services" className="text-white hover:text-blue-300 transition-colors font-semibold">SERVICES</a>
              <a href="#about" className="text-white hover:text-blue-300 transition-colors font-semibold">ABOUT</a>
              <a href="#contact" className="text-white hover:text-blue-300 transition-colors font-semibold">CONTACT</a>
            </nav>

            {/* Mobile Hamburger Button */}
            <button 
              className="lg:hidden flex flex-col space-y-1 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-6 glass-dark rounded-xl px-6 py-6 space-y-4 border border-white/20">
              <a 
                href="#home" 
                className="block text-blue-300 font-semibold hover:text-white transition-colors py-3 border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </a>
              <a 
                href="#services" 
                className="block text-white hover:text-blue-300 transition-colors font-semibold py-3 border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </a>
              <a 
                href="#about" 
                className="block text-white hover:text-blue-300 transition-colors font-semibold py-3 border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </a>
              <a 
                href="#contact" 
                className="block text-white hover:text-blue-300 transition-colors font-semibold py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Glass Cards */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              PROFESSIONAL
              <br />
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                BUILDING SOLUTIONS
              </span>
            </h2>
            <p className="text-2xl md:text-3xl mb-8 text-blue-100 font-light">
              25+ Years of Excellence in Carpentry and Construction
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 text-lg tracking-wide transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
              FREE ESTIMATE
            </button>
            <button className="border-3 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-10 text-lg tracking-wide transition-all duration-200">
              VIEW OUR WORK
            </button>
          </div>

          {/* Corporate Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '25+', label: 'Years Experience', subtitle: 'Established 1995' },
              { number: '1000+', label: 'Projects Completed', subtitle: 'Residential & Commercial' },
              { number: '100%', label: 'Licensed & Insured', subtitle: 'Full Compliance' },
              { number: '24/7', label: 'Support Available', subtitle: 'Emergency Services' }
            ].map((stat, index) => (
              <div key={index} className="glass-dark rounded-xl p-6 text-center backdrop-blur-lg">
                <div className="text-4xl font-bold text-blue-200 mb-2">{stat.number}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-blue-200 text-xs">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              OUR <span className="text-blue-600">EXPERTISE</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive building solutions delivered with precision, professionalism, and unwavering commitment to quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { 
                title: 'DECKS & PERGOLAS', 
                desc: 'Custom-designed outdoor structures built to withstand Melbourne\'s diverse weather conditions. From simple decks to elaborate pergolas, we create outdoor living spaces that enhance your lifestyle and property value.',
                features: ['Weather-resistant materials', 'Council-approved designs', '10-year structural warranty'],
                icon: '🏗️',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                title: 'KITCHEN & BATHROOM RENOVATIONS', 
                desc: 'Complete renovation services from initial concept through to final completion. We coordinate all trades and manage every aspect of your project for seamless, stress-free results.',
                features: ['Full project management', 'Licensed trades coordination', 'Quality assurance guarantee'],
                icon: '🔨',
                color: 'from-emerald-500 to-emerald-600'
              },
              { 
                title: 'DOORS, WINDOWS & CLADDING', 
                desc: 'Professional installation of premium doors, windows, and exterior cladding systems. We focus on improving both the aesthetic appeal and energy efficiency of your property.',
                features: ['Energy-efficient solutions', 'Premium materials only', 'Professional installation'],
                icon: '🚪',
                color: 'from-purple-500 to-purple-600'
              },
              { 
                title: 'STRUCTURAL MODIFICATIONS', 
                desc: 'Safe and compliant structural changes including wall removal, extensions, and load-bearing modifications. All work includes professional engineering consultation and council compliance.',
                features: ['Engineering consultation', 'Council permit assistance', 'Structural warranties'],
                icon: '🏢',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="card-glass p-8 h-full border-l-4 border-blue-600 hover:border-l-8 transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>

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
                      LEARN MORE →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Trust Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900"></div>
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
            WHY CHOOSE <span className="text-blue-400">JLC CARPENTRY?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'LICENSED & INSURED',
                desc: 'Fully licensed builders with comprehensive insurance coverage for complete peace of mind.',
                icon: '🛡️'
              },
              {
                title: 'QUALITY GUARANTEE',
                desc: 'We stand behind our work with extensive warranties and use only premium materials and finishes.',
                icon: '⭐'
              },
              {
                title: 'LOCAL EXPERTISE',
                desc: 'Based in Alphington, serving all Melbourne areas with deep local knowledge and established relationships.',
                icon: '📍'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-dark rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-300 mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Card */}
          <div className="card-glass bg-gradient-to-r from-blue-600 to-blue-700 p-12 rounded-2xl border border-blue-400/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              GET YOUR FREE CONSULTATION TODAY
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Call us now or visit our Google Business page for reviews and comprehensive project information
            </p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-12 text-xl tracking-wide transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
              CONTACT US NOW
            </button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <Image 
                  src="/Business Logo 2.jpg" 
                  alt="JLC Logo" 
                  width={60} 
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold">JLC CARPENTRY</h3>
                  <p className="text-blue-300 font-semibold">& BUILDING SERVICES PTY LTD</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Professional carpentry and building services throughout Melbourne, delivering exceptional quality and craftsmanship since 1995. Licensed, insured, and committed to excellence.
              </p>
              <div className="space-y-2">
                <p className="text-gray-400"><span className="text-blue-300 font-semibold">ABN:</span> [Company ABN]</p>
                <p className="text-gray-400"><span className="text-blue-300 font-semibold">License:</span> [Builder License]</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-blue-300 mb-4">LOCATION</h4>
              <div className="space-y-2">
                <p className="text-gray-300">Based in Alphington</p>
                <p className="text-gray-300">Serving all areas of Melbourne</p>
                <p className="text-blue-300 font-semibold">24/7 Emergency Services</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-blue-300 mb-4">CONNECT</h4>
              <div className="space-y-3">
                <a href="https://g.co/kgs/ZxMwn9o" className="block text-white hover:text-blue-300 transition-colors font-medium">
                  📍 Google Business Profile
                </a>
                <a href="#" className="block text-white hover:text-blue-300 transition-colors font-medium">
                  📱 @Jlcbuilding
                </a>
                <a href="#" className="block text-white hover:text-blue-300 transition-colors font-medium">
                  📘 Facebook Page
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-gray-400 mb-4">© 2024 JLC Carpentry & Building Services Pty Ltd. All rights reserved.</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
              ← Back to Design Selection
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}