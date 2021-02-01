import request from '@/utils/request'


export function cat_list(params) {
  return request({
    url: 'vue_app_cat_admin_api.php?act=cat_list',
    method: 'get', 
    params
  })
}

export function cat_edit(params) {
	return request({
		url: 'vue_app_cat_admin_api.php?act=cat_edit',
		method: 'post',
		data: params,
	})
}

export function cat_info(params) {
	return request({
		url: 'vue_app_cat_admin_api.php?act=cat_info',
		method: 'post',
		data: params,
	})
}

export function cat_delete(params) {
  return request({
    url: 'vue_app_cat_admin_api.php?act=cat_delete',
    method: 'post',
    data:params,
  })
}

 