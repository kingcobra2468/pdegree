const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/index.js',
  resolve: {
    modules: ['src', path.resolve(__dirname, 'node_modules'), 'node_modules'],
    alias: {
      '@sensors': path.resolve(__dirname, 'src', 'sensors'),
      '@publishers': path.resolve(__dirname, 'src', 'publishers'),
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['*', '.js'],
  },
  output: {
    filename: 'rpistn.js',
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv({ path: './src/.env' }),
    new ESLintPlugin({ fix: true, extensions: ['js'] }),
    new CopyPlugin({
      patterns: [
        { from: 'src/proto', to: 'proto/' }
      ]
  })
  ],
};
