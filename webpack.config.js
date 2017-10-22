const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devtool = process.env.NODE_ENV === 'production' ? 'sourcemap' : false;

module.exports = {
    entry: {
        popup: './src/index.js',
        options: './src/options.js',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            chunks: ['popup'],
            template: './src/templates/index.template.html',
            filename: 'popup.html',
        }),
        new HtmlWebpackPlugin({
            title: 'App - Options',
            chunks: ['options'],
            template: './src/templates/index.template.html',
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