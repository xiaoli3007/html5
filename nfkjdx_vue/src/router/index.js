import Vue from 'vue';
import App from '../App.vue';
import Router from 'vue-router';
import Home from '../views/home/home.vue';
import ystc from '../views/home/ystc.vue';
import conte from '../views/home/conte.vue';
import detail from '../views/home/detail.vue';


Vue.use(Router);

// 路由数组
const routes = [
	{
		name: 'home',
		path:'/',
		component:Home
	},
	{
		name: 'Cat',
		path:'/cat',
		component:ystc
	},
	{
		name: 'List',
		path:'/list',
		component:conte
	},
	
	{
		name: 'Detail',
		path:'/detail',
		component:detail
	},	
	
];

const router = new Router({
	routes
});
export default router;
