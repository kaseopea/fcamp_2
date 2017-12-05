const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const OPTIONS = {
    distPath: path.resolve(__dirname, 'dist'),
    devServerPort: 9000
};

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: OPTIONS.distPath,
        filename: 'app.js',
        publicPath: 'dist/'
    },
    devtool: "source-map",
    devServer: {
        contentBase: OPTIONS.distPath,
        port: OPTIONS.devServerPort,
        open: true
    },
    module: {
        loaders: [
            {
                test: /\.(html)$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file-loader?name=assets/[name].[ext]&publicPath=./'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};