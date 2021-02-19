import request from '@/utils/request'
/* 用户相关 */
export function member_list(params) {
  return request({
    url: 'vue_app_member_admin_api.php?act=member_list',
    method: 'get', 
    params
  })
}

export function member_edit(params) {
	return request({
		url: 'vue_app_member_admin_api.php?act=member_edit',
		method: 'post',
		data: params,
	})
}
export function member_delete(params) {
  return request({
    url: 'vue_app_member_admin_api.php?act=member_delete',
    method: 'post',
    data:params,
  })
}
/* 用户组相关 */
export function member_group_list(params) {
  return request({
    url: 'vue_app_member_group_admin_api.php?act=member_group_list',
    method: 'get', 
    params
  })
}

export function member_group_edit(params) {
	return request({
		url: 'vue_app_member_group_admin_api.php?act=member_group_edit',
		method: 'post',
		data: params,
	})
}
export function member_group_delete(params) {
  return request({
    url: 'vue_app_member_group_admin_api.php?act=member_group_delete',
    method: 'post',
    data:params,
  })
}

export function member_group_name_isexit(params) {
  return request({
    url: 'vue_app_member_group_admin_api.php?act=member_group_name_isexit',
    method: 'post',
    data:params,
  })
}

/* 用户模型相关 */

export function member_model_list(params) {
  return request({
    url: 'vue_app_member_admin_api.php?act=member_model_list',
    method: 'get', 
    params
  })
}

export function member_model_edit(params) {
	return request({
		url: 'vue_app_member_admin_api.php?act=member_model_edit',
		method: 'post',
		data: params,
	})
}
export function member_model_delete(params) {
  return request({
    url: 'vue_app_member_admin_api.php?act=member_model_delete',
    method: 'post',
    data:params,
  })
}

export function member_model_tablename_isexit(params) {
  return request({
    url: 'vue_app_member_admin_api.php?act=member_model_tablename_isexit',
    method: 'post',
    data:params,
  })
}
