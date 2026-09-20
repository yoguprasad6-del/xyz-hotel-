/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#E86100',
        amberGlow: '#D97706',
        pearl: '#FFFDF9',
        charcoal: '#1F2937',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 25px 80px -30px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}

