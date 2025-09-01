'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  strings: string[];
  wrapperClassName?: string;
  cursorClassName?: string;
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
}

const Typewriter = ({
  strings,
  wrapperClassName = '',
  cursorClassName = '',
  speed = 100,
  deleteSpeed = 50,
  delay = 1000,
}: TypewriterProps) => {
  const [mounted, setMounted] = useState(false);
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const currentString = strings[currentStringIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === currentString) {
      // Finished typing, wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next string
      setIsDeleting(false);
      setCurrentStringIndex((prev) => (prev + 1) % strings.length);
    } else {
      // Typing or deleting
      const shouldDelete = isDeleting;
      const typeSpeed = shouldDelete ? deleteSpeed : speed;

      timeout = setTimeout(() => {
        setCurrentText((prev) => {
          if (shouldDelete) {
            return prev.slice(0, -1);
          } else {
            return currentString.slice(0, prev.length + 1);
          }
        });
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [mounted, currentText, currentStringIndex, isDeleting, strings, speed, deleteSpeed, delay]);

  if (!mounted) {
    return (
      <span className={wrapperClassName}>
        {strings[0]}
        <span className={`${cursorClassName} animate-pulse`} style={{ color: 'var(--txt-secondary)' }}>|</span>
      </span>
    );
  }

  return (
    <span className={wrapperClassName}>
      {currentText}
      <span className={`${cursorClassName} animate-pulse`} style={{ color: 'var(--txt-secondary)' }}>|</span>
    </span>
  );
};

export default Typewriter;
