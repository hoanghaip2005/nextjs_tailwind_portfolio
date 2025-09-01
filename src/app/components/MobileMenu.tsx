'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ClientThemeToggle from './ClientThemeToggle';
import { createPortal } from 'react-dom';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous || '';
      };
    }
  }, [isOpen, mounted]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        style={{ color: 'var(--txt)' }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu - Full screen overlay (via portal) */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[9999] sm:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            background: 'var(--bg-layout-base)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Header with logo and controls - Fixed position */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-10">
            <span className="font-bold text-xl" style={{ color: 'var(--logo-primary)' }}>SVDev</span>
            <div className="flex items-center gap-3">
              <ClientThemeToggle />
              <button
                onClick={closeMenu}
                className="p-2"
                aria-label="Close menu"
                style={{ color: 'var(--txt)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Perfectly Centered Navigation */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center space-y-8">
              <Link
                href="/"
                className="text-2xl font-medium transition-colors duration-200"
                style={{ color: 'var(--txt)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
                onClick={closeMenu}
                suppressHydrationWarning
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-2xl font-medium transition-colors duration-200"
                style={{ color: 'var(--txt)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
                onClick={closeMenu}
                suppressHydrationWarning
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-2xl font-medium transition-colors duration-200"
                style={{ color: 'var(--txt)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
                onClick={closeMenu}
                suppressHydrationWarning
              >
                Projects
              </Link>
              <Link
                href="/resume"
                className="text-2xl font-medium transition-colors duration-200"
                style={{ color: 'var(--txt)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
                onClick={closeMenu}
                suppressHydrationWarning
              >
                Resume
              </Link>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
