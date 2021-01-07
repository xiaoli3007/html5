import request from '@/utils/request'


export function linkage_list(params) {
  return request({
    url: 'vue_app_linkage_api.php?act=linkage_list',
    method: 'get', 
    params
  })
}



 