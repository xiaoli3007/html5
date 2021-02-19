import request from '@/utils/request'

export function member_model_field_list(params) {
  return request({
    url: 'vue_app_member_modelfield_admin_api.php?act=member_model_field_list',
    method: 'get', 
    params
  })
}

export function member_model_field_edit(params) {
	return request({
		url: 'vue_app_member_modelfield_admin_api.php?act=member_model_field_edit',
		method: 'post',
		data: params,
	})
}

export function member_model_field_disabled(params) {
  return request({
    url: 'vue_app_member_modelfield_admin_api.php?act=member_model_field_disabled',
    method: 'post',
    data:params,
  })
}
export function member_model_field_linkageid_isexit(params) {
	return request({
		url: 'vue_app_member_modelfield_admin_api.php?act=member_model_field_linkageid_isexit',
		method: 'post',
		data: params,
	})
}
export function member_model_field_name_isexit(params) {
	return request({
		url: 'vue_app_member_modelfield_admin_api.php?act=member_model_field_name_isexit',
		method: 'post',
		data: params,
	})
}
export function member_model_field_delete(params) {
  return request({
    url: 'vue_app_member_modelfield_admin_api.php?act=member_model_field_delete',
    method: 'post',
    data:params,
  })
}

