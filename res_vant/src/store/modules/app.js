
const app = {
  state: {
    
	globalLoading: false
  },
  mutations: {
	 showLoading(state, status) {
	  state.globalLoading = status
	},
  },
  actions: {
    
	showLoading ({ commit }, status) {
	  commit('showLoading', status)
	}
  }
}

export default app
