const defaultConfig = require("tailwindcss/defaultConfig")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["dist/index.html"],
  theme: {
    fontFamily: {
      script: ["Pacifico", "cursive"],
    },
    extend: {
      colors: {
        gray: colors.trueGray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
