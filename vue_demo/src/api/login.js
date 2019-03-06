import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/app_ionic.php?act=userverify',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/app_ionic.php?act=userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/app_ionic.php?act=logout',
    method: 'post'
  })
}
