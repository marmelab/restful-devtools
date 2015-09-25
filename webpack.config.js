/* eslint-disable no-var */
var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        devtools: './src/index.js',
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
        path: './dist',
        filename: production ? 'restful-devtools.min.js' : 'restful-devtools.js',
        library: 'restfulDevtools',
        libraryTarget: 'umd',
    },
};
