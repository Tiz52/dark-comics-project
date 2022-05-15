const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
      },
      colors: {
        primary: "#121212",
        secondary: "#FFFF00",
        tertiary: "#DFDFDF",
        quaternary: "#212121",
        shadow: "#535353",
      },
      fontFamily: {
        universe: ["Univers", "sans-serif"],
      },
      gridTemplateColumns: {
        list: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      gridTemplateRows: {
        list: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
  mode: "jit",
};
