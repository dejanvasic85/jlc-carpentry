'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SiteSettings } from '@/lib/sanity/schemas';

interface HeaderProps {
  className?: string;
  siteSettings: SiteSettings;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItemsValue: readonly NavigationItem[] = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'services', label: 'SERVICES', href: '/#services' },
  { id: 'about', label: 'ABOUT', href: '/#about' },
  { id: 'contact', label: 'CONTACT', href: '/#contact' },
] as const;

const sectionsOrder = ['home', 'services', 'about', 'contact'];

const BREAKPOINTS = {
  lg: 1024, // Tailwind's lg breakpoint
} as const;

const HEADER_HEIGHT = 80 as const;
const MOBILE_OFFSET_HEIGHT = 260 as const; // Additional offset for better alignment

export default function Header({ className = '', siteSettings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

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
        const topSection = sectionsOrder.find((section) => visibleSections.has(section));
        if (topSection && topSection !== activeSection) {
          setActiveSection(topSection);
          // Update URL hash without scrolling, but only if we're on the homepage
          if (pathname === '/') {
            const newUrl = topSection === 'home' ? '/' : `/#${topSection}`;
            window.history.replaceState(null, '', newUrl);
          }
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
  }, [activeSection, pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's the home link, let Next.js handle it normally
    if (href === '/') {
      setIsMenuOpen(false);
      return;
    }

    // If we're not on the homepage, navigate to homepage first
    if (pathname !== '/') {
      setIsMenuOpen(false);
      window.location.href = href;
      return;
    }

    // Handle hash navigation on the homepage
    e.preventDefault();
    const targetId = href.replace('/#', '').replace('#', '');
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
      <div className="absolute inset-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 md:space-x-4 hover:opacity-90 transition-opacity">
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
          </Link>

          <div className="flex items-center space-x-4">
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

            {/* Phone Call Icon - visible on all screen sizes */}
            {siteSettings.contact?.phone && (
              <a
                href={`tel:${siteSettings.contact.phone}`}
                className="flex items-center justify-center w-10 h-10 hover:bg-jlc-blue-dark rounded-full transition-colors"
                aria-label="Call JLC Carpentry"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </a>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden flex flex-col space-y-1 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </button>
          </div>
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
