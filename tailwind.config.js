module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      handwriting: ['Mali', 'cursive']
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
