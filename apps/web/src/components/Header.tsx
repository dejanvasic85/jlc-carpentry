'use client';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`relative bg-jlc-black text-white overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-jlc-header-gradient"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

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
              <h1 className="text-sm md:text-2xl font-heading tracking-wide leading-tight">
                JLC CARPENTRY & BUILDING SERVICES
              </h1>
              <p className="text-jlc-blue-light text-xs md:text-sm font-medium">PTY LTD</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a
              href="#home"
              className="nav-link-active font-nav hover:text-white border-b-2 border-jlc-blue-light pb-1"
            >
              HOME
            </a>
            <a href="#services" className="nav-link text-white font-nav">
              SERVICES
            </a>
            <a href="#about" className="nav-link text-white font-nav">
              ABOUT
            </a>
            <a href="#contact" className="nav-link text-white font-nav">
              CONTACT
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden flex flex-col space-y-1 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 glass-dark rounded-xl px-6 py-6 space-y-4 border border-white/20">
            <a
              href="#home"
              className="nav-link-active block font-nav hover:text-white py-3 border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </a>
            <a
              href="#services"
              className="nav-link block text-white font-nav py-3 border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              SERVICES
            </a>
            <a
              href="#about"
              className="nav-link block text-white font-nav py-3 border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <a
              href="#contact"
              className="nav-link block text-white font-nav py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
