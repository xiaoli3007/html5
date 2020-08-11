import request from '@/utils/request'

export function getshow(params) {
  return request({
    url: 'vue_app_model_api.php?act=detail',
    method: 'get',
    params
  })
}

export function model_data_list(params) {
	
	if(params.keywords!=''){
		console.log('切换全局')
		return request({
		  url: 'vue_app_model_api.php?act=search',
		  method: 'get',
		  params
		})
	}else{
		return request({
				url: 'vue_app_model_api.php?act=model_data_list',
				method: 'get',
				params
		}) 
		
	}
	 
}

export function get_catlist_data(params) {
  return request({
    url: 'vue_app_model_api.php?act=get_catlist_data',
    method: 'get',
    params
  })
}

 


export function index_count(params) {
  return request({
    url: 'vue_app_pc_api.php?act=index_count',
    method: 'get',
    params
  })
}

