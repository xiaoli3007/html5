import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'

// import { getToken,getUserid,getName,getAutoplay_time} from '@/utils/auth'


const whiteList = ['/login'] // 不重定向白名单
const blockList = ['Read','Review','ReadCheck'] // 必须加载个人信息的页面
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log(getAutoplay_time())
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
			// console.log(to.name)
       if (blockList.indexOf(to.name) !== -1) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
       } else {
         next()
       }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
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
