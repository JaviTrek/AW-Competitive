const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: "./public/index.js",
    mode: 'development',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js"

    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        port: 3000,
        hot: "only",
        proxy: {
            '/': 'http://localhost:4000',
        },
    },
    module: {
        rules: [
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
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            }

        ]
    }


}
