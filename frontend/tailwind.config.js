// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'nexus-loader': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'nexus-loader': 'nexus-loader 1.5s infinite linear'
      }
    }
  }
}
