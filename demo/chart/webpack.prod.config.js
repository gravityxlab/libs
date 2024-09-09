const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, 'client', 'index.js'),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS 成獨立文件
          'css-loader', // 將 CSS 轉成 JavaScript 可以使用的模組
          'postcss-loader', // 使用 PostCSS 處理 CSS
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // 指定生成的 CSS 文件名稱
    }),
  ],
};