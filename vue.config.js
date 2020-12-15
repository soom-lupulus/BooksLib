module.exports = {
  // 配置代理
  devServer: {
    host: 'localhost', // 要设置当前访问的ip 否则失效
    // open: true, //浏览器自动打开页面
    proxy: {
      '/login': {
        target: 'http://192.168.2.125:8000/',
        secure: false,
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/': ''
        // }
      }
    }
  }
}
