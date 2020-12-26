import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Account from '../components/Account'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  routes
})
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
