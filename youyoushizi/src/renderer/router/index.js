import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component:  require('@/views/login/index').default, hidden: true },
  { path: '/404', component:  require('@/views/404').default, hidden: true },

  {
    path: '/',
    component: Layout,
     redirect: { name: 'Dashboard' },
    hidden: true,
    children: [{
			name: 'Dashboard',
      path: 'dashboard',
      component:  require('@/views/dashboard/index').default,
			
    }]
  }
// 	{
// 		path: '/',
// 		component: Layout,
// 			children: [{
// 			path: 'dashboard',
// 			component: require('@/views/dashboard/index'),
// 			name: 'Dashboard',
// 			hidden: true,
// 		}]
// 	}
,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '学习', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component:  require('@/views/table/index').default,
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component:  require('@/views/tree/index').default,
        meta: { title: '课程分类', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component:  require('@/views/form/index').default,
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       component: require('@/views/login/index').default
//     },
//    {
//      path: '/',
//      component: Layout,
//      // redirect: '/dashboard',
//      hidden: true,
//      children: [{
// 			 name: 'Dashboard',
//        path: 'dashboard',
//        component:  require('@/views/dashboard/index')
//      }]
//    },
// 		
//   ]
// })
