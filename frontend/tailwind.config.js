/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blur-transp': 'rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        montserrat: ['"Montserrat"', '"sans-serif"']
      }
    },
  },
  plugins: [],
}

