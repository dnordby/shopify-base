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
<<<<<<< HEAD
          use: ['css-loader', 'sass-loader']
=======
          use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
>>>>>>> a7e5df2ea6b67f499d7035fd5d47bf9a05def636
        })
      },
      {
          test: /\.js$/,
<<<<<<< HEAD
          loader: 'babel-loader',

          exclude: /node_modules/
=======
          exclude: /node_modules/,
          loader: 'babel-loader'
>>>>>>> a7e5df2ea6b67f499d7035fd5d47bf9a05def636
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.scss.liquid'),
  ]
};
