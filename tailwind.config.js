/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fo: {
          DEFAULT: '#00897B',
          light: '#E0F2F1',
          dark: '#00695C',
        },
        zh: {
          DEFAULT: '#6A1B9A',
          light: '#F3E5F5',
          dark: '#4A148C',
        },
        rh: {
          DEFAULT: '#F57C00',
          light: '#FFF3E0',
          dark: '#E65100',
        },
        sh: {
          DEFAULT: '#1565C0',
          light: '#E3F2FD',
          dark: '#0D47A1',
        },
      },
    },
  },
  plugins: [],
}
