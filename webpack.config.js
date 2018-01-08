const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
let bootstrapFile = new ExtractTextPlugin('bootstrap.build');
let scssFile = new ExtractTextPlugin('style.build');

module.exports = {
  entry: {
    app: "./src/js/app.js"
  },
  plugins: [
    bootstrapFile,
    scssFile,
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/build/' + scssFile.filename,
        to: __dirname + '/assets/style.scss.liquid',
        transform: function(content, path) {
          var data = content.toString();
          returnContent = data.replace(/'{{/g, "{{");
          returnContent = returnContent.replace(/}}'/g, "}}");
          return returnContent;
        }
      },
      {
        from: __dirname + '/src/build/' + bootstrapFile.filename,
        to: __dirname + '/assets/bootstrap.scss.liquid'
      },
      {
        from: __dirname + '/src/build/app.js.liquid',
        to: __dirname + '/assets/app.js.liquid'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /bootstrap\.scss/,
        use: bootstrapFile.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /app\.scss$/,
        use: scssFile.extract({
          fallback: 'style-loader',
          use: 'css-loader'
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
      path: __dirname + '/src/build',
      filename: "[name].js.liquid"
  }
};