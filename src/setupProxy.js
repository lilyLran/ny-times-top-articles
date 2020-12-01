const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/svc/**',
    createProxyMiddleware({
        target: 'https://api.nytimes.com/',
        changeOrigin: true,
        secure: false
    })
  )
  app.use(
    '/images/**',
    createProxyMiddleware({
        target: 'https://www.nytimes.com/',
        changeOrigin: true,
        secure: false
    })
  )

  app.use(
    '/auth/**',
    createProxyMiddleware({
        target: 'http://localhost:8000/',
        changeOrigin: true,
        secure: false
    })
  )
      // app.use(
      //   '/search/v2',
      //   createProxyMiddleware({
      //       target: 'https://api.nytimes.com/svc/',
      //       changeOrigin: true,
      //       secure: false
      //   })
      // );
      // app.use(
      //   '/v2',
      //   createProxyMiddleware({
      //       target: 'https://api.nytimes.com/svc/topstories/',
      //       changeOrigin: true,
      //       secure: false
      //   })
      // );
      // app.use(
      //   '/v3',
      //   createProxyMiddleware({
      //       target: 'https://api.nytimes.com/svc/topstories/',
      //       changeOrigin: true,
      //       secure: false
      //   })
      // );
};
