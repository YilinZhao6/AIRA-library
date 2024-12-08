/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // blue-600
          dark: '#60A5FA'   // blue-400
        },
        background: {
          light: '#FFFFFF',
          dark: '#111827'   // gray-900
        },
        surface: {
          light: '#F9FAFB', // gray-50
          dark: '#1F2937'   // gray-800
        },
        border: {
          light: '#E5E7EB', // gray-200
          dark: '#374151'   // gray-700
        }
      }
    },
  },
  plugins: [],
}