const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const  filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

module.exports = {
  entry: ["@babel/polyfill", "./src"],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: filename('js'),
  },
    resolve: {
        extensions: ['.js'],
        alias:{
          '@': path.resolve(__dirname, 'src'),
          '@core': path.resolve(__dirname, 'src/core')
        }
    },
    module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
    devtool: isDev ? "source-map" : false,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: isDev,
        hotOnly: false,
        liveReload: isDev,
        watchContentBase: true
    },

    plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: "[id].[hash].css",
    }),
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
};