/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        pingin: {
          '0%, 50%': { transform: 'scale(1.6)', opacity: 0 },
          '75%': { transform: 'scale(1.2)', opacity: 0.3 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideleft:{
          '0%, 30%': { transform: 'translateX(100%)', opacity: 0.5 },
          '100%': { transform: 'translateX(0%)', opacity: 0.8 },
        },
        slideright:{
          '0%, 10%': { transform: 'translateX(0%)', opacity: 0.8 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        }
      },
      animation: {
        pingin: 'pingin .4s cubic-bezier(0, 0, 0.2, 1)',
        slideleft: 'slideleft .4s cubic-bezier(0, 0, 0.2, 1)',
        slideright: 'slideright 1s cubic-bezier(0, 0, 0.2, 1)',
      },
      boxShadow:{
        hanging: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'
      }
    },
  },
  plugins: [],
}
