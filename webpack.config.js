var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractSCSS = new ExtractTextPlugin('./style.scss.liquid');
module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: 'assets/',
        filename: "app.js"
    },
    module: {
        loaders: [
            {
              test: /app\.scss$/,
              loader: extractSCSS.extract(['css', 'autoprefixer', 'sass'])
            }
        ]
    },
    plugins: [
      extractSCSS
    ]
};
