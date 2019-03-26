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

export function getContentList(params) {
  return request({
    url: '/app_ionic.php?act=getContentList',
    method: 'get',
    params
  })
}

export function getContentOne(params) {
  return request({
    url: '/app_ionic.php?act=getContentOne',
    method: 'get',
    params
  })
}

export function deleteContentOne(params) {
  return request({
    url: '/app_ionic.php?act=deleteContentOne',
    method: 'get',
    params
  })
}