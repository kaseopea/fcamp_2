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
  template: './src/index.html',
  excludeChunks: ['viewer']
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
  entry: {
    app: './src/js/index.js',
    vendor: ['babel-polyfill', 'whatwg-fetch'],
    viewer: './src/js/contentViewer/index.js'
  },
  output: {
    path: OPTIONS.distPath,
    filename: '[name].js'
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
        use: 'html-loader',
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
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'json/[name].[ext]'
            }
          },
          {
            loader: 'json-loader'
          },
          {
            loader: 'webpack-remove-number-attrs-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        use: 'file-loader?name=assets/[name].[ext]&publicPath=./'
      }
    ]
  },
  plugins: [IndexPagePlugin, extractSASSPlugin, GoogleWebFontsPlugin]
};
