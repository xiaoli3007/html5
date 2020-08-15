import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken ,setName,removeName,getUserid,setUserid,removeUserid,getName,setAvatar,getAvatar} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
		userid: getUserid(),
    name: getName(),
    avatar: getAvatar(),
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
		SET_USERID: (state, userid) => {
		  state.userid = userid
		},
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
					// console.log(response)
          setToken(data.token)
					setName(data.username)
					setAvatar(data.avatar)
					setUserid(data.userid)
          commit('SET_TOKEN', data.token)
					commit('SET_NAME', data.username)
					commit('SET_USERID', data.userid)
					commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
		  setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_AVATAR', data.avatar)
					commit('SET_NAME', data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
					commit('SET_NAME', '')
					commit('SET_USERID', 0)
          removeToken()
					removeName()
					removeUserid()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
				removeName()
				commit('SET_NAME', '')
				removeUserid()
				commit('SET_USERID', 0)
        resolve()
      })
    }
  }
}

export default user
