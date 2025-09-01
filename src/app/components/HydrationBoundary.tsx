'use client';

import { ReactNode, useEffect, useState } from 'react';

interface HydrationBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function HydrationBoundary({ 
  children, 
  fallback = <div className="animate-pulse">Loading...</div> 
}: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure extensions have finished modifying the DOM
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <div suppressHydrationWarning>{children}</div>;
}
