const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    devServer: {
        historyApiFallback: true,
        contentBase: './public/home',
        hot: true,
        lazy: true,
        inline: false,
        liveReload: false,
        host: '0.0.0.0'
    },
    devtool: 'inline-source-map',
    entry: {
        home: path.join(APP_DIR, '/Entry/Home.tsx'),
    },
    mode: 'development',
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
                    transpileOnly: true
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
                        ['@babel/preset-typescript',
                        {
                            onlyRemoveTypeImports: true,
                        }]
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.css$/,
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
        new ForkTsCheckerWebpackPlugin()
    ],
};

module.exports = config;
