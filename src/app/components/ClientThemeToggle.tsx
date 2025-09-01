'use client';

import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => (
    <button
      className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
      style={{ 
        background: 'var(--btn)',
        color: 'var(--btn-primary-txt)'
      }}
      disabled
    >
      <div className="w-6 h-6 bg-white/20 rounded"></div>
    </button>
  ),
});

export default function ClientThemeToggle({ className = '' }: { className?: string }) {
  return <ThemeToggle className={className} />;
}
