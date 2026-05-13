/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'vt323': ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
