const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devtool = process.env.NODE_ENV === 'production' ? 'sourcemap' : false;

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        popup: './src/index.js',
        options: './src/options.js',
        popupStyle: './src/index.scss',
        optionsStyle: './src/options.scss',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    devtool,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{loader: 'css-loader'}, {loader: 'sass-loader'}],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            title: 'App',
            chunks: ['popup'],
            template: './src/templates/popup.template.html',
            filename: 'popup.html',
        }),
        new HtmlWebpackPlugin({
            title: 'App - Options',
            chunks: ['options'],
            template: './src/templates/options.template.html',
            filename: 'options.html',
        }),
        new CopyWebpackPlugin([
            {from: './manifest.json'},
            {
                context: 'assets',
                from: '**/*',
            },
        ])
    ]
};