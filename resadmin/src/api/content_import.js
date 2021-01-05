import request from '@/utils/request'

export function content_cat_list(params) {
  return request({
    url: 'vue_app_content_import_api.php?act=content_cat_list',
    method: 'get', 
    params
  })
}

export function content_excel_list(params) {
  return request({
    url: 'vue_app_content_import_api.php?act=content_excel_list',
    method: 'get', 
    params
  })
}

export function content_excel_edit(params) {
	return request({
		url: 'vue_app_content_import_api.php?act=content_excel_edit',
		method: 'post',
		data: params,
	})
}
export function content_excel_delete(params) {
  return request({
    url: 'vue_app_content_import_api.php?act=content_excel_delete',
    method: 'post',
    data:params,
  })
}
