/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        header: ['Gloria Hallelujah'],
        normal: ['Hammersmith One']
      },
      boxShadow: {
        'custom-light': '4px 8px 20px rgba(0, 0, 0, 0.4)',
        'custom-dark': '4px 12px 10px rgba(0, 0, 0, 0.4)'
      },
      textShadow: {
        // 'custom-red': '4px 12px 0px rgba(218, 30, 30, 0.5)'

      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-custom-red': {
          textShadow: `
            0 0 2px rgba(218, 30, 30, 0.8),
            0 0 4px rgba(218, 30, 30, 0.8),
            0 0 6px rgba(218, 30, 30, 0.8),
            0 0 8px rgba(218, 30, 30, 0.8)
          `,
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

