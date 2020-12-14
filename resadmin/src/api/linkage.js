import request from '@/utils/request'


export function linkage_list(params) {
  return request({
    url: 'vue_app_linkage_api.php?act=linkage_list',
    method: 'get', 
    params
  })
}

export function linkage_edit(params) {
	return request({
		url: 'vue_app_linkage_api.php?act=linkage_edit',
		method: 'post',
		data: params,
	})
}

export function linkage_info(params) {
	return request({
		url: 'vue_app_linkage_api.php?act=linkage_info',
		method: 'post',
		data: params,
	})
}

export function linkage_delete(params) {
  return request({
    url: 'vue_app_linkage_api.php?act=linkage_delete',
    method: 'post',
    data:params,
  })
}

 