import {  post } from '@/JS/ajax.js'


export function login(params) {
	return post(
   'vue_app_common_api.php?act=login',
    params,
	true
 )
}
 

