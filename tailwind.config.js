/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      leagueSpartan: ["League Spartan", "sans-serif"],
    },
    extend: {
      colors: {
        darkColor1: "hsl(222, 40%, 13%)",
        lightColor1: "hsl(0, 0%, 100%)",
        blueColor1: "	hsl(211, 100%, 50%)",
      },
    },
  },
  plugins: [],
};
