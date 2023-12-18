/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@my-company/tailwind-components/**/*.js',
  ],
  theme: {
    extend: {
       boxShadow: {
        'custom-shadow': 'inset 10px -50px 94px 0 rgba(199, 199, 199, 0.2)',
      },
      backdropBlur: {
        'custom-blur': 'blur(20px)', // Adjust the value as needed
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],
}