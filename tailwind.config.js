/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        dark: '#0a0e27',
        darker: '#050812',
      }
    },
  },
  plugins: [],
}
