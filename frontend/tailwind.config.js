/** @type {import('tailwindcss').Config} */
export default {
  // 1. Content sources add karna zaroori hai
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ye poore src folder ko scan karega
  ],
  theme: {
    extend: {
      // 2. Splash Screen ke liye custom animation
      keyframes: {
        'nexus-loader': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'nexus-loader': 'nexus-loader 2s infinite linear',
        'fade-in': 'fade-in 0.5s ease-out forwards'
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Agar aapne installation ki hai toh
  ],
}
