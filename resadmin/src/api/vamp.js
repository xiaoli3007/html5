import request from '@/utils/request'

export function vamp_list(params) {
  return request({
    url: 'vue_app_vamp_admin_api.php?act=vamp_list',
    method: 'get', 
    params
  })
}
export function vamp_insert(params) {
	return request({
		url: 'vue_app_vamp_admin_api.php?act=vamp_insert',
		method: 'post',
		data: params,
	})
}

export function vamp_edit(params) {
	return request({
		url: 'vue_app_vamp_admin_api.php?act=vamp_edit',
		method: 'post',
		data: params,
	})
}
export function vamp_delete(params) {
  return request({
    url: 'vue_app_vamp_admin_api?act=vamp_delete',
    method: 'post',
    data:params,
  })
}
