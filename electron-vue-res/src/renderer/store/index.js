import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import app from './modules/app'
import user from './modules/user'
import modules from './modules'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
	getters,
//   plugins: [
//     createPersistedState(),
//     createSharedMutations()
//   ],
//   strict: process.env.NODE_ENV !== 'production'
})
