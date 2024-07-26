/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        text: "#0c1810",
        background: "#f4faf6",
        primary: "#FF3737",
        primary_hover: "#FF4747",
        secondary: "#FFBC42",
        secondary_hover: "#FFC965",
        accent: "#1350A1",
        accent_hover: "#3F7DCF",
      },
      fontFamily: {
        heading: ["Righteous", "sans-serif"],
        sans: ["Chakra Petch", "sans-serif"],
      },
    },
  },
  plugins: [],
};
