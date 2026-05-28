/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#09090b',
          surface: '#18181b',
          elevated: '#27272a',
        },
        border: {
          muted: '#27272a',
          strong: '#3f3f46',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          muted: '#52525b',
        },
        accent: {
          DEFAULT: '#10b981',
          hover: '#34d399',
          light: '#d1fae5',
        },
        danger: {
          DEFAULT: '#ef4444',
          hover: '#f87171',
        },
        warning: {
          DEFAULT: '#f59e0b',
        },
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
