const path = require('path')



module.exports = {
    entry: "./lib/client.js",
    output: {
        path: path.resolve('static'),
        filename: 'bundle.js'
      },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };
