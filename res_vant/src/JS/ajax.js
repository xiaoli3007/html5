import axios from 'axios'
// import vm from '../main'
import Loading from '../components/loading'
import { baseApi } from '../config'
import qs from 'qs'
/* 全局默认配置 */
var http = axios.create({
  baseURL: baseApi,
  timeout: 5000,
  transformRequest: [function(data) {
  	// 对 data 进行任意转换处理
  	return qs.stringify(data);
  }],
})
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* 请求拦截器 */
http.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // config.headers.timestamp = Math.floor(new Date().getTime() / 1000)
    // config.headers.token = sessionStorage.getItem('token') || ''
    // 接口没返回时显示loadin
    if (config.loading === true) {
      Loading.hide()
      Loading.show()
    }
	console.log(config)
    return config
  },
  error => {
    Loading.hide()
    return Promise.reject(error)
  }
)
/* 响应拦截器 */
http.interceptors.response.use(
  res => {
    Loading.hide()
    return res
  },
  error => {
    Loading.hide()
    return Promise.reject(error)
  }
)

function get (url, data, loading) {
	  // console.log({data,loading})
  return new Promise((resolve, reject) => {
    http.get(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
      .catch(error => {
        reject(error)
      })
  })
}

function post (url, data, loading) {
  return new Promise((resolve, reject) => {
    http.post(url, data, { loading: loading }).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
      .catch(error => {
        reject(error)
      })
  })
}

export { http, get, post }
