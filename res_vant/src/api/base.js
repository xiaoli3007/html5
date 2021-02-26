import {  get ,post} from '@/utils/ajax.js'

export function index_home(params) {
  return get( 
     'vue_app_phone_api.php?act=home',
      params
   )
} 

export function getshow(params) {
  return get(
    'vue_app_content_api.php?act=detail',
    params
  )
}

export function media_detail(params) {
	return post(
   'vue_app_content_api.php?act=media_detail',
    params,
	true
 )
}

export function media_frequency(params) {
	return post(
   'vue_app_content_api.php?act=media_frequency',
    params,
	true
 )
}



export function model_data_list(params) {
	
	return get(
			 'vue_app_content_api.php?act=model_data_list',
			
			params
	) 
	// console.log('切换全局')
	// return request({
	//   url: 'vue_app_content_api.php?act=search',
	//   method: 'get',
	//   params
	// })
	
	// if(params.keywords!=''){
	// }else{
	// }
	 
}

export function get_catlist_data(params) {
  return get( 
     'vue_app_content_api.php?act=get_catlist_data',
    params
  )
}
