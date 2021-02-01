import request from '@/utils/request'

export function index_count(params) {
  return request({
    url: 'vue_app_count_admin_api.php?act=index_count',
    method: 'get',
    params
  })
}

 