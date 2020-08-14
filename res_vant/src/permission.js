import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const userid = store.getters.userid || null
  if (!userid && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
}) 
