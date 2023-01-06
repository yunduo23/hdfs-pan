const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/api',{
        target: 'http://129.226.91.218:8807',
        pathRewrite: {
            '^/api': ''
        },
        changeOrigin: true,
        secure: false
    }));
}