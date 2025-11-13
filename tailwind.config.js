/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#81D4FA',
        'soft-yellow': '#FFD54F',
        'pink': '#F48FB1',
        'neon-cyan': '#00E5FF',
        'neon-pink': '#FF80AB',
      },
      fontFamily: {
        'rounded': ['Poppins', 'Fredoka', 'Nunito', 'Satoshi', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(129, 212, 250, 0.5), 0 0 10px rgba(129, 212, 250, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(129, 212, 250, 0.8), 0 0 30px rgba(129, 212, 250, 0.5)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0, transform: 'translateY(0) scale(0)' },
          '50%': { opacity: 1, transform: 'translateY(-20px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
}

