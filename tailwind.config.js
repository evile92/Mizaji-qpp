import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Cairo', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
        heading: ['Tajawal', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        slate: {
          850: '#151e2e',
          950: '#070a13',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce-subtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'rain': 'rain 0.6s linear infinite',
        'flash': 'flash 5s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        rain: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '15px 120px' },
        },
        flash: {
          '0%, 88%, 100%': { opacity: '0.05' },
          '90%': { opacity: '0.6' },
          '94%': { opacity: '0.05' },
          '96%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}
