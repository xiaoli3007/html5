import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Index from './views/Index.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Member from './views/Member.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'index',
			component: Index,
			meta: { auth: false ,menu: 'index'},
		},{
					path: '/login',
					component: Login,
					name: 'login',
					meta: {
						auth: false ,
						menu: 'login'
					}
				},
		{
			path: '/',
			component: Main,
			children: [{
					path: '/about',
					component: About,
					name: 'about',
					meta: {
						auth: false ,
						menu: 'about'
					}
				},
				
			]
		},
		{
			path: '/member',
			component: Main,
			children: [{
					path: '/',
					component: Member,
					name: 'member',
					meta: {
						menu: 'member'
					}
				}
			]
		}
	]
})
