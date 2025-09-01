'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import ClientThemeToggle from './ClientThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Set initial scroll state
    setIsScrolled(window.scrollY > 20);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full backdrop-blur transition-all duration-200 ${
        isScrolled ? 'bg-background/90 shadow-sm' : 'bg-background/80'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl" style={{ color: 'var(--logo-primary)' }}>
          SVDev
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <Link 
            href="/" 
            className="transition-colors duration-200"
            style={{ color: 'var(--txt)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
            suppressHydrationWarning
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="transition-colors duration-200"
            style={{ color: 'var(--txt)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
            suppressHydrationWarning
          >
            About
          </Link>
          <Link 
            href="/projects" 
            className="transition-colors duration-200"
            style={{ color: 'var(--txt)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
            suppressHydrationWarning
          >
            Projects
          </Link>
          <Link 
            href="/resume" 
            className="transition-colors duration-200"
            style={{ color: 'var(--txt)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
            suppressHydrationWarning
          >
            Resume
          </Link>
          <ClientThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}