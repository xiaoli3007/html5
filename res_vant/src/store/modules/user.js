import {
	login,
	logout,
	getInfo
} from '@/api/login'
import {
	getToken,
	setToken,
	removeToken,
	getUserName,
	setUserName,
	removeUserName,
	getUserid,
	setUserid,
	removeUserid,
	setAvatar,
	getAvatar,
	removeAvatar
} from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		userid: getUserid(),
		username: getUserName(),
		avatar: getAvatar(),
		// roles: []
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USERID: (state, userid) => {
			state.userid = userid
		},
		SET_USERNAME: (state, username) => {
			state.username = username
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},

	},

	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(response => {
					const data = response
					console.log(data)
					setToken(data.token)
					setUserName(data.username)
					setAvatar(data.avatar)
					setUserid(data.userid)
					commit('SET_TOKEN', data.token)
					commit('SET_USERNAME', data.username)
					commit('SET_USERID', data.userid)
					commit('SET_AVATAR', data.avatar)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息
		GetInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getInfo({
					token: state.token
				}).then(response => {
					const data = response
					// if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
					//   commit('SET_ROLES', data.roles)
					// } else {
					//   reject('getInfo: roles must be a non-null array !')
					// }
					setToken(data.token)
					commit('SET_TOKEN', data.token)
					commit('SET_AVATAR', data.avatar)
					commit('SET_USERNAME', data.username)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout({
					token: state.token
				}).then(response => {

					const data = response
					console.log(data)
					commit('SET_TOKEN', '')
					commit('SET_AVATAR', '')
					commit('SET_USERNAME', '')
					commit('SET_USERID', 0)
					removeToken()
					removeAvatar()
					removeUserName()
					removeUserid()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				removeToken()
				commit('SET_TOKEN', '')
				removeUserName()
				commit('SET_USERNAME', '')
				removeUserid()
				commit('SET_USERID', 0)
				resolve()
			})
		}
	}
}

export default user
