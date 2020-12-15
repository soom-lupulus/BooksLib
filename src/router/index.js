import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import AccountSetting from '../components/AccountSetting'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/borrowsetting', component: AccountSetting }
]

const router = new VueRouter({
  routes
})
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
