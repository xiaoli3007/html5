import request from '@/utils/request'

export function admin_list(params) {
  return request({
    url: 'vue_app_admin_api.php?act=admin_list',
    method: 'get', 
    params
  })
}

export function admin_info(params) {
	return request({
		url: 'vue_app_admin_api.php?act=admin_info',
		method: 'post',
		data: params,
	})
}
export function admin_delete(params) {
  return request({
    url: 'vue_app_admin_api.php?act=admin_delete',
    method: 'post',
    data:params,
  })
}

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

export function role_delete(params) {
  return request({
    url: 'vue_app_admin_api.php?act=role_delete',
    method: 'post',
    data:params,
  })
}

 