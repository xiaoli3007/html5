import router from '@/router'
import store from '@/store'
const commonFn = {
  j2s(obj) {
    return JSON.stringify(obj)
  },
  shallowRefresh(name) {
    router.replace({ path: '/refresh', query: { name: name }})
  },
  closeGlobalLoading() {
    setTimeout(() => {
      store.dispatch('showLoading', false)
    }, 0)
  },
  openGlobalLoading() {
    setTimeout(() => {
      store.dispatch('showLoading', true)
    }, 0)
  },
  cloneJson(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  clearVuex(cate) {
    store.dispatch(cate, [])
  }
}

export default commonFn
