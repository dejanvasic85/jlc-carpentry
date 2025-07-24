'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Design3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl px-4 md:px-6 py-4 flex justify-between items-center border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Image 
                src="/Business Logo 2.jpg" 
                alt="JLC Logo" 
                width={40} 
                height={40}
                className="rounded-xl border border-blue-400/30 md:w-12 md:h-12"
              />
              <div className="text-xl md:text-3xl font-black text-blue-400 tracking-wider drop-shadow-2xl">
                JLC
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-blue-400 transition-all font-bold text-lg tracking-wide">
                SERVICES
              </a>
              <a href="#gallery" className="text-white hover:text-blue-400 transition-all font-bold text-lg tracking-wide">
                GALLERY
              </a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-all font-bold text-lg tracking-wide">
                CONTACT
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden flex flex-col space-y-1 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 glass-dark rounded-2xl px-6 py-6 space-y-4 border border-white/20 shadow-2xl">
              <a 
                href="#services" 
                className="block text-white hover:text-blue-400 transition-all font-bold text-lg tracking-wide py-3 border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </a>
              <a 
                href="#gallery" 
                className="block text-white hover:text-blue-400 transition-all font-bold text-lg tracking-wide py-3 border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                GALLERY
              </a>
              <a 
                href="#contact" 
                className="block text-white hover:text-blue-400 transition-all font-bold text-lg tracking-wide py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Dynamic Background */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-blue-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-400/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-teal-400/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
              <span className="block">CRAFT.</span>
              <span className="block">BUILD.</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                TRANSFORM.
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light mb-12 tracking-wide">
              Melbourne&apos;s <span className="text-blue-400 font-semibold">Premier</span> Carpentry & Building Services
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-black py-6 px-12 text-xl rounded-full tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
              <span className="relative z-10">START YOUR PROJECT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="border-3 border-white text-white hover:bg-white hover:text-black font-black py-6 px-12 text-xl rounded-full tracking-wider transition-all duration-300 hover:scale-105">
              VIEW PORTFOLIO
            </button>
          </div>
        </div>
      </section>

      {/* Services Section with 3D Cards */}
      <section id="services" className="py-24 bg-gradient-to-b from-black to-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              What We <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Create</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { 
                title: 'OUTDOOR LIVING', 
                subtitle: 'Decks • Pergolas • Entertainment Areas',
                desc: 'Transform your backyard into a stunning outdoor oasis. Custom-designed decks and pergolas that become the heart of your home.',
                accent: 'from-red-500 to-pink-500',
                icon: '🏡'
              },
              { 
                title: 'RENOVATIONS', 
                subtitle: 'Kitchens • Bathrooms • Complete Makeovers',
                desc: 'Breathe new life into your space. From concept to completion, we handle every detail of your renovation journey.',
                accent: 'from-emerald-500 to-teal-500',
                icon: '🔨'
              },
              { 
                title: 'STRUCTURAL WORK', 
                subtitle: 'Walls • Doors • Windows • Cladding',
                desc: 'Precision craftsmanship in every cut, every joint, every finish. Building structures that stand the test of time.',
                accent: 'from-blue-500 to-indigo-500',
                icon: '🏗️'
              },
              { 
                title: 'CUSTOM BUILDS', 
                subtitle: 'Unique Projects • Bespoke Solutions',
                desc: 'Your vision, our expertise. No project too unique, no detail too small. We make the impossible, possible.',
                accent: 'from-amber-500 to-orange-500',
                icon: '🎯'
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Floating Icon */}
                  <div className="absolute -top-6 left-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.accent} rounded-2xl flex items-center justify-center text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.accent} opacity-10 rounded-tr-3xl rounded-bl-full`}></div>
                  
                  <div className="pt-8">
                    <h3 className="text-3xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-6 text-lg">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg mb-8">
                      {service.desc}
                    </p>
                    <button className={`bg-gradient-to-r ${service.accent} text-white font-bold py-3 px-8 rounded-xl hover:scale-105 transition-transform duration-200`}>
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to Build Something <span className="text-black">Amazing?</span>
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            From Alphington to all corners of Melbourne, we bring exceptional craftsmanship directly to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="bg-black hover:bg-slate-800 text-white font-black py-6 px-12 text-xl rounded-full tracking-wider transition-all duration-300 hover:scale-105 shadow-2xl">
              GET FREE QUOTE
            </button>
            <button className="border-3 border-black text-black hover:bg-black hover:text-white font-black py-6 px-12 text-xl rounded-full tracking-wider transition-all duration-300 hover:scale-105">
              VIEW OUR WORK
            </button>
          </div>

          {/* Stats with Glass Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '25+', label: 'Years Experience', desc: 'Est. 1995' },
              { number: '1000+', label: 'Projects Completed', desc: 'Happy Clients' },
              { number: '100%', label: 'Satisfaction Rate', desc: 'Quality Guaranteed' }
            ].map((stat, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-black font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-black/80 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-900 to-black"></div>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Image 
                src="/Business Logo 1.jpg" 
                alt="JLC Logo" 
                width={60} 
                height={60}
                className="rounded-xl"
              />
              <div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  JLC CARPENTRY
                </h3>
                <p className="text-gray-400 font-semibold">& BUILDING SERVICES PTY LTD</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-12">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-blue-400">📍 LOCATION</h4>
              <p className="text-gray-300">Alphington, Melbourne</p>
              <p className="text-blue-400 font-semibold">Serving all areas of Melbourne</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-blue-400">🔗 CONNECT</h4>
              <div className="space-y-2">
                <a href="https://g.co/kgs/ZxMwn9o" className="block text-white hover:text-blue-400 transition-colors font-medium">
                  Google Business Profile
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors font-medium">
                  @Jlcbuilding
                </a>
                <a href="#" className="block text-white hover:text-blue-400 transition-colors font-medium">
                  Facebook Page
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-blue-400">⚡ SERVICES</h4>
              <p className="text-gray-300">24/7 Emergency Response</p>
              <p className="text-blue-400 font-semibold">Licensed & Fully Insured</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-4">© 2024 JLC Carpentry & Building Services Pty Ltd. All rights reserved.</p>
            <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-bold text-lg">
              ← Back to Design Selection
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}