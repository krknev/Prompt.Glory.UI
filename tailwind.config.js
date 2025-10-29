/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← ADD THIS LINE - enables class-based dark mode
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3cec',
        'background-light': '#f7f6f8',
        'background-dark': '#171121',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      spacing: {
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    }, 
  },
  plugins: [],
}