const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: { // Make importing from root easier
            ["~"]: path.resolve(__dirname, "src")
        }
    },
    devServer: {
        host: '0.0.0.0', // Allow the server to be accessed externally (Must also open Firewall)
        historyApiFallback: true,
        contentBase: './dist',
        hot: true,
        open: true,
        useLocalIp: true
    }
};
