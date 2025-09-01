'use client';

import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { FaTelegramPlane } from '@react-icons/all-files/fa/FaTelegramPlane';

export default function Footer() {
  return (
    <footer className="w-full bg-background/50">
      <div className="mx-auto max-w-6xl px-6 py-8" suppressHydrationWarning>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0" suppressHydrationWarning>
          <div className="text-center">
            <h1 className="text-lg font-medium">
              Made with ❤️ by <span style={{ color: 'var(--txt-secondary)' }}>Snaichuk Volodymyr</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-6" suppressHydrationWarning>
            <a
              href="https://github.com/vsnaichuk"
              target="_blank"
              rel="noreferrer"
              aria-label="github"
              className="transition-colors duration-200 text-xl"
              style={{ color: 'var(--social-icon)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--social-icon)'}
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.facebook.com/Snaychuk"
              target="_blank"
              rel="noreferrer"
              aria-label="facebook"
              className="transition-colors duration-200 text-xl"
              style={{ color: 'var(--social-icon)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--social-icon)'}
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://t.me/snaichuk_v"
              target="_blank"
              rel="noreferrer"
              aria-label="telegram"
              className="transition-colors duration-200 text-xl"
              style={{ color: 'var(--social-icon)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--social-icon)'}
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://www.linkedin.com/in/volodymyr-snaichuk-74a389124/"
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
              className="transition-colors duration-200 text-xl"
              style={{ color: 'var(--social-icon)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--social-icon)'}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}