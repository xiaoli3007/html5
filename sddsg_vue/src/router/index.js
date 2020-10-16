import Vue from 'vue';
import App from '../App.vue';
import Router from 'vue-router';
import Home from '../views/home/home.vue';
import Dynamic from '../views/home/dynamic.vue';
import NavigationView from '../views/home/navigationView.vue';
import About from '../views/home/about.vue';
import Ranking from '../views/home/ranking.vue';
import Classic from '../views/home/classic.vue';
import Retrieval2 from '../views/home/retrieval2.vue';
import Retrieval3 from '../views/home/retrieval3.vue';

Vue.use(Router);
// 路由数组
const routes = [
	{
		name: 'About',
		path:'/About',
		component:About
	},
	{
		name: 'LinkageList',
		path:'/NavigationView',
		component:NavigationView
	},
	{
		name: 'Dynamic',
		path:'/Dynamic',
		component:Dynamic
	},
	{
		name: 'Home',
		path:'/',
		component:Home
	},
	{
		name: 'Ranking',
		path:'/Ranking',
		component:Ranking
	},
	{
		name: 'Classic',
		path:'/Classic',
		component:Classic
	},
	{
		name: 'List',
		path:'/List',
		component:Retrieval2
	},
	{
		name: 'Show',
		path:'/Show',
		component:Retrieval3
	}
	
	
];
const router = new Router({
	routes
});
export default router;
