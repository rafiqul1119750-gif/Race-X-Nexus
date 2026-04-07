/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🔵 Race-X Official Neon Palette
        neon: {
          blue: "#00e1ff",
          purple: "#a855f7",
          pink: "#ff007a",
        },
        zinc: {
          950: "#09090b", // Deep Black for Backgrounds
        }
      },
      backgroundImage: {
        // ✨ Glassmorphism & Mesh Gradients Node
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'neon-mesh': 'radial-gradient(circle at top right, rgba(0, 225, 255, 0.15), transparent)',
      },
      boxShadow: {
        // 💎 Neon Glow Effects
        'neon-blue': '0 0 20px rgba(0, 225, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
