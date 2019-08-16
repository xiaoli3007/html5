import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/views/dashboard/index').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/bbb',
      component: require('@/views/dashboard/bbb').default
    },
    {
      path: '/',
      component: require('@/views/layout/Layout').default,
      children: [{
        path: 'aaa',
        component: require('@/views/dashboard/aaa').default,
        name: 'member'
      }]
    }
  ]
})
