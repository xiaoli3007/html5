import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'vue_app_common_api.php?act=admin_login',
    method: 'post',
    data: {
      username,
      password
    },
		 // params: { username ,password}
  })
}
 
export function getInfo(token) {
  return request({
    url: 'vue_app_common_api.php?act=admin_userinfo',
    method: 'post',
		data: {
		  token
		},
    // params: { token }
  }) 
}

export function logout(token) {
  return request({
    url: 'vue_app_common_api.php?act=admin_logout',
    method: 'post',
		data: {
		  token
		},
		// params: { token }
  })
}
