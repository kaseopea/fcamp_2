const ENV = {
    prod: 'prod',
    dev: 'dev'
};
module.exports = process.env.NODE_ENV === ENV.prod ? require('./webpack.config.prod') : require('./webpack.config.dev');