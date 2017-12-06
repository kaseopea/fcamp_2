const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GoogleFontsPlugin = require('google-fonts-webpack-plugin');
const path = require('path');

const OPTIONS = {
  distPath: path.resolve(__dirname, 'dist')
};
const DEV_SERVER_CONFIG = {
  contentBase: OPTIONS.distPath,
  port: 9000,
  open: true
  // stats: 'errors-only'
};
/* ---------------------------------- CSS EXTRACT PLUGIN  ---------------------------------- */
const extractSASSPlugin = new ExtractTextPlugin({
  filename: 'style.css'
});
/* ---------------------------------- INDEX PAGE ---------------------------------- */
const IndexPagePlugin = new HtmlWebpackPlugin({
  template: './src/index.html'
});

/* ---------------------------------- GOOGLE WEB FONTS ---------------------------------- */
const GoogleWebFontsPlugin = new GoogleFontsPlugin({
  fonts: [
    { family: 'Montserrat', variants: ['700', '900'] },
    { family: 'Roboto', variants: ['400', '700'] }
  ],
  name: 'fonts',
  filename: 'fonts.css',
  path: 'fonts/',
  formats: ['woff', 'woff2']
});

/* ---------------------------------- MAIN CONFIG ---------------------------------- */
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: OPTIONS.distPath,
    filename: 'app.js'
  },
  devtool: 'source-map',
  devServer: DEV_SERVER_CONFIG,
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: 'html-loader'
      },
      {
        test: /\.scss/,
        use: extractSASSPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components|dist)/,
        use: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: 'file-loader?name=assets/[name].[ext]&publicPath=./'
      }
    ]
  },
  plugins: [IndexPagePlugin, extractSASSPlugin, GoogleWebFontsPlugin]
};
