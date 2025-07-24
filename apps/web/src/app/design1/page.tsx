'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Design1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="glass rounded-2xl px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Image 
              src="/Business Logo 2.jpg" 
              alt="JLC Logo" 
              width={32} 
              height={32}
              className="rounded-lg md:w-10 md:h-10"
            />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              JLC Carpentry
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-slate-700 hover:text-blue-600 transition-all font-medium">Services</a>
            <a href="#about" className="text-slate-700 hover:text-blue-600 transition-all font-medium">About</a>
            <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-all font-medium">Contact</a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden flex flex-col space-y-1 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-2xl px-6 py-4 space-y-4">
            <a 
              href="#services" 
              className="block text-slate-700 hover:text-blue-600 transition-all font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#about" 
              className="block text-slate-700 hover:text-blue-600 transition-all font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block text-slate-700 hover:text-blue-600 transition-all font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section with Glass Effect */}
        <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-slate-100/50 opacity-50"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-slate-200 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-light text-slate-800 mb-6 leading-tight">
                Expert <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Carpentry</span>
                <br />& Building Services
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Transforming Melbourne homes with precision craftsmanship, innovative design, and professional excellence since 1995.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="btn-primary px-8 py-4 text-lg">
                Get Free Consultation
              </button>
              <button className="btn-secondary px-8 py-4 text-lg">
                View Our Work
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { number: '25+', label: 'Years Experience', icon: '🏆' },
                { number: '500+', label: 'Projects Completed', icon: '🏗️' },
                { number: '100%', label: 'Customer Satisfaction', icon: '⭐' }
              ].map((stat, index) => (
                <div key={index} className="card-glass px-6 py-8 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section with Modern Cards */}
        <section id="services" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4">
                Our <span className="font-bold text-blue-600">Expertise</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                From concept to completion, we deliver exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: 'Decks & Pergolas', 
                  desc: 'Custom outdoor living spaces that seamlessly blend with your lifestyle and landscape',
                  icon: '🏡',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  title: 'Kitchen Renovations', 
                  desc: 'Complete kitchen transformations using premium materials and modern design principles',
                  icon: '🔨',
                  gradient: 'from-emerald-500 to-teal-500'
                },
                { 
                  title: 'Bathroom Makeovers', 
                  desc: 'Luxurious bathroom spaces combining functionality with contemporary aesthetics',
                  icon: '🚿',
                  gradient: 'from-purple-500 to-pink-500'
                },
                { 
                  title: 'Custom Carpentry', 
                  desc: 'Bespoke woodwork solutions including doors, windows, and architectural features',
                  icon: '🪚',
                  gradient: 'from-orange-500 to-red-500'
                }
              ].map((service, index) => (
                <div key={index} className="group relative">
                  <div className="card-glass p-8 h-full relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-10 rounded-bl-3xl`}></div>
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="mt-6">
                      <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Glass Effect */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              From Alphington to all corners of Melbourne, we bring exceptional craftsmanship directly to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200">
                Call (03) XXX-XXXX
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { title: 'Licensed & Insured', desc: 'Fully certified with comprehensive coverage' },
                { title: 'Quality Guarantee', desc: 'Premium materials with workmanship warranty' },
                { title: 'Local Melbourne', desc: 'Based in Alphington, serving all areas' }
              ].map((feature, index) => (
                <div key={index} className="glass-dark rounded-xl p-6 text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image 
                  src="/Business Logo 1.jpg" 
                  alt="JLC Logo" 
                  width={40} 
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold">JLC Carpentry</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Professional carpentry and building services throughout Melbourne, delivering quality craftsmanship since 1995.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Location</h4>
              <p className="text-slate-400 mb-2">Based in Alphington</p>
              <p className="text-slate-400">Serving all areas of Melbourne</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="https://g.co/kgs/ZxMwn9o" className="text-blue-400 hover:text-blue-300 transition-colors block">
                  Google Business Profile
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors block">
                  @Jlcbuilding
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors block">
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400 mb-4">© 2024 JLC Carpentry & Building Services Pty Ltd. All rights reserved.</p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              ← Back to Design Selection
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}