module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "tendo-bg": "rgb(21, 24, 30)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
