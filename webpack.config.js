const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename : "bundle.js"
    },
    plugins: [new HtmlWebpackPlugin({
        title:"Todo",
        template: "./src/template.html",
    })],
}