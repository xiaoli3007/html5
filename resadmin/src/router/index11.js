import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Layout from '../views/layout/Layout'

export const constantRouterMap = [{
		path: '/refresh',
		component: require('@/components/refresh').default,
		name: 'refresh',
		hidden: true
	},

	{
		path: '/login',
		component: require('@/views/login/index').default,
		hidden: true
	},
	{
		path: '/404',
		component: require('@/views/404').default,
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
			component: require('@/views/dashboard/index').default,

		}]
	},
	{
		path: '/main',
		component: Layout,
		redirect: '/main/msub',
		name: 'Main',
		children: [{
				path: 'msub',
				name: 'Msub',
				component: require('@/views/dashboard/index').default,
				meta: {
					title: '主页',
					icon: 'zhuye'
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
				component: require('@/views/content/model_table_list').default,
				meta: {
					title: '模型列表',
					icon: 'tasklist'
				},
			},
		
			{
				path: 'model_show',
				name: 'Model_show',
				component: require('@/views/content/model_show').default,
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
		children: [{
			path: 'setting',
			name: 'Setting',
			component: require('@/views/help/setting').default,
			meta: {
				title: '设置',
				icon: 'setting'
			}
		}]
	}, {
		path: '/serve',
		component: Layout,
		redirect: '/serve/proposal',
		name: 'Serve',
		children: [{
			path: 'proposal',
			name: 'Proposal',
			component: require('@/views/help/proposal').default,
			meta: {
				title: '建议',
				icon: 'proposal'
			}
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
