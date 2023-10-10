/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      leagueSpartan: ["League Spartan", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        bgDesktopDark: "url('./src/assets/bgDark.jpg')",
        bgDesktopLight: "url('./src/assets/bgLight.jpg')",
      },
      colors: {
        darkColor1: "hsl(222, 40%, 13%)",
        darkColor2: "hsl(224, 40%, 20%)",
        lightColor1: "hsl(0, 0%, 100%)",
        blueColor1: "hsl(212, 98%, 50%)",
        blueColor2: "hsl(212, 98%, 60%)",
      },
    },
  },
  plugins: [],
};
