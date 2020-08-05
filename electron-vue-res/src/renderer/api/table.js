import request from '@/utils/request'

export function getshow(params) {
  return request({
    url: 'vue_app_model_api.php?act=detail',
    method: 'get',
    params
  })
}

export function getList(params) {
  return request({
    url: 'vue_app_model_api.php?act=list',
    method: 'get',
    params
  })
}

export function getbookrecommendlist(params) {
  return request({
    url: 'vue_app_model_api.php?act=getbookrecommendlist',
    method: 'get',
    params
  })
}
export function model_data_list(params) {
  return request({
    url: 'vue_app_model_api.php?act=model_data_list',
    method: 'get',
    params
  })
}

export function get_catlist_data(params) {
  return request({
    url: 'vue_app_model_api.php?act=get_catlist_data',
    method: 'get',
    params
  })
}

export function getjiaocai_cat_List(params) {
  return request({
    url: 'vue_app_model_api.php?act=getjiaocai_cat_List',
    method: 'get',
    params
  })
}

export function ebook_recommend_search_cat(params) {
  return request({
    url: 'vue_app_model_api.php?act=ebook_recommend_search_cat',
    method: 'get', 
    params
  })
}



export function index_count(params) {
  return request({
    url: 'vue_app_common_api.php?act=index_count',
    method: 'get',
    params
  })
}

export function setting_info(params) {
  return request({
    url: 'vue_app_common_api.php?act=setting_info',
    method: 'get', 
    params
  })
}