import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入重置样式
import 'normalize.css'
// 引入全局样式
import './assets/global.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入mock
import './mock/index'
// 引入axios
import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://192.168.2.125:8000'
})
Vue.prototype.$http = instance
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
