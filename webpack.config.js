const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const config = {
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
  },
  entry: {
    app: "./app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "api",
    libraryTarget: "window",
    assetModuleFilename: "[name][ext]",
  },
  devServer: {
    historyApiFallback: {
      index: "index.html",
    },
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    overlay: true,
  },
  module: {
    rules: [
      //   {
      //     test: /\.js$/,
      //     exclude: /(node_modules)/,
      //     use: [
      //       {
      //         loader: "babel-loader",
      //         options: {
      //           presets: ["@babel/preset-env"],
      //         },
      //       },
      //     ],
      //   },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.(jpg)$/,
        type: "asset/resource",
      },
    ],
  },
}

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    delete config.optimization
  }

  return config
}
