import request from '@/utils/request'

export function feedback(userid, content) {
	return request({
		url: 'vue_app_common_api.php?act=feedback',
		method: 'post',
		data: {
			userid,
			content,
		},
		// params: { username ,password}
	})
}
export function site_list(params) {
  return request({
    url: 'vue_app_common_api.php?act=site_list',
    method: 'get', 
    params
  })
}

export function site_info(params) {
	return request({
		url: 'vue_app_common_api.php?act=site_info',
		method: 'post',
		data: params,
	})
}

 