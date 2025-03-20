/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#3B82F6', // blue-600
          dark: '#60A5FA'   // blue-400
        },
        background: {
          light: '#FFFFFF',
          dark: '#0A0A0A'   // Almost black
        },
        surface: {
          light: '#F9FAFB', // gray-50
          dark: '#141414',   // Dark gray with slight warmth
          'dark-focus': '#1A1A1A' // Lighter shade for focused sections
        },
        border: {
          light: '#E5E7EB', // gray-200
          dark: '#262626'   // Subtle dark gray
        }
      }
    },
  },
  plugins: [],
}