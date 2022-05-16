const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const pkg = require('./package.json')

module.exports = async () => {
  return {
    devtool: "inline-source-map",
    devServer: {
      port: 8080,
      static: { 
        directory: path.resolve(__dirname, './public'), 
        publicPath: '/public'
      }
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.join(__dirname, 'index.html'),
        title: pkg.name
      })
    ]
  }
}
