import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A843',
          dark: '#B8922E',
          light: '#E8C96A',
        },
        rose: {
          accent: '#8B2252',
          light: '#C4466E',
        },
        cream: {
          DEFAULT: '#FFFBF5',
          dark: '#F5EDE0',
        },
        surface: {
          DEFAULT: '#FFF8F0',
          dark: '#F5EDE0',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#6B5E50',
          muted: '#9B8E7E',
        },
        border: '#E8DDD0',
        success: '#2D8B4E',
        error: '#C0392B',
      },
      fontFamily: {
        arabic: ['var(--font-tajawal)', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
};

export default config;
