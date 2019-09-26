const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Auto-generate html file
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Clean dist folder every build

module.exports = {
    entry: './src/App.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // OLD
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     use: ['babel-loader']
            // },
            {
                test: /\.(t|j)sx?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                },
                exclude: /node_modules/,
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
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        // changed from extensions: [".js", ".jsx"]
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: { // Make importing from root easier
            ["~"]: path.resolve(__dirname, "src")
        }
    },
};
