module.exports = {
  // 配置代理
  devServer: {
    host: 'localhost', // 要设置当前访问的ip 否则失效
    open: true, // 浏览器自动打开页面
    proxy: {
      '/login': {
        target: 'http://www.polimin.top:80/',
        secure: false,
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/': ''
        // }
      },
      '/account/alter': {
        target: 'http://www.polimin.top:80/',
        secure: false,
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/': ''
        // }
      },
      '/avatar/upload': {
        target: 'http://www.polimin.top:80/',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
