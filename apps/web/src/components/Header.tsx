'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItemsValue: readonly NavigationItem[] = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'services', label: 'SERVICES', href: '#services' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
] as const;

const BREAKPOINTS = {
  lg: 1024, // Tailwind's lg breakpoint
} as const;

const HEADER_HEIGHT = 80 as const;
const MOBILE_OFFSET_HEIGHT = 260 as const; // Additional offset for better alignment

export default function Header({ className = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px', // Trigger when section is in the top portion of viewport
      threshold: 0.1,
    };

    const visibleSections = new Set<string>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (!sectionId || !navigationItemsValue.some((item) => item.id === sectionId)) return;

        if (entry.isIntersecting) {
          visibleSections.add(sectionId);
        } else {
          visibleSections.delete(sectionId);
        }
      });

      // Find the topmost visible section
      if (visibleSections.size > 0) {
        const sectionsOrder = ['home', 'services', 'about', 'contact'];
        const topSection = sectionsOrder.find((section) => visibleSections.has(section));

        if (topSection && topSection !== activeSection) {
          setActiveSection(topSection);
          // Update URL hash without scrolling
          window.history.replaceState(null, '', `#${topSection}`);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all navigation target sections
    navigationItemsValue.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const isMobile = window.innerWidth < BREAKPOINTS.lg;
      const headerHeight = isMobile ? HEADER_HEIGHT + MOBILE_OFFSET_HEIGHT : HEADER_HEIGHT;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', href);
    }

    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 bg-jlc-black text-white overflow-hidden ${className}`}>
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
            {navigationItemsValue.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-nav hover:text-white transition-colors ${
                  activeSection === item.id ? 'text-white border-b-2 border-jlc-blue-light pb-1' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
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
            {navigationItemsValue.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block font-nav hover:text-white py-3 transition-colors ${
                  activeSection === item.id ? 'text-white border-b-2 border-jlc-blue-light pb-1' : 'text-white'
                } ${index < navigationItemsValue.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
