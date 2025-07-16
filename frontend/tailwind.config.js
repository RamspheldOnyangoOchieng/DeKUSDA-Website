/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#1e3a8a',
        lightBlue: '#bfdbfe',
        darkBlue: '#0f172a',
        softGray: '#64748b',
        white: '#ffffff',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
