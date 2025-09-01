'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ClientWrapper({ 
  children, 
  fallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  )
}: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for extensions to finish modifying DOM
    const timer = setTimeout(() => {
      setMounted(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
