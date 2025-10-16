/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // đúng
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
      },
      fontFamily: {
        heading: ["'Amatic SC'", "cursive"],
        body: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
