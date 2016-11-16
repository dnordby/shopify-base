var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractSCSS = new ExtractTextPlugin('./style.css');
module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: 'assets/',
        filename: "app.js"
    },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              loader: extractSCSS.extract(['css', 'sass'])
            }
        ]
    },
    plugins: [
      extractSCSS
    ]
};
