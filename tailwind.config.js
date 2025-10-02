/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
          // New Gaslight brand colors based on mockup
          primary: {
            DEFAULT: '#CCBB98', // Primary CTA Gold
            50: '#f5f2ed',
            100: '#ebe5d6',
            200: '#ddd2b8',
            300: '#ccbb98', // Primary CTA Gold
            400: '#c0a882',
            500: '#b5956d',
            600: '#a6835f',
            700: '#8a6d4f',
            800: '#715844',
            900: '#5d4939',
          },
          accent: {
            DEFAULT: '#C89212', // Accent Gold
            50: '#fdf6e3',
            100: '#faecc2',
            200: '#f6dd88',
            300: '#f1ca4e',
            400: '#edb825',
            500: '#dca518',
            600: '#c89212', // Accent Gold
            700: '#a47710',
            800: '#865e14',
            900: '#714f17',
          },
          gray: {
            light: '#707070', // Accent Gray
            medium: '#262626', // Light Gray
            dark: '#171717', // Dark Gray
            50: '#f9f9f9',
            100: '#efefef',
            200: '#dcdcdc',
            300: '#bdbdbd',
            400: '#989898',
            500: '#707070', // Accent Gray
            600: '#5d5d5d',
            700: '#404040',
            800: '#262626', // Light Gray
            900: '#171717', // Dark Gray
          },
          orange: {
            glow: '#FF5F00', // Glowing orange for gas lamp
          },
        },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #FF5F00, 0 0 10px #FF5F00, 0 0 15px #FF5F00',
            opacity: '1'
          },
          '100%': { 
            boxShadow: '0 0 10px #FF5F00, 0 0 20px #FF5F00, 0 0 30px #FF5F00',
            opacity: '0.7'
          },
        },
      },
    },
  },
  plugins: [],
}
