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
			component: () => import('@/views/content/index'),
	
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
					title: '数据列表',
					icon: 'tasklist'
				},
			},
		
			{
				path: 'model_show',
				name: 'Model_show',
				component: () => import('@/views/content/model_show'),
				meta: {
					title: '数据详细'
				},
				hidden: true
			},
			{
				path: 'content_add',
				name: 'Content_add',
				component: () => import('@/views/content/content_add'),
				meta: {
					title: '资源添加'
				},
				hidden: true
			},
		
		
		]
	},
	{
		path: '/modelfu',
		component: Layout,
		redirect: '/modelfu/mlist',
		name: 'Modelfu',
		meta: {
			title: '模型相关',
			icon: 'setting'
		},
		children: [{
			path: 'mlist',
			name: 'MList',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/content/cat'),
			meta: {
				title: '模型列表',
				icon: 'setting'
			}
		},{
			path: 'explode',
			name: 'Explode',
			component: () => import('@/views/content/cat'),
			meta: {
				title: '数据导入',
				icon: 'setting'
			}
			
		},
		]
	}, 
	
 
	{
		path: '/contentfu',
		component: Layout,
		redirect: '/contentfu/cat',
		name: 'Contentfu',
		meta: {
			title: '内容相关',
			icon: 'setting'
		},
		children: [{
			path: 'cat',
			name: 'Cat',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/content/cat'),
			meta: {
				title: '栏目',
				icon: 'setting'
			}
		},{
			path: 'linkage',
			name: 'Linkage',
			component: () => import('@/views/content/cat'),
			meta: {
				title: '联动菜单',
				icon: 'setting'
			}
			
		},{
			path: 'media',
			name: 'Media',
			component: () => import('@/views/content/cat'),
			meta: {
				title: '媒体库',
				icon: 'setting'
			}
			
		},
		]
	}, 
	{
		path: '/member',
		component: Layout,
		redirect: '/member/list',
		name: 'Member',
		meta: {
			title: '用户管理',
			icon: 'setting'
		},
		children: [{
			path: 'list',
			name: 'Memberlist',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/content/cat'),
			meta: {
				title: '用户列表',
				icon: 'setting'
			}
		},{
			path: 'membergroup',
			name: 'Membergroup',
			component: () => import('@/views/content/cat'),
			meta: {
				title: '用户组',
				icon: 'setting'
			}
			
		},
		]
	}, 
	{
		path: '/admin',
		component: Layout,
		redirect: '/admin/adminlist',
		name: 'Admin',
		meta: {
			title: '管理员',
			icon: 'setting'
		},
		children: [{
			path: 'adminlist',
			name: 'AdminList',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/content/cat'),
			meta: {
				title: '管理员列表',
				icon: 'setting'
			}
		},{
			path: 'role',
			name: 'Role',
			component: () => import('@/views/content/cat'),
			meta: {
				title: '角色列表',
				icon: 'setting'
			}
			
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
				title: '站点',
				icon: 'setting'
			}
		},{
			path: 'setting_template',
			name: 'setting_template',
			// component: require('@/views/help/setting').default,
			component: () => import('@/views/help/setting_template'),
			meta: {
				title: '基础设置',
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
			title: '',
			
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

