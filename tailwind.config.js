/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'text': ['var(--font-ovo)', 'serif'],
        'title': ['var(--font-prata)', 'serif'],
        'marker': ["Permanent Marker", 'cursive'],
        'lightmarker': ["Covered By Your Grace", 'normal'],
      },
      // backgroundImage: {
      //   'paper': "url('https://transparenttextures.com/patterns/white-brushed.png')"
      // }
    },
  },
  plugins: [require("tailwindcss-animate")],
}