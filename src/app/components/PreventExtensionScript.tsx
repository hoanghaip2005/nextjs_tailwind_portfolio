import Script from 'next/script';

export default function PreventExtensionScript() {
  return (
    <Script
      id="prevent-extension-hydration"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Prevent browser extensions from interfering with React hydration
          (function() {
            if (typeof window === 'undefined') return;
            
            let isHydrating = true;
            let hydrationComplete = false;
            
            // Mark hydration as complete after a reasonable time
            setTimeout(() => { 
              isHydrating = false; 
              hydrationComplete = true;
            }, 2000);
            
            // Override MutationObserver to prevent extensions from modifying DOM during hydration
            const OriginalMutationObserver = window.MutationObserver;
            window.MutationObserver = function(callback) {
              return new OriginalMutationObserver(function(mutations, observer) {
                if (isHydrating) {
                  // Filter out mutations that add extension attributes during hydration
                  const filteredMutations = mutations.filter(mutation => {
                    if (mutation.type === 'attributes') {
                      const attrName = mutation.attributeName;
                      const target = mutation.target;
                      
                      // Block extension attributes
                      if (attrName && (
                        attrName.includes('bis_') || 
                        attrName.includes('__processed_') ||
                        attrName.includes('_extension_')
                      )) {
                        return false;
                      }
                      
                      // Block cursor style changes that don't match expected patterns
                      if (attrName === 'style' && target.getAttribute('style')?.includes('cursor:pointer')) {
                        const element = target;
                        // Only allow cursor:pointer on actual interactive elements
                        if (!element.matches('a, button, [role="button"], [onclick], input[type="button"], input[type="submit"]')) {
                          return false;
                        }
                      }
                    }
                    return true;
                  });
                  
                  if (filteredMutations.length > 0) {
                    callback(filteredMutations, observer);
                  }
                } else {
                  callback(mutations, observer);
                }
              });
            };
            
            // More aggressive prevention of extension attributes
            const originalSetAttribute = Element.prototype.setAttribute;
            const originalCreateElement = document.createElement;
            
            // Override setAttribute to block extension attributes
            Element.prototype.setAttribute = function(name, value) {
              if (isHydrating && (
                name.includes('bis_') || 
                name.includes('__processed_') ||
                name.includes('_extension_') ||
                name.includes('lastpass') ||
                name.includes('1password') ||
                name.includes('bitwarden')
              )) {
                return; // Block extension attributes during hydration
              }
              return originalSetAttribute.call(this, name, value);
            };
            
            // Override createElement to immediately clean new elements
            document.createElement = function(tagName, options) {
              const element = originalCreateElement.call(this, tagName, options);
              
              // Clean any extension attributes that might be added immediately
              setTimeout(() => {
                if (isHydrating) {
                  const attributesToRemove = [];
                  Array.from(element.attributes || []).forEach(attr => {
                    if (attr.name.startsWith('bis_') || 
                        attr.name.startsWith('__processed_')) {
                      attributesToRemove.push(attr.name);
                    }
                  });
                  attributesToRemove.forEach(attrName => {
                    element.removeAttribute(attrName);
                  });
                }
              }, 0);
              
              return element;
            };
            
            // Restore original methods after hydration
            setTimeout(() => {
              Element.prototype.setAttribute = originalSetAttribute;
              document.createElement = originalCreateElement;
            }, 2500);
            
            // More aggressive early cleanup of extension attributes
            const earlyCleanup = () => {
              // Remove all known extension attributes
              const selectors = [
                '[bis_skin_checked]',
                '[bis_register]', 
                '[__processed_84f11d6a-644c-4b6d-84fb-893448e25421__]',
                '[data-lastpass-icon-root]',
                '[data-1password-extension]',
                '[data-bitwarden-watching]'
              ];
              
              selectors.forEach(selector => {
                try {
                  const elements = document.querySelectorAll(selector);
                  elements.forEach(element => {
                    const attrName = selector.slice(1, -1); // Remove [ and ]
                    element.removeAttribute(attrName);
                  });
                } catch (e) {
                  // Ignore errors for invalid selectors
                }
              });
              
              // Also remove any attributes starting with common extension prefixes
              const allElements = document.querySelectorAll('*');
              allElements.forEach(element => {
                Array.from(element.attributes).forEach(attr => {
                  if (attr.name.startsWith('bis_') || 
                      attr.name.startsWith('__processed_') ||
                      attr.name.startsWith('data-lastpass') ||
                      attr.name.startsWith('data-1password') ||
                      attr.name.startsWith('data-bitwarden')) {
                    element.removeAttribute(attr.name);
                  }
                });
              });
            };
            
            // Run cleanup multiple times during different phases
            const runCleanupCycle = () => {
              earlyCleanup();
              // Run again after a short delay
              setTimeout(earlyCleanup, 50);
              setTimeout(earlyCleanup, 100);
              setTimeout(earlyCleanup, 200);
            };
            
            // Run cleanup before React starts hydrating
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', runCleanupCycle);
            } else {
              runCleanupCycle();
            }
            
            // Also run cleanup when DOM changes
            const observer = new OriginalMutationObserver((mutations) => {
              let needsCleanup = false;
              mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName && 
                    (mutation.attributeName.startsWith('bis_') || 
                     mutation.attributeName.startsWith('__processed_'))) {
                  needsCleanup = true;
                }
              });
              if (needsCleanup && !isHydrating) {
                setTimeout(earlyCleanup, 10);
              }
            });
            
            observer.observe(document.documentElement, {
              attributes: true,
              subtree: true,
              attributeFilter: ['bis_skin_checked', 'bis_register']
            });
          })();
        `,
      }}
    />
  );
}
