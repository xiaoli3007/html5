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
	// {
	// 	path: '/404',
	// 	// component: require('@/views/404').default,
	// 	component: () => import('@/views/404'),
	// 	hidden: true
	// },
	// {
	// 		path: '/refresh',
	// 		// component: require('@/components/refresh').default,
	// 		component: () => import('@/components/refresh'),
	// 		name: 'refresh',
	// 		hidden: true
	// 	},
	// {
	// 	path: '/login',
	// 	// component: require('@/views/login/index').default,
	// 	 component: () => import('@/views/login/index'),
	// 	hidden: true
	// },
	// {
	// 	path: '/',
	// 	component: Layout,
	// 	redirect: '/dashboard',
	// 	name: 'Dashboard',
	// 	 hidden: true,
	// 	children: [{
	// 		path: 'dashboard',
	// 		component: () => import('@/views/content/index'),
	
	// 	}]
	// },
	
	// {
	// 	path: '/model',
	// 	component: Layout,
	// 	redirect: '/model/model_table_list',
	// 	name: 'Model',
	// 	meta: {
	// 		title: '模型数据',
	// 		icon: 'study'
	// 	},
	// 	children: [
	
	// 		{
	// 			path: 'model_table_list',
	// 			name: 'Model_table_list',
	// 			component: () => import('@/views/content/model_table_list'),
	// 			meta: {
	// 				title: '数据列表',
	// 				icon: 'search'
	// 			},
	// 		},
		
	// 		{
	// 			path: 'model_show',
	// 			name: 'Model_show',
	// 			component: () => import('@/views/content/model_show'),
	// 			meta: {
	// 				title: '数据详细'
	// 			},
	// 			hidden: true
	// 		},
	// 		{
	// 			path: 'content_add',
	// 			name: 'Content_add',
	// 			component: () => import('@/views/content/content_add'),
	// 			meta: {
	// 				title: '资源添加'
	// 			},
	// 			hidden: true
	// 		},
		
		
	// 	]
	// },
	{
		path: '/modelfu',
		component: Layout,
		redirect: '/modelfu/mlist',
		name: 'Modelfu',
		meta: {
			title: '模型相关',
			icon: 'wendang'
		},
		children: [{
			path: 'mlist',
			name: 'MList',
			// component: require('@/views/setting/setting').default,
			component: () => import('@/views/content/model_list'),
			meta: {
				title: '模型',
				icon: 'faxian'
			},
			 
		},{
				path: 'mfieldlist',
				name: 'MfieldList',
				// component: require('@/views/setting/setting').default,
				component: () => import('@/views/content/model_field_list'),				
				hidden: true,
				meta: {
					title: '模型字段',
					icon: 'faxian'
				}
			},{
			path: 'explode',
			name: 'Explode',
			component: () => import('@/views/content/model_export'),
			meta: {
				title: '数据导入',
				icon: 'faxian'
			}
			
		},{
				path: 'export_excel',
				name: 'Export_excel',
				// component: require('@/views/setting/setting').default,
				component: () => import('@/views/content/model_export_excel'),				
				hidden: true,
				meta: {
					title: '导入文件列表',
					icon: 'faxian'
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
			icon: 'yun'
		},
		children: [
			{
				path: 'content_table_list',
				name: 'Content_table_list',
				component: () => import('@/views/content/content_table_list'),
				meta: {
					title: '数据列表',
					icon: 'search'
				},
			},
					
			{
				path: 'content_show',
				name: 'Content_show',
				component: () => import('@/views/content/content_show'),
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
		// 	{
		// 	path: 'content_media',
		// 	name: 'Content_media',
		// 	component: () => import('@/views/content/content_media_list'),
		// 	meta: {
		// 		title: '数据媒体库',
		// 		icon: 'faxian'
		// 	}
			
		// },
		{
			path: 'vamp',
			name: 'Vamp',
			component: () => import('@/views/content/vamp_list'),
			meta: {
				title: '媒体库',
				icon: 'faxian'
			}
			
		},{
			path: 'cat',
			name: 'Cat',
			// component: require('@/views/setting/setting').default,
			component: () => import('@/views/content/cat'),
			meta: {
				title: '栏目',
				icon: 'faxian'
			}
		},{
			path: 'linkage',
			name: 'Linkage',
			component: () => import('@/views/content/linkage'),
			meta: {
				title: '联动菜单',
				icon: 'faxian'
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
			icon: 'member'
		},
		children: [{
			path: 'list',
			name: 'Memberlist',
			// component: require('@/views/setting/setting').default,
			component: () => import('@/views/member/list'),
			meta: {
				title: '用户列表',
				icon: 'faxian'
			}
		},{
			path: 'membergroup',
			name: 'Membergroup',
			component: () => import('@/views/member/group'),
			meta: {
				title: '用户组',
				icon: 'faxian'
			}
			
		},{
			path: 'membermodel',
			name: 'Membermodel',
			component: () => import('@/views/member/model'),
			meta: {
				title: '用户模型',
				icon: 'faxian'
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
			icon: 'image'
		},
		children: [{
			path: 'adminlist',
			name: 'AdminList',
			// component: require('@/views/setting/setting').default,
			component: () => import('@/views/admin/adminlist'),
			meta: {
				title: '管理员列表',
				icon: 'faxian'
			}
		},{
			path: 'role',
			name: 'Role',
			component: () => import('@/views/admin/role'),
			meta: {
				title: '角色列表',
				icon: 'faxian'
			}
			
		},
		]
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
		path: '/serve',
		component: Layout,
		redirect: '/serve/site',
		name: 'Setting',
		meta: {
			title: '设置',
			icon: 'newsetting'
		},
		children: [{
			path: 'site',
			name: 'Site',
			// component: require('@/views/setting/setting').default,
			component: () => import('@/views/setting/site'),
			meta: {
				title: '站点',
				icon: 'faxian'
			}
		},{
			path: 'setting_template',
			name: 'setting_template',
			// component: require('@/views/setting/setting').default,
			component: () => import('@/views/setting/setting_template'),
			meta: {
				title: '基础设置',
				icon: 'faxian'
			},
			
		},
		]
	}, {
		path: '/setting',
		component: Layout,
		redirect: '/setting/proposal',
		name: 'setting',
		meta: {
			title: '',
			
		},
		children: [{
			path: 'proposal',
			name: 'Proposal',
			// component: require('@/views/setting/proposal').default,
			component: () => import('@/views/setting/proposal'),
			meta: {
				title: '建议',
				icon: 'edit'
			},
		}]
	},
   
  ]


export const baseRouterMap = [
    
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
		 hidden: true,
		 name: 'Dashboard',
		children: [{
			// name: 'Index',
			path: 'dashboard',
			// component: require('@/views/dashboard/index').default,
			component: () => import('@/views/content/index'),
	
		}]
	},
    // {
    //   path: '*',
    //   redirect: '/404',
    //   hidden: true
    // }
  ]


export default new Router({
	// mode: 'history', //后端支持可开 
	scrollBehavior: () => ({
		y: 0
	}),
	routes: baseRouterMap
})

