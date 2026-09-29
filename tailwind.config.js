/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        veda: {
          dark: '#122A1E',
          deep: '#183B2B',
          primary: '#1F4735',
          medium: '#2D5E46',
          light: '#437C60',
          accent: '#C59A4E',
          accentLight: '#DFC087',
          gold: '#B98A38',
          cream: '#FAF6F0',
          sand: '#F2ECE1',
          cardBg: '#FFFFFF',
          muted: '#6E7A71',
          border: '#E8DFC8'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(24, 59, 43, 0.08), 0 4px 12px -2px rgba(24, 59, 43, 0.04)',
        'hero-jar': '0 25px 50px -12px rgba(20, 45, 30, 0.35)',
        'pill': '0 4px 20px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
