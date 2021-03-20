const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    entry: {
        "/dist/vue-charts-css.min": __dirname + "/src/index.js",
        "/example/dist/example": [__dirname + "/example/src/example.js", __dirname + "/example/src/example.scss",],
    },

    output: {
        path: path.resolve(__dirname, "./"),
        filename: "[name].js",
    },

    resolve: {
        extensions: ["*", ".js", ".vue", ".json"],

        symlinks: false,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "vue-style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].[chunkhash]",
        })
    ],
}
