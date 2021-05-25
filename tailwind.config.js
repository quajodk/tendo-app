module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "tendo-bg": "rgb(21, 24, 30)",
        "tendo-active": "rgb(33, 150, 243)",
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
