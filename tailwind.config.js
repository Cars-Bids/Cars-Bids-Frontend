/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Або 'media' залежно від вашого налаштування
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        'amulya': ["Amulya Variable"],
        'synonym': ['Synonym Variable', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
};