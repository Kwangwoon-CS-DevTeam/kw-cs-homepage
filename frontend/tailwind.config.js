/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        typing: 'typing 3.5s steps(30, end), blink 1s step-end infinite',
        "card-appear": "blur-scale 1s ease-out forwards",
        'slide-up': 'slideUp 1s ease-out forwards',
        "fade-up": "fade-up 1s ease-out",
        blink: 'blink 1s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        "blur-scale": {
          "0%": {
            transform: "scale(1.05)",
            filter: "blur(10px)",
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)",
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(30px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        "fade-up": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animationDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '2000': '2000ms', // 2초 딜레이 추가
      },
    },
  },
  plugins: [],
};