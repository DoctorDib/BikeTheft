/* eslint-disable @typescript-eslint/no-var-requires */
// This isn't typescript so we don't care
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './public/home',
        hot: true,
        lazy: false,
        inline: false,
        liveReload: false,
        host: '0.0.0.0',
    },
    devtool: 'inline-source-map',
    entry: {
        home: path.join(APP_DIR, '/Entry/Home.tsx'),
        shared: ['react', 'react-dom'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]/js/bundle.js',
    },
    resolve: {
        modules: ['node_modules', APP_DIR],
        extensions: ['.tsx', '.ts', '.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets: [
                        '@babel/react',
                        '@babel/env',
                        [
                            '@babel/preset-typescript',
                            {
                                onlyRemoveTypeImports: true,
                            },
                        ],
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
            {
                // IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['home'],
            filename: 'home/index.html',
            template: '!!html-loader!src/templates/template.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(APP_DIR, '/static/img'),
                    to: path.join(BUILD_DIR, '/static/media/[name].[hash:8].[ext]'),
                },
            ],
        }),
    ],
};

module.exports = config;
