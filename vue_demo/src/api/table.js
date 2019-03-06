import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/app_ionic.php?act=category',
    method: 'get',
    params
  })
}
