import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-layout-base)',
        foreground: 'var(--txt)',
        primary: 'var(--primary)',
        secondary: 'var(--txt-secondary)',
        'purple-600': 'var(--txt-secondary)',
        'purple-700': 'var(--txt-sec-darker)',
      },
      fontFamily: {
        sans: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
        quicksand: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
