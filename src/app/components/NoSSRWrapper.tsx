'use client';

import { ReactNode, useEffect, useState } from 'react';

interface NoSSRWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function NoSSRWrapper({ 
  children, 
  fallback = (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: 'var(--bg-layout-base)' }}>
      <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}: NoSSRWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting to ensure extensions have finished
    const timer = setTimeout(() => {
      setMounted(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div suppressHydrationWarning>{fallback}</div>;
  }

  return <div suppressHydrationWarning>{children}</div>;
}
