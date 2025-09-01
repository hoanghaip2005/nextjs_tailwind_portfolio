'use client';

import { useEffect } from 'react';

export default function ExtensionBlocker() {
  useEffect(() => {
    // Immediate and aggressive extension blocking
    const blockExtensions = () => {
      // Block common extension methods
      if (typeof window !== 'undefined') {
        // Override common extension injection points
        const originalAppendChild = Node.prototype.appendChild;
        const originalInsertBefore = Node.prototype.insertBefore;
        const originalReplaceChild = Node.prototype.replaceChild;

        // Block extension element injection during critical period
        let blockingActive = true;
        setTimeout(() => { blockingActive = false; }, 4000);

        Node.prototype.appendChild = function<T extends Node>(newChild: T): T {
          if (blockingActive && newChild && newChild.nodeType === 1) {
            const element = newChild as unknown as Element;
            // Block elements with extension attributes
            if (element.hasAttribute && (
              element.hasAttribute('bis_skin_checked') ||
              element.hasAttribute('bis_register') ||
              element.getAttribute('class')?.includes('extension') ||
              element.getAttribute('id')?.includes('extension')
            )) {
              return newChild; // Return without actually appending
            }
          }
          return originalAppendChild.call(this, newChild) as T;
        };

        Node.prototype.insertBefore = function<T extends Node>(newChild: T, referenceChild: Node | null): T {
          if (blockingActive && newChild && newChild.nodeType === 1) {
            const element = newChild as unknown as Element;
            if (element.hasAttribute && (
              element.hasAttribute('bis_skin_checked') ||
              element.hasAttribute('bis_register')
            )) {
              return newChild; // Return without actually inserting
            }
          }
          return originalInsertBefore.call(this, newChild, referenceChild) as T;
        };

        // Restore original methods after blocking period
        setTimeout(() => {
          Node.prototype.appendChild = originalAppendChild;
          Node.prototype.insertBefore = originalInsertBefore;
          Node.prototype.replaceChild = originalReplaceChild;
        }, 4000);

        // Aggressive attribute removal loop
        const aggressiveCleanup = () => {
          try {
            document.querySelectorAll('[bis_skin_checked]').forEach(el => {
              el.removeAttribute('bis_skin_checked');
            });
            document.querySelectorAll('[bis_register]').forEach(el => {
              el.removeAttribute('bis_register');
            });
          } catch {
            // Ignore errors
          }
        };

        // Run cleanup every 100ms for the first 3 seconds
        const aggressiveInterval = setInterval(aggressiveCleanup, 100);
        setTimeout(() => clearInterval(aggressiveInterval), 3000);

        // Continue with less frequent cleanup
        const normalInterval = setInterval(aggressiveCleanup, 1000);
        setTimeout(() => clearInterval(normalInterval), 10000);
      }
    };

    blockExtensions();
  }, []);

  return null;
}
