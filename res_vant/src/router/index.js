import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
			// component: require('@/views/base/Home').default,
			component: () => import('@/views/base/Home'),
			meta: { title: '首页', keepAlive: false ,auth: false}
		},{
			path: 'list',
			name: 'List',
			// component: require('@/views/base/List').default,
			component: () => import('@/views/base/List'),
			meta: { title: '列表页', keepAlive: false ,auth: false}
		},{
			path: 'my',
			name: 'My',
			// component: require('@/views/base/My').default,
			component: () => import('@/views/base/My'),
			meta: { title: '我的', keepAlive: false ,auth: false},
		}]
	},{
		path: '/show',
		name: 'Show',
		// component: require('@/views/base/Show').default,
		component: () => import('@/views/base/Show'),
		meta: { title: '详细页', keepAlive: false ,auth: false}
	  },
	  {
	  	path: 'epub',
	  	name: 'Epub',
	  	component: () => import('@/views/media/EpubBook'),
	  	meta: { title: 'epub播放页', keepAlive: false ,auth: false}
	  },
	  {
		path: '/login',
		name: 'Login',
		// component: require('@/views/my/Login').default,
		component: () => import('@/views/my/Login'),
		meta: { title: '登录', keepAlive: false }
	  },
	  {
	  	path: '/user/favorite',
		name: 'Favorite',
		// component: require('@/views/user/Favorite').default,
		component: () => import('@/views/user/Favorite'),
		meta: { title: '我的收藏', keepAlive: false ,auth: true}
	   
	  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/base/About.vue'),
    meta: { title: '其他', keepAlive: false ,auth: false}
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
