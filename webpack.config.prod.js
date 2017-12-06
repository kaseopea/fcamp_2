const webpack = require('webpack');
const config = require('./webpack.config.common');

config.plugins.push(new webpack.DefinePlugin({ DEBUG: false }));

module.exports = config;
