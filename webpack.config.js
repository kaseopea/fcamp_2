const CONFIGS = {
    dev: './webpack.config.dev',
    prod: './webpack.config.prod'
};
module.exports =  require((process.env.NODE_ENV === 'prod') ? CONFIGS.dev: CONFIGS.prod);
