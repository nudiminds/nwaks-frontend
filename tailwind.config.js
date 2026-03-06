/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
  colors: {
    primary: "#800000",       // Marron
    secondary: "#E1AD01",     // Mustard Yellow
    accent: "#A52A2A",        // Slightly brighter maroon accent
    support: "#F3C623",       // Soft warm yellow
    background: "#F8F6F2",    // Soft off white
    charcoal: "#2B2B2B",
  },
  fontFamily: {
    heading: ['"Playfair Display"', "serif"],
    body: ['"Open Sans"', "sans-serif"],
  },
},
  },
  plugins: [],
}