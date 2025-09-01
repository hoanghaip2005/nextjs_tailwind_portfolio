'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface HydrationSafeWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function HydrationSafeWrapper({ 
  children, 
  className = '',
  style = {}
}: HydrationSafeWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Clean up any extension attributes that might have been added to this element or its children
    const cleanupElement = (element: Element) => {
      const attributesToRemove: string[] = [];
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('bis_') || 
            attr.name.startsWith('__processed_') ||
            attr.name.startsWith('data-lastpass') ||
            attr.name.startsWith('data-1password') ||
            attr.name.startsWith('data-bitwarden')) {
          attributesToRemove.push(attr.name);
        }
      });
      
      attributesToRemove.forEach(attrName => {
        element.removeAttribute(attrName);
      });
    };

    // Clean this element and all its children
    const cleanupTree = () => {
      if (wrapperRef.current) {
        cleanupElement(wrapperRef.current);
        const childElements = wrapperRef.current.querySelectorAll('*');
        childElements.forEach(cleanupElement);
      }
    };

    // Initial cleanup
    cleanupTree();

    // Set up a MutationObserver to watch for extension attributes being added
    const observer = new MutationObserver((mutations) => {
      let needsCleanup = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName &&
            (mutation.attributeName.startsWith('bis_') || 
             mutation.attributeName.startsWith('__processed_'))) {
          needsCleanup = true;
        }
      });
      
      if (needsCleanup) {
        // Small delay to avoid interfering with React's work
        setTimeout(cleanupTree, 10);
      }
    });

    observer.observe(wrapperRef.current, {
      attributes: true,
      subtree: true,
      attributeFilter: ['bis_skin_checked', 'bis_register']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className={className}
      style={style}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
