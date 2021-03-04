import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import HeaderFooter from './user.js'



Vue.use(ElementUI)
Vue.use(iView)
Vue.use(HeaderFooter)
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
//   router,
// }).$mount('#app')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
