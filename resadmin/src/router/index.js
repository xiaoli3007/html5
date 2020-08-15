import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Layout from '../views/layout/Layout'


export const constantRouterMap = [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
	{
		path: '/404',
		// component: require('@/views/404').default,
		component: () => import('@/views/404'),
		hidden: true
	},
	{
			path: '/refresh',
			// component: require('@/components/refresh').default,
			component: () => import('@/components/refresh'),
			name: 'refresh',
			hidden: true
		},
	{
		path: '/login',
		// component: require('@/views/login/index').default,
		 component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		name: 'Dashboard',
		 hidden: true,
		children: [{
			path: 'dashboard',
			// component: require('@/views/dashboard/index').default,
			component: () => import('@/views/dashboard/index'),
	
		}]
	},
	{
		path: '/main',
		component: Layout,
		redirect: '/main/msub',
		name: 'Main',
		meta: {
			title: '',
		},
		children: [{
				path: 'msub',
				name: 'Msub',
				// component: require('@/views/dashboard/index').default,
				component: () => import('@/views/dashboard/index'),
				meta: {
					title: '统计',
					icon: 'tongji'
				},
	
			}
		]
	},
	{
		path: '/model',
		component: Layout,
		redirect: '/model/model_table_list',
		name: 'Model',
		meta: {
			title: '模型数据',
			icon: 'study'
		},
		children: [
	
			{
				path: 'model_table_list',
				name: 'Model_table_list',
				component: () => import('@/views/content/model_table_list'),
				meta: {
					title: '模型列表',
					icon: 'tasklist'
				},
			},
		
			{
				path: 'model_show',
				name: 'Model_show',
				component: () => import('@/views/content/model_show'),
				meta: {
					title: '模型详细'
				},
				hidden: true
			},
		
		]
	},
	{
		path: '/serve',
		component: Layout,
		redirect: '/serve/setting',
		name: 'Setting',
		meta: {
			title: '设置',
			icon: 'setting'
		},
		children: [{
			path: 'setting',
			name: 'Setting',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/help/setting'),
			meta: {
				title: '站点设置',
				icon: 'setting'
			}
		},{
			path: 'setting2',
			name: 'Setting2',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/help/setting'),
			meta: {
				title: '基本设置',
				icon: 'setting'
			},
			
		},
		]
	}, {
		path: '/help',
		component: Layout,
		redirect: '/help/proposal',
		name: 'Help',
		meta: {
			title: '建议',
			icon: 'proposal'
		},
		children: [{
			path: 'proposal',
			name: 'Proposal',
			// component: require('@/views/help/proposal').default,
			component: () => import('@/views/help/proposal'),
			meta: {
				title: '建议',
				icon: 'proposal'
			},
		}]
	},
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]


export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

