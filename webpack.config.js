const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let bootstrapFile = new ExtractTextPlugin('bootstrap.scss.liquid');
let scssFile = new ExtractTextPlugin('style.scss.liquid');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: "./js/app.js"
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
          use: [{loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /app\.scss$/,
        use: scssFile.extract({
          use: ['raw-loader', {loader: path.resolve(__dirname, 'rawSassLoader.js')}]
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