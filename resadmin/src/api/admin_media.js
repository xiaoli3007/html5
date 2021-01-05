import request from '@/utils/request'

export function media_list(params) {
  return request({
    url: 'vue_app_media_admin_api.php?act=media_list',
    method: 'get', 
    params
  })
}

export function media_edit(params) {
	return request({
		url: 'vue_app_media_admin_api.php?act=media_edit',
		method: 'post',
		data: params,
	})
}
export function media_delete(params) {
  return request({
    url: 'vue_app_media_admin_api.php?act=media_delete',
    method: 'post',
    data:params,
  })
}
