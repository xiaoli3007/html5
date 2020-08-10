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

// export function askbook(userid, info) {
// 	return request({
// 		url: 'vue_app_common_api.php?act=askbook',
// 		method: 'post',
// 		data: {
// 			userid,
// 			info,
// 		},
// 		// params: { username ,password}
// 	})
// }

export function setting_info(params) {
  return request({
    url: 'vue_app_common_api.php?act=setting_info',
    method: 'get', 
    params
  })
}

export function setting(userid,voicetype) {
	return request({
		url: 'vue_app_common_api.php?act=setting',
		method: 'post',
		data: {
			userid,
			voicetype,
		},
		// params: { username ,password}
	})
}