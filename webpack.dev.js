const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        // host: '0.0.0.0', // Allow the server to be accessed externally (Must also open Firewall)
        host: 'localhost',
        port: 3002,
        historyApiFallback: true,
        contentBase: './dist',
        hot: true,
    }
});
