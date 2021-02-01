import request from '@/utils/request'

export function get_model_field(params) {
  return request({
    url: 'vue_app_content_field_admin_api.php?act=get_model_field',
    method: 'get',
    params
  })
}

export function getshow(params) {
  return request({
    url: 'vue_app_content_admin_api.php?act=detail',
    method: 'get',
    params
  })
}


export function deleteContent(params) {
  return request({
    url: '/vue_app_content_admin_api.php?act=deleteContent',
    method: 'post',
    data:params,
  })
}

export function publish_res(params) {
	return request({
		url: 'vue_app_content_admin_api.php?act=publish_res',
		method: 'post',
		data:params,
		// params: { username ,password}
	})
}

export function model_data_list(params) {
	
	if(params.keywords!=''){
		console.log('切换全局')
		return request({
		  url: 'vue_app_content_admin_api.php?act=search',
		  method: 'get',
		  params
		})
	}else{
		return request({
				url: 'vue_app_content_admin_api.php?act=model_data_list',
				method: 'get',
				params
		}) 
		
	}
	 
}

export function get_catlist_data(params) {
  return request({
    url: 'vue_app_content_admin_api.php?act=get_catlist_data',
    method: 'get',
    params
  })
}

 




