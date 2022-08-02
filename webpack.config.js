const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './client/src/index.js',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-optional-chaining'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=images/[name].[ext]"},

        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
        }
    },
    output: {
        path: path.join(__dirname, 'client/dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        disableHostCheck: true,
        port: 8080,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
