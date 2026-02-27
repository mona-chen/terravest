/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terra-bg': '#F5F3EE',
        'terra-dark': '#1A1A1A',
        'terra-muted': '#6B6B6B',
        'terra-accent': '#8FB8A3',
      },
      fontFamily: {
        'sora': ['Sora', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
