import {  get,
	post } from '@/utils/ajax.js'

 
export function edit_member_modelinfo(params) {
  return post( 
     'vue_app_member_api.php?act=edit_member_modelinfo',
      params
   )
} 

export function get_member_model_field(params) {
  return get( 
     'vue_app_member_api.php?act=get_member_model_field',
      params
   )
} 

export function my_favorite_list(params) {
  return get( 
     'vue_app_member_api.php?act=my_favorite_list',
      params
   )
} 


export function favorite_save(params) {
  return get( 
     'vue_app_member_api.php?act=favorite_save',
      params
   )
} 

export function my_favorite_del(params) {
  return get( 
     'vue_app_member_api.php?act=my_favorite_del',
      params
   )
} 

export function my_look_list(params) {
  return get( 
     'vue_app_member_api.php?act=my_look_list',
      params
   )
} 
export function my_look_del(params) {
  return get( 
     'vue_app_member_api.php?act=my_look_del',
      params
   )
} 

export function my_frequency_list(params) {
  return get( 
     'vue_app_member_api.php?act=my_frequency_list',
      params
   )
} 
export function my_frequency_del(params) {
  return get( 
     'vue_app_member_api.php?act=my_frequency_del',
      params
   )
} 


