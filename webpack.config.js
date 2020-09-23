const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/src'); 

const config = {
    entry: {
        'homeIndex': ["@babel/polyfill", path.join(APP_DIR, 'templates/homeTemplate.jsx')],
        'bikeIndex': ["@babel/polyfill", path.join(APP_DIR, 'templates/bikeTemplate.jsx')],
        'errorIndex': ["@babel/polyfill", path.join(APP_DIR, 'templates/errorTemplate.jsx')],
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
                    plugins: ['@babel/plugin-proposal-class-properties']
                },
            },
            {
                test: /\.css$/,
                use: ['css-loader'],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,  /\.svg$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(htm)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'react-svg-loader',
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    {
                      loader: 'less-loader',
                      options: {
                        javascriptEnabled: true // Less version > 3.0.0
                      }
                    }
                  ]
            }
        ],
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['homeIndex'],
            filename: 'index/Home.ejs',
            template: '!!html-loader!client/src/templates/template.ejs',
        }),
        new HtmlWebpackPlugin({
            chunks: ['bikeIndex'],
            filename: 'index/Bike.ejs',
            template: '!!html-loader!client/src/templates/template.ejs',
        }),
        new HtmlWebpackPlugin({
            chunks: ['errorIndex'],
            filename: 'index/Error.ejs',
            template: '!!html-loader!client/src/templates/template.ejs',
        }),
    ],
};
module.exports = config;
