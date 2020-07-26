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

export function askbook(userid, info) {
	return request({
		url: 'vue_app_common_api.php?act=askbook',
		method: 'post',
		data: {
			userid,
			info,
		},
		// params: { username ,password}
	})
}

export function setting(userid,voicetype,autoplay_time,autoplay_repeat,shiyi_isshow) {
	return request({
		url: 'vue_app_common_api.php?act=setting',
		method: 'post',
		data: {
			userid,
			voicetype,
			autoplay_time,
			autoplay_repeat,
			shiyi_isshow
		},
		// params: { username ,password}
	})
}