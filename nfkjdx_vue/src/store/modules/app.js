
import {getyuzhong,setyuzhong,getglobal_fanyi_object,setglobal_fanyi_object} from '@/utils/auth'

const app = {
  state: {
	globalLoading: false,
	yuzhong: getyuzhong(),
	global_fanyi_object: getglobal_fanyi_object(),
  },
  mutations: {
	 MshowLoading(state, status) {
	  state.globalLoading = status
	},
	MshowYuzhong(state, yuzhong) {
	  state.yuzhong = yuzhong
	},
	MshowGlobal_fanyi_object(state, global_fanyi_object) {
	  state.global_fanyi_object = global_fanyi_object
	},
  },
  actions: {
    
	showLoading ({ commit }, status) {
	  commit('MshowLoading', status)
	},
	showYuzhong ({ commit }, yuzhong) {
		
		 setyuzhong(yuzhong)
	  commit('MshowYuzhong', yuzhong)
	},
	showGlobal_fanyi_object ({ commit }, global_fanyi_object) {
		 setglobal_fanyi_object(global_fanyi_object)
	  commit('MshowGlobal_fanyi_object', global_fanyi_object)
	}
  }
}

export default app
