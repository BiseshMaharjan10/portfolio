/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 35px -20px rgba(34, 211, 238, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(125deg, rgba(8, 47, 73, 0.9) 0%, rgba(12, 10, 30, 0.95) 45%, rgba(36, 12, 43, 0.9) 100%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(18px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 700ms ease-out forwards',
      },
    },
  },
  plugins: [],
}

