const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '.');
const sourcePath = path.join(rootPath, 'src');
const distPath = path.join(rootPath, 'dist');

module.exports = {
    mode: 'development',

    entry: './src/index.tsx',

    output: {
        path: distPath,
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                include: sourcePath,
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules', sourcePath],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
    ],
    devServer: {
        contentBase: distPath,
    },
    watchOptions: {
        ignored: [/node_modules/, distPath],
    },
    node: {
        fs: 'empty',
    },
};
