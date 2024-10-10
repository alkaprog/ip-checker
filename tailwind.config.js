/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      white: '#FFFFFF',
      main: '#303345',
      secondary: '#6B6D80',
      bg: '#F7F9FB',
      border: '#E1E8F1',
      dark: '#070707'
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '20px'],
      lg: ['18px', '22px'],
      xl: ['24px', '32px'],
      '2xl': ['24px', '32px'],
      '3xl': ['28px', '33px'],
      '4xl': ['30px', '36px'],
      '5xl': ['40px', '48px'],
      '6xl': ['60px', '60px'],
      '7xl': ['70px', '84px'],
      '8xl': ['98px', '98px'],
    },
  },
  plugins: [],
}

