// import { http, get, post } from '@/JS/ajax.js'
import {  get } from '@/JS/ajax.js'

export function index_home(params) {
  return get( 
     'vue_app_phone_api.php?act=home',
      params
   )
} 

