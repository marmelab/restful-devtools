/* eslint-disable no-var */
var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        backend: './src/backend/index.js',
        connector: './src/backend/connector.js',
        bridge: './src/bridge.js',
        frontend: './src/frontend/index.js',
        inject: './src/inject.js',
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                stage: 0,
            },
            test: /\.js$/,
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ].concat(production ?  [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
    ] : []),
    output: {
        path: './extension/javascripts',
        filename: production ? '[name].min.js' : '[name].js',
    },
};
