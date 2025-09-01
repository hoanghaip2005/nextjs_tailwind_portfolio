'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

const DARK_LOCAL_STORAGE_KEY = 'dark';

export const ThemeContext = createContext<ThemeContextType>({
  dark: true,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dark, setDark] = useState(true); // dark by default
  const [mounted, setMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setDark((prevDark) => {
      const newTheme = !prevDark;
      localStorage.setItem(DARK_LOCAL_STORAGE_KEY, JSON.stringify(newTheme));

      // Update body classes immediately
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(newTheme ? 'dark' : 'light');

      return newTheme;
    });
  }, []);

  useEffect(() => {
    // Wait a bit to let extensions finish their initial DOM modifications
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 150);
    
    // Initialize theme from localStorage or default to dark
    const initTimer = setTimeout(() => {
      try {
        const storedTheme = localStorage.getItem(DARK_LOCAL_STORAGE_KEY);
        const localValue = storedTheme ? JSON.parse(storedTheme) : true; // default to dark

        setDark(localValue);
        
        // Ensure body has correct classes
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(localValue ? 'dark' : 'light');
        
        // Force a small delay to ensure the theme is applied before any other components render
        requestAnimationFrame(() => {
          document.body.classList.remove('dark', 'light');
          document.body.classList.add(localValue ? 'dark' : 'light');
        });
      } catch {
        // Fallback to dark theme if localStorage is corrupted
        setDark(true);
        document.body.classList.remove('dark', 'light');
        document.body.classList.add('dark');
      }
    }, 200);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(initTimer);
    };
  }, []);

  // Always render children, but provide stable theme context
  return (
    <ThemeContext.Provider value={{ dark: mounted ? dark : true, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
