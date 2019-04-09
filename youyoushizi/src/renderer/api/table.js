import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getjiaocaiList(params) {
  return request({
    url: '/table/jiaocaiList',
    method: 'get',
    params
  })
}
