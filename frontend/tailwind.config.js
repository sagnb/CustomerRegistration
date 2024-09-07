/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '128': '32rem',
        '112': '28rem'
      }
    },
  },
  plugins: [],
}

