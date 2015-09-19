var webpack = require('webpack');  
module.exports = {  
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "./public/js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    devServer: {
      hot: true,
      inline: true
    }
};