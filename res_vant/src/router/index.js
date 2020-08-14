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
			component: require('@/views/base/Home').default,
			meta: { title: '首页', keepAlive: false }
		},{
			path: 'list',
			name: 'List',
			component: require('@/views/base/List').default,
			meta: { title: '列表页', keepAlive: false }
		},{
			path: 'my',
			name: 'My',
			component: require('@/views/base/My').default,
			meta: { title: '我的', keepAlive: false },
		}]
	},{
		path: '/show',
		name: 'Show',
		component: require('@/views/base/Show').default,
		meta: { title: '详细页', keepAlive: false }
	  },
	  {
		path: '/login',
		name: 'Login',
		component: require('@/views/my/Login').default,
		meta: { title: '登录', keepAlive: false }
	  },
	  {
	  	path: '/user/favorite',
		name: 'Favorite',
		component: require('@/views/user/Favorite').default,
		meta: { title: '我的收藏', keepAlive: false }
	   
	  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/base/About.vue'),
    meta: { title: '其他', keepAlive: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
