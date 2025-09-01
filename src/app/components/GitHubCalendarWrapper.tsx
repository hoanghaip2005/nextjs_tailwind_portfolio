'use client';

import { useState, useEffect } from 'react';
import GitHubCalendar from 'react-github-calendar';

interface GitHubCalendarWrapperProps {
  username: string;
  blockSize?: number;
  blockMargin?: number;
  fontSize?: number;
}

export default function GitHubCalendarWrapper({
  username,
  blockSize = 15,
  blockMargin = 5,
  fontSize = 16,
}: GitHubCalendarWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [error] = useState<string | null>(null);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    setMounted(true);
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const theme = {
    light: ['#ebedf0', '#c084f5', '#b265f6', '#b22ff4', '#8400b8'],
    dark: ['#161b22', '#c084f5', '#b265f6', '#b22ff4', '#8400b8'],
  };

  // Responsive settings based on screen size
  const getResponsiveSettings = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          blockSize: 8,
          blockMargin: 2,
          fontSize: 12,
        };
      case 'tablet':
        return {
          blockSize: 12,
          blockMargin: 3,
          fontSize: 14,
        };
      default:
        return {
          blockSize: blockSize,
          blockMargin: blockMargin,
          fontSize: fontSize,
        };
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-foreground/60">
        <p>Unable to load GitHub activity</p>
        <p className="text-sm mt-2">Please check your connection</p>
      </div>
    );
  }

  const responsiveSettings = getResponsiveSettings();

  try {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-fit">
          <GitHubCalendar
            username={username}
            blockSize={responsiveSettings.blockSize}
            blockMargin={responsiveSettings.blockMargin}
            colorScheme="dark"
            theme={theme}
            fontSize={responsiveSettings.fontSize}
          />
        </div>
      </div>
    );
  } catch {
    return (
      <div className="text-center py-8 text-foreground/60">
        <p>GitHub activity temporarily unavailable</p>
      </div>
    );
  }
}
