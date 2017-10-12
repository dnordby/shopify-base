let webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/js/app.js",
  output: {
      path: __dirname + '/assets',
      filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /app\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
        })
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.scss.liquid'),
  ]
};
