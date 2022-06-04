const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./index.tmpl", "./dist/index.html", "./img/*.svg"],
  theme: {
    fontFamily: {
      script: ["Pacifico", "cursive"],
    },
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
}
