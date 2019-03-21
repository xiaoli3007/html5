import request from '@/utils/request'

export function insertContent(data) {
  return request({
    url: '/app_ionic.php?act=feedback',
    method: 'post',
		// params
    data: {
      data
    }
  })
}
