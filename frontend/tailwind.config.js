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
        'blur-transp': 'rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        'montserrat': ['"Montserrat"', '"sans-serif"'],
        'dancing-script': ['"Dancing Script"', '"cursive"']
      },
      keyframes: {
        'swiper-kf': {
          '0%': {
            'transform': 'translateX(0%)',
          },
          '100%': {
            'transform': 'translateX(-100%)',
          }
        }
      },
      animation: {
        'swiper-variable-speed': 'swiper-kf var(--speed) linear infinite backwards',
        'swiper-30': 'swiper-kf 30s linear infinite backwards',
        'swiper-80': 'swiper-kf 80s linear infinite backwards',
        'swiper-100': 'swiper-kf 100s linear infinite backwards',
        'swiper-120': 'swiper-kf 120s linear infinite backwards',
        'swiper-150': 'swiper-kf 150s linear infinite backwards',
        'swiper-180': 'swiper-kf 180s linear infinite backwards',
      },
      boxShadow: {
        'dark-vignette': '0 0 80px 120px rgba(0,0,0,1) inset',
      }
    },
  },
  plugins: [],
}

