const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let bootstrapFile = new ExtractTextPlugin('bootstrap.scss.liquid');
let scssFile = new ExtractTextPlugin('style.scss.liquid');

module.exports = {
  entry: {
    app: "./src/js/app.js"
  },
  plugins: [
    bootstrapFile,
    scssFile
  ],
  module: {
    rules: [
      {
        test: /bootstrap\.scss/,
        use: bootstrapFile.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /app\.scss$/,
        use: scssFile.extract({
          use: ['raw-loader', {loader: './rawSassLoader.js'}]
        })
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      }
    ]
  },
  output: {
      path: __dirname + '/assets',
      filename: "[name].js.liquid"
  },
  stats: "minimal"
};