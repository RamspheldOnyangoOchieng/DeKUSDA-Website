/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      screens:{
        xs: '412px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
    },
  },
  plugins: [],
}

