import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import _g from './utils/global.js'
import axios from 'axios'
import '@/permission'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://easy-mock.com/mock/5c764894f91c005a273ec7f2/vue-demo'
// axios.defaults.baseURL = 'http://vuesunapi.com/appapi'
// axios.defaults.timeout = 1000 * 15
// axios.defaults.headers['Content-Type'] = 'application/json'

// window.axios = axios

// router.beforeEach(({meta, path}, from, next) => {
//     var { auth = true } = meta
//     var isLogin = Boolean(store.state.user.username) //true用户已登录， false用户未登录
// 
//     if (auth && !isLogin && path !== '/login') {
//         return next({ path: '/login' })
//     }
//     next()
// })
window._g = _g
const bus = new Vue()
window.bus = bus
window.router = router
window.store = store
		
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
