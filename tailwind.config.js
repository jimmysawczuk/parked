const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: {
    content: ["./index.tmpl", "./dist/index.html", "./img/*.svg"],
  },
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
