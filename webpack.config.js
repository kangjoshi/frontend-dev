const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {  // 의존 관계의 시작점
        main: './app.js'
    },
    output: {   // 번들링 결과물
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [

            /*{
                test: /\.js$/,  // 로더가 실행될 조건
                use: [
                    path.resolve('./my-webpack-loader.js')  // 정의한 로더의 절대 경로
                ]
            },*/
            {
                test: /\.css$/,
                use: [
                    'style-loader',     // 로드된 CSS를 html에 적용
                    'css-loader'        // Css를 로드
                ]
            },
            {
                test: /\.webp$/,
                loader: 'file-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "Hello 배너"
        }),
        new webpack.DefinePlugin({
            TWO: '1 + 1'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '개발용' : ''
            }
        })
    ]
}