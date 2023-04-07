const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
process.env.NODE_ENV = "development";
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    port: 3000,
    hot: "only",

    historyApiFallback: true,

    proxy: [
      {
        //here are the routes that actually go to express
        // must restart Webpack for them to work
        context: [
          "/home",
          "/createUser",
          "/map/randomMap",
          "/map/parsedMap",
          "/createNewGame",
          "/getGameState",
          "/moveUnit",
          "/registerUser",
          "/routes/auth",
          "/loginUser",
          "/protectRoute",
          "/logout",
          "/getStartGames",
          "/getCurrentGames",
          "/getGameLog",
          "/userInfo",
          "/joinGame",
          "/authenticateUser",
        ],
        target: "http://localhost:4000",
      },
    ],
  },
});
