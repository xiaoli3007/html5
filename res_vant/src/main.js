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

import '@/assets/epub/css/global.scss'
import '@/assets/epub/css/icon.css'


import '@/permission'
import HeaderFooter from './user.js'
import Text from './text.js'
Vue.use(HeaderFooter)

import globalfun from '@/utils/text.js'
Vue.use(globalfun)

// 使用 vue-meta
import Meta from "vue-meta";
Vue.use(Meta);


Vue.config.productionTip = false

Vue.prototype.$appGlobalText = Text

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
