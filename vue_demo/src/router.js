import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Index from './views/Index.vue'
import About from './views/About.vue'
import Demo from './views/Demo.vue'
import Login from './views/Login.vue'
import Member from './views/Member.vue'
import Contentlist from './views/Contentlist.vue'
import Contentadd from './views/Contentadd.vue'
import Contentedit from './views/Contentedit.vue'
import refresh from './components/refresh.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'index',
			component: Index,
			meta: {
				auth: false,
				menu: 'index'
			},
		}, {
			path: '/login',
			component: Login,
			name: 'login',
			meta: {
				auth: false,
				menu: 'login'
			}
		}, {
			path: '/refresh',
			component: refresh,
			name: 'refresh'
		},
		{
			path: '/',
			component: Main,
			children: [{
					path: '/about',
					component: About,
					name: 'about',
					meta: {
						auth: false,
						menu: 'about'
					}
				}, {
					path: '/demo',
					component: Demo,
					name: 'demo',
					meta: {
						auth: false,
						menu: 'demo'
					}
				},

			]
		},
		{
			path: '/member',
			component: Main,
			children: [{
				path: '',
				component: Member,
				name: 'member',
				meta: {
					menu: 'member'
				},
				children: [{
					path: 'contentlist',
					component: Contentlist,
					name: 'contentlist',
					meta: {
						menu: 'contentlist'
					}
				}, {
					path: 'contentadd',
					component: Contentadd,
					name: 'contentadd',
					meta: {
						menu: 'contentadd'
					}
				}, {
					path: 'contentedit/:id',
					component: Contentedit,
					name: 'contentedit',
					meta: {
						menu: 'contentedit'
					}
				}]
			}]
		}
	]
})
