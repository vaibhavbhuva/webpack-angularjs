var webpack = require('webpack');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

let APP_SCRIPT  = [
    "./assets/js/jquery.js",
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./assets/js/get.js",
    "./app.js",
    "./controller/myCtrl.js",
    "./filter/filter.js",
    "./directive/directive.js",
    "./service/service.js"
];

let APP_STYLE = [
    "./assets/css/main.css",
    "./assets/css/boot.css",
    "./node_modules/bootstrap/dist/css/bootstrap.css"
];

// removing the duplicate files
APP_SCRIPT = [...new Set([...APP_SCRIPT])];

module.exports  = {
    mode : isProd ? "production" : 'development',
    entry : {
        scritps : APP_SCRIPT,
        styles : APP_STYLE
    },
    output: {
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath : '',
        pathinfo: false
    },
    optimization: {
        minimize: true,
        // minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
           chunks: 'async',
           cacheGroups: {
             vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendors',
               chunks: 'all',
             },
             styles: {
                name: 'styles',
                test: /\.assets$/,
                chunks: 'all',
                enforce: true,
              },
           }
        }
    },
    devtool: isProd ? 'source-map' : 'inline-source-map',
    module : {
        rules :[
            {
                test:/\.css$/i,
                use: [{ 
                        loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    {
                        loader:'css-loader'  
                    }],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                          limit: 8192,
                        },
                      }]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/i,
                use: ['file-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                // options: {
                //     // Disables attributes processing e.g <img src='./demo.png' />
                //     attributes: false,
                // },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].[hash].css' : '[name].bundle.css',
            chunkFilename: isProd ? '[id].[hash].css' : '[id].bundle.css'
        }),
        new webpack.ProvidePlugin({
            $: path.resolve(path.join(__dirname, 'assets/js/jquery.js')),
            jQuery: path.resolve(path.join(__dirname, 'assets/js/jquery.js')),
            "window.jQuery": path.resolve(path.join(__dirname, 'assets/js/jquery.js'))
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/assets', to : './assets',force:true
        }])
    ],
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,     
        port: 9000,
        hot: true,
        watchContentBase: true
    }
}