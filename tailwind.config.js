/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF0FA',
          100: '#D6E1F5',
          200: '#ADC3EB',
          300: '#6B91D6',
          400: '#2D62BA',
          500: '#0F4794',
          600: '#0D3D80',
          700: '#0A2F63',
          800: '#082E54',
          900: '#051D38',
          950: '#03101F',
        },
        gold: {
          50: '#FEF8E7',
          100: '#FEF0CE',
          200: '#FBE09E',
          300: '#F8CE6B',
          400: '#F4B63D',
          500: '#E5A020',
          600: '#C4841A',
          700: '#8D5F13',
          800: '#5C3E0D',
          900: '#2E1F07',
        },
        burgundy: {
          50: '#FBE8EE',
          100: '#F5CDDA',
          200: '#EB9BB5',
          300: '#D35C82',
          400: '#B73360',
          500: '#9E1B46',
          600: '#83163A',
          700: '#61102B',
          800: '#400B1D',
          900: '#20060E',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Montserrat"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', '"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
