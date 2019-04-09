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
    redirect: '/dashboard',
		name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component:  require('@/views/dashboard/index').default,
			
    }]
  },
  {
    path: '/study',
    component: Layout,
    redirect: '/study/jiaocai',
    name: 'Study',
    meta: { title: '学习', icon: 'study' },
    children: [
			 {
			  path: 'task',
			  name: 'Task',
			  component:  require('@/views/study/list/task').default,
			  meta: { title: '历史任务', icon: 'tasklist' }
			},
      {
        path: 'jiaocai',
        name: 'Jiaocai',
        component:  require('@/views/study/list/jiaocai').default,
        meta: { title: '教材', icon: 'jiaocai' }
      },
			{
			  path: 'book',
			  name: 'Book',
			  component:  require('@/views/study/list/book').default,
			  meta: { title: '课外读物', icon: 'book' }
			},
//       {
//         path: 'cat',
//         name: 'Cat',
//         component:  require('@/views/study/list/cat').default,
//         meta: { title: '分类', icon: 'tree' }
//       }
    ]
  },
  {
    path: '/serve',
    component: Layout,
		redirect: '/serve/help',
		name: 'Serve',
    children: [
      {
        path: 'help',
        name: 'Help',
        component:  require('@/views/help/help').default,
        meta: { title: '帮助', icon: 'help' }
      }
    ]
  }, {
    path: '/serve',
    component: Layout,
		redirect: '/serve/proposal',
		name: 'Serve',
    children: [
       {
        path: 'proposal',
        name: 'Proposal',
        component:  require('@/views/help/proposal').default,
        meta: { title: '建议', icon: 'proposal' }
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
