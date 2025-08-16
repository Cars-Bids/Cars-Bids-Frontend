/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Або 'media' залежно від вашого налаштування
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amulya': ['Amulya Variable', 'sans-serif'],
        'synonym': ['Synonym Variable', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
};