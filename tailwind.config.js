/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        assistant: ['Assistant', 'sans-serif'],
        'space-mono': ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
