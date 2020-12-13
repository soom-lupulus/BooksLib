import Mock from 'mockjs'
const urls = {
  login_url: 'http://192.168.2.125:8000/login',
  login_url_error: 'http://192.168.2.125:8000/logine'
}

// 延时400s请求到数据
Mock.setup({
  timeout: 400
})

Mock.mock(urls.login_url, 'post', {
  code: 201,
  msg: '登陆成功'
})
Mock.mock(urls.login_url_error, 'post', {
  code: 302,
  msg: '用户名或密码错误'
})