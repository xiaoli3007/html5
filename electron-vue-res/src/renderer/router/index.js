import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
			// {
			// 	path: 'model_thumb_list',
			// 	name: 'Model_thumb_list',
			// 	component: require('@/views/content/model_thumb_list').default,
			// 	meta: {
			// 		title: '简图模型列表',
			// 		icon: 'book'
			// 	},
			// },
			{
				path: 'model_show',
				name: 'Model_show',
				component: require('@/views/content/model_show').default,
				meta: {
					title: '模型详细'
				},
				hidden: true
			},
			// {
			//   path: 'read',
			//   name: 'Read',
			// 	hidden: true,
			//   component:  require('@/views/study/read').default,
			//   meta: { title: '任务中'}
			// },
			//       {
			//         path: 'cat',
			//         name: 'Cat',
			//         component:  require('@/views/content/cat').default,
			//         meta: { title: '分类', icon: 'tree' }
			//       }
		]
	},
	// {
	//   path: '/serve',
	//   component: Layout,
	// redirect: '/serve/help',
	// name: 'Serve',
	//   children: [
	//     {
	//       path: 'help',
	//       name: 'Help',
	//       component:  require('@/views/help/help').default,
	//       meta: { title: '帮助', icon: 'help' }
	//     }
	//   ]
	// }, 

	{
		path: '/r',
		component: Layout,
		redirect: '/r/search',
		name: 'R',
		children: [{
				path: 'search',
				name: 'Search',
				component: require('@/views/content/search').default,
				meta: {
					title: '全局搜索',
					icon: 'book'
				}, 

			}
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
