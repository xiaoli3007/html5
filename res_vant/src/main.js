import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入按需引入UI库 vant
import '@/plugins/vant'

import Loading from './components/loading'
Vue.prototype.$loading = Loading

import '@/permission'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
