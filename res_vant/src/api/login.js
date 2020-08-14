import {  post } from '@/utils/ajax.js'


export function login(params) {
	return post(
   'vue_app_common_api.php?act=login',
    params,
	true
 )
}


export function getInfo(token) {
  return post(
    'vue_app_common_api.php?act=userinfo',
    token
  ) 
}

export function logout(token) {
  return post(
    'vue_app_common_api.php?act=logout',
    token
	)
}
 

