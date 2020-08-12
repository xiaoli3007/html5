import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import layout from '../views/layout'
const routes = [
	{
		path: '/',
		component: layout,
		redirect: '/home',
		name: 'layout',
		hidden: true,
		children: [{
			path: 'home',
			name: 'Home',
			component: require('@/views/Home').default,
			meta: { title: '首页', keepAlive: false }
		},{
			path: 'list',
			name: 'List',
			component: require('@/views/List').default,
			meta: { title: '列表页', keepAlive: false }
		}]
	},
 //  {
 //    path: '/',
 //    name: 'home',
 //    // component: () => import('../views/Home.vue'),
	// component: require('@/views/Home').default,
 //    meta: { title: '首页', keepAlive: false }
 //  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { title: '其他', keepAlive: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
