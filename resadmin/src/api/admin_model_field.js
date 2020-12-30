import request from '@/utils/request'

export function model_field_list(params) {
  return request({
    url: 'vue_app_modelfield_admin_api.php?act=model_field_list',
    method: 'get', 
    params
  })
}

export function model_field_edit(params) {
	return request({
		url: 'vue_app_modelfield_admin_api.php?act=model_field_edit',
		method: 'post',
		data: params,
	})
}
export function model_field_delete(params) {
  return request({
    url: 'vue_app_modelfield_admin_api.php?act=model_field_delete',
    method: 'post',
    data:params,
  })
}
