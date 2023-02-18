const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: "./public/index.js",
    mode: 'development',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js",
        publicPath: '/'

    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        port: 3000,
        hot: "only",

        historyApiFallback: true,

        proxy: [
            {
                context: ['/home', '/createUser', '/map/randomMap'],
                target:  'http://localhost:4000'
            }
        ],

    },
    module: {
        rules: [
            //Loads our JS
            {
                test: /\.js$/, //matches only things that have js at the end
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            //Loads our styling
            {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            //Loads our images
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',

            },

        ]
    }


}
