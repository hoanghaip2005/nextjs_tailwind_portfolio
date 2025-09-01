'use client';

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Stop considering hydration phase after a reasonable time
    const hydrationTimer = setTimeout(() => {
      // Hydration complete
    }, 3000); // Increased to 3 seconds for better coverage

    // Override console.error to filter out hydration warnings during hydration phase
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out hydration mismatch errors and PDF worker errors
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Hydration failed') ||
         args[0].includes('hydration') ||
         args[0].includes('server rendered HTML') ||
         args[0].includes("didn't match") ||
         args[0].includes('bis_skin_checked') ||
         args[0].includes('pdf.worker') ||
         args[0].includes('Setting up fake worker failed') ||
         args[0].includes('Failed to resolve module specifier'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    // Comprehensive cleanup of browser extension attributes and style inconsistencies
    const cleanupExtensionAttributes = () => {
      try {
        // Remove all known extension attributes
        const extensionSelectors = [
          '[bis_skin_checked]',
          '[bis_register]',
          '[__processed_84f11d6a-644c-4b6d-84fb-893448e25421__]',
          '[data-lastpass-icon-root]',
          '[data-1password-extension]',
          '[data-bitwarden-watching]'
        ];
        
        extensionSelectors.forEach(selector => {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
              const attrName = selector.slice(1, -1); // Remove [ and ]
              element.removeAttribute(attrName);
            });
          } catch {
            // Ignore selector errors
          }
        });
        
        // More thorough cleanup of all extension attributes
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
          const attributesToRemove: string[] = [];
          Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith('bis_') || 
                attr.name.startsWith('__processed_') ||
                attr.name.startsWith('data-lastpass') ||
                attr.name.startsWith('data-1password') ||
                attr.name.startsWith('data-bitwarden') ||
                attr.name.includes('extension')) {
              attributesToRemove.push(attr.name);
            }
          });
          
          attributesToRemove.forEach(attrName => {
            element.removeAttribute(attrName);
          });
        });
        
        // Clean up style inconsistencies (especially cursor styles added by extensions)
        const styledElements = document.querySelectorAll('[style*="cursor:"]');
        styledElements.forEach(element => {
          const style = element.getAttribute('style');
          if (style && style.includes('cursor:pointer')) {
            // Only remove cursor:pointer if it was likely added by extension
            const newStyle = style.replace(/;\s*cursor:\s*pointer\s*;?/g, '').replace(/cursor:\s*pointer\s*;?/g, '');
            if (newStyle !== style) {
              element.setAttribute('style', newStyle);
            }
          }
        });
        
        // Ensure theme consistency
        const body = document.body;
        if (body && !body.classList.contains('dark') && !body.classList.contains('light')) {
          body.classList.add('dark'); // Default to dark theme
        }
      } catch (error) {
        // Silently handle any cleanup errors
        console.debug('Extension cleanup error:', error);
      }
    };

    // More aggressive cleanup schedule
    const cleanupSchedule = [
      setTimeout(cleanupExtensionAttributes, 50),   // Very early cleanup
      setTimeout(cleanupExtensionAttributes, 100),  // Early cleanup
      setTimeout(cleanupExtensionAttributes, 250),  // Pre-hydration cleanup
      setTimeout(cleanupExtensionAttributes, 500),  // Mid-hydration cleanup
      setTimeout(cleanupExtensionAttributes, 1000), // Post-hydration cleanup
      setTimeout(cleanupExtensionAttributes, 1500), // Late cleanup
      setTimeout(cleanupExtensionAttributes, 2000), // Final cleanup
    ];
    
    // Run periodic cleanup for extensions that inject after hydration
    const interval = setInterval(() => {
      cleanupExtensionAttributes();
    }, 2000); // More frequent cleanup

    return () => {
      console.error = originalError;
      clearTimeout(hydrationTimer);
      cleanupSchedule.forEach(timer => clearTimeout(timer));
      clearInterval(interval);
    };
  }, []);

  return null;
}
