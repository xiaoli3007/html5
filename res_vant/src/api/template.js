import {  get } from '@/utils/ajax.js'

export function template_foot(params) {
  return get( 
     'template/nanfangkeda.php?act=foot',
      params
   )
}

export function template_home(params) {
  return get( 
     'template/nanfangkeda.php?act=home',
      params
   )
} 

export function template_category(params) {
  return get( 
    'template/nanfangkeda.php?act=category',
    params
  )
}
