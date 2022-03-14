const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: "/build/",
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv()
  ],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
