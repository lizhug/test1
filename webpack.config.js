const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/hotcss.js','./src/main.js']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer: {
        port: 9000,
        hot: true,
        overlay: true,
        compress: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    cssModules: {
                        localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        camelCase: true
                    },
                    extractCSS: true,
                    loaders: {
                        css: ExtractTextPlugin.extract({
                                use: 'css-loader?minimize!px2rem-loader?remUnit=40&remPrecision=8',
                                fallback: 'vue-style-loader'
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: 'css-loader?minimize!px2rem-loader?remUnit=40&remPrecision=8!sass-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin('css/style.css',{ignoreOrder: true}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
