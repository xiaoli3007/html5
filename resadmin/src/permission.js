import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'

 import { getToken} from '@/utils/auth'

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}


const whiteList = ['/login'] // 不重定向白名单
const blockList = ['Main','Model_table_list','Model_show'] // 必须加载个人信息的页面
router.beforeEach((to, from, next) => {
  NProgress.start()
 //    console.log(to,)
	// console.log(from)
	// console.log(store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
		
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
		
		 // console.log(store.getters.roles)
		 if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
		   store.dispatch('GetInfo').then(res => { // 拉取user_info
		    
			// console.log(res)
		     const roles = res.roles // note: roles must be a array! such as: ['editor','develop'] 
		     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
		       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
			   // console.log(store.getters.permission_routers)
		       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
		     })
		     
		   }).catch((err) => {
			   console.log(err)
		     store.dispatch('FedLogOut').then(() => {
		       Message.error(err)
		       next({ path: '/' })
		     })
		   })
		 } else {
			 // console.log(to.matched)
			  if (to.matched.length === 0) {
			       next({ path: '/404', replace: true}) // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
			  }else{
				  next()
				  // if (hasPermission(store.getters.roles, to.name)) {
					 //  next()
				  // } else {
						// console.log("权限不足")
					 //  next({ path: '/404', replace: true})
				  // }
			  }
			 	  
		 }
			 
       // if (blockList.indexOf(to.name) !== -1) {
       //  store.dispatch('GetInfo').then(res => { // 拉取用户信息
       //    next()
       //  }).catch((err) => {
       //    store.dispatch('FedLogOut').then(() => {
       //      Message.error(err || 'Verification failed, please login again')
       //      next({ path: '/' })
       //    })
       //  })
       // } else {
       //   next()
       // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
		console.log('zzzz')
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
