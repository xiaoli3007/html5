import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入按需引入UI库 vant
import '@/plugins/vant'

import VueVideoPlayer from 'vue-video-player'
// require videojs style
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

import Loading from './components/loading'
Vue.prototype.$loading = Loading
import audio from './lib/audio'
Vue.use(audio)

import '@/permission'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
