'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import CTAButton from './CTAButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Membership', href: '/membership' },
    { name: 'Our Marketplace', href: '/marketplace' },
    { name: 'Social Impact', href: '/social-impact' },
    { name: 'Block Captain', href: '/block-captain' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Sponsorship', href: '/sponsorship' },
    { name: 'News & Events', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="relative z-30 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Atlantic City Community Cooperative"
              width={240}
              height={96}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 text-base font-medium transition-colors duration-200 relative group ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('openLoginModal'))}
              className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center"
            >
              Login
            </button>
            <CTAButton className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center justify-center">
              Join the Co-Op
            </CTAButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-cream"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-4 py-2 text-base font-medium rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-cream hover:text-primary'}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('openLoginModal'));
                }}
                className="mx-4 mt-2 border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-full font-medium text-center transition-colors inline-flex items-center justify-center"
              >
                Login
              </button>
              <CTAButton
                className="mx-4 mt-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium text-center transition-colors inline-flex items-center justify-center"
              >
                Join the Co-Op
              </CTAButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

