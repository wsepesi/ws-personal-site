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
        'text': ["Ovo", 'serif'],
        'title': ["Prata", 'serif']
      },
      // backgroundImage: {
      //   'paper': "url('https://transparenttextures.com/patterns/white-brushed.png')"
      // }
    },
  },
  plugins: [require("tailwindcss-animate")],
}