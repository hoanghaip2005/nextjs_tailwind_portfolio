'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeContext } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { dark, toggleTheme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const iconSrc = useMemo(
    () => (dark ? '/assets/toggle-dark.svg' : '/assets/toggle-light.svg'),
    [dark],
  );

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${className}`}
        style={{ 
          background: 'var(--btn)',
          color: 'var(--btn-primary-txt)'
        }}
        disabled
      >
        <div className="w-6 h-6 bg-white/20 rounded"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="theme toggle"
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${className}`}
      style={{ 
        background: 'var(--btn)',
        color: 'var(--btn-primary-txt)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--btn-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--btn)';
      }}
      suppressHydrationWarning
    >
      <Image
        src={iconSrc}
        alt="theme toggle"
        width={24}
        height={24}
        className="w-6 h-6"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </button>
  );
}
