import request from '@/utils/request'

export function model_list(params) {
  return request({
    url: 'vue_app_model_admin_api.php?act=model_list',
    method: 'get', 
    params
  })
}
export function model_tablename_isexit(params) {
	return request({
		url: 'vue_app_model_admin_api.php?act=model_tablename_isexit',
		method: 'post',
		data: params,
	})
}

export function model_edit(params) {
	return request({
		url: 'vue_app_model_admin_api.php?act=model_edit',
		method: 'post',
		data: params,
	})
}
export function model_delete(params) {
  return request({
    url: 'vue_app_model_admin_api.php?act=model_delete',
    method: 'post',
    data:params,
  })
}
