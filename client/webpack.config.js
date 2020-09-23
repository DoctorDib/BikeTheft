const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    devServer: {
        historyApiFallback: true,
        contentBase: './public/home',
        hot: false,
        lazy: false,
        inline: false,
        liveReload: false,
        host: '0.0.0.0'
    },
    entry: {
        home: path.join(APP_DIR, 'Entry/Home.jsx'),
        error: path.join(APP_DIR, 'Entry/Error.jsx'),
        bike: path.join(APP_DIR, 'Entry/Bike.jsx'),
    },
    mode: 'development',
    output: {
        path: BUILD_DIR,
        filename: '[name]/js/bundle.js',
    },
    resolve: {
        modules: ['node_modules', APP_DIR],
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react', '@babel/env'],
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
        new HtmlWebpackPlugin({
            chunks: ['bike'],
            filename: 'bike/index.html',
            template: '!!html-loader!src/templates/template.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['error'],
            filename: 'error/index.html',
            template: '!!html-loader!src/templates/template.html',
        }),
    ],
};

module.exports = config;
