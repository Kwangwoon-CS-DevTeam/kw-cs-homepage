/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bg-zoom-in': 'background-zoom-in 8s ease-in-out forwards',
        blink: 'blink 1s ease-in-out infinite',
      },
      keyframes: {
        'background-zoom-in': {
          '0%': { 'background-size': '100%', 'background-position': 'center' },
          '100%': { 'background-size': '120%', 'background-position': 'center' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};