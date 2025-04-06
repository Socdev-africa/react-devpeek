/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'devpeek-primary': '#3b82f6',
        'devpeek-secondary': '#1e40af',
        'devpeek-accent': '#60a5fa',
        'devpeek-dark': '#1f2937',
        'devpeek-light': '#f9fafb',
      },
      boxShadow: {
        'devpeek': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      zIndex: {
        'devpeek': '9999',
      }
    },
  },
  plugins: [],
}