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
        boxShadow: {
        'extra-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          'top-md': '0 -4px 6px -1px rgba(0,0,0,0.1), 0 -2px 4px -2px rgba(0,0,0,0.1)',
      },
      fontFamily: {
        'amulya': ["Amulya Variable"],
        'synonym': ['Synonym Variable', 'sans-serif'],
      },
      colors: {
        background: "var(--color-background)",
     
      },
    },
  },
  plugins: [],
};