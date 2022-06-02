const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        main: "calc(100vh - 196px)",
      },
      minHeight: {
        main: "calc(100vh - 196px)",
      },
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
        headline: ["Monument Extended", "sans-serif"],
        paragraph: ["Inter", "sans-serif"],
      },
      gridTemplateColumns: {
        list: "repeat(auto-fill, minmax(180px, 1fr))",
        dashboardCard: "repeat(auto-fill, minmax(240px, 1fr))",
      },
      gridTemplateRows: {
        list: "repeat(auto-fill, minmax(180px, 1fr))",
      },
    },
  },
  plugins: [],
  mode: "jit",
};
