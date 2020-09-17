import request from '@/utils/request'


export function role_list(params) {
  return request({
    url: 'vue_app_admin_api.php?act=role_list',
    method: 'get', 
    params
  })
}

export function role_info(params) {
	return request({
		url: 'vue_app_admin_api.php?act=role_info',
		method: 'post',
		data: params,
	})
}

 