<template>
	<div class="header">
		<div class="clearFlex container">
			<a class="logo" href=""><img src="../assets/logo.png" alt=""></a>
			<div class="navView" v-show="showNav" ref="menu">
				<div class="nav" :class="navIndex == index?'active':''" v-for="(item,index) in navList" :key="'menu_p'+index">
					<a class="navLine"  @click="touchNav(item.path)">{{item.name}}</a>
					<div class="muen_cv" v-if="item.mune.length > 0">
						<div class="item-mune" v-for="(muneItem,muneIndex) in item.mune"  :key="'menu_p'+muneIndex">
							<a  @click="touchNav(muneItem.path)">{{muneItem.name}}</a>
						</div>
					</div>
				</div>
			</div>
			<div class="nav_rv">
				<div class="item">
					<a class="item_ha" href="">
						<img class="u1" src="../assets/icon_user.png" alt="">
						<img class="u2" src="../assets/icon_user_hover.png" alt="">
						<img class="icon" src="../assets/icon_sj.png" alt="">
						<img class="icon2" src="../assets/icon_sj_up_hove.png" alt="">
					</a>
					<div class="userMune userMune2">
						<div class="item_um">
							<a href="">个人信息</a>
						</div>
						<div class="item_um">
							<a href="">我的收藏</a>
						</div>
						<div class="item_um">
							<a href="">历史浏览</a>
						</div>
					</div>
				</div>
				<div class="item">
					<a class="item_ha" href="">
						<span>中</span>
						<img class="icon" src="../assets/icon_sj.png" alt="">
						<img class="icon2" src="../assets/icon_sj_up_hove.png" alt="">
					</a>
					<div class="userMune">
						<div class="item_um">
							<a href="">中文</a>
						</div>
						<div class="item_um">
							<a href="">EN</a>
						</div>
					</div>
				</div>
			<!-- 	<div class="item">
					<a class="item_ha" href="">
						<img class="u1" src="../assets/icon_search.png" alt="">
						<img class="u2" src="../assets/icon_search_hover.png" alt="">
						<img class="icon" src="../assets/icon_sj.png" alt="">
						<img class="icon2" src="../assets/icon_sj_up_hove.png" alt="">
					</a>
				</div> -->
			</div>
		</div>
		<div class="menu-button"  :class="showMune?'active':''" @click="touchMune">
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
		</div>
		
	</div>
</template>

<script>
	import {
		template_head
	} from '@/api/template'
	
	export default{
		props:{
			navIndex:{
				type:Number,
				default:0,
				
			}
		},
		data(){
			return{
				navList:[
					{
						name:"首页",
						path:'/',
						mune:[]
					},
					{
						name:"数字考古",
						path:'/szkg',
						mune:[
							{
								name:'下脚山遗址陶器',
								path:"/conte"
							},
							{
								name:'赣州通天岩题壁',
								path:""
							},
							{
								name:'甲骨文',
								path:""
							}
						]
					},
					{
						name:"读者之窗",
						path:'',
						mune:[]
					},
					{
						name:"艺术特藏",
						path:'/ystc',
						mune:[
							{
								name:'绘画集锦',
								path:"/conte2"
							},
							{
								name:'书法荟萃',
								path:""
							},
							{
								name:'青铜器',
								path:""
							},
							{
								name:'青铜器',
								path:"雕塑作品"
							}
						]
					},
					{
						name:"培训视频",
						path:'',
						mune:[]
					},
					{
						name:"南科刊物",
						path:'',
						mune:[]
					},
					{
						name:"天雨流芳",
						path:'',
						mune:[]
					},
				],
				showMune:false,
				creenWidth: document.body.clientWidth,
				showNav:true
			}
		},
		created: function() {
			 
			this.fetchData()
		
		},
		methods:{
			touchMune:function(){
				this.showMune = !this.showMune
				if(this.showMune){
					this.$refs.menu.style.display = 'block'
				} else {
					this.$refs.menu.style.display = 'none'
				}
				// this.showNav = this.showMune
			},
			touchNav:function(path){
				
				console.log(path)
				this.$router.push(path)
			},
			
			fetchData() {
			
				const getparams = {
					loading: false,
					params: {
						siteid: 1
					}
				}
			
				template_head(getparams).then(response => {
					 console.log(response.items)
					 this.navList = response.items
					// console.log(this.footerhtml)
					// let global_fanyi_json = response.global_fanyi_json
					// this.$store.dispatch('showGlobal_fanyi_object', global_fanyi_json).then(() => {
					// 	//location.reload() // 
					// })
			
			
				})
			
			},
			
			
		}
	}
</script>

<style>
	.logo {float: left;}
	.logo img {width: 245px; margin-top: 20px;}
	.header {position: fixed;left: 0;top: 0;width: 100%; background-color: rgba(0,0,0,0.8); height: 80px; z-index: 999;}
	.navView {float: left; margin-left: 69px;}
	.nav {float: left; position: relative; min-width: 75px;}
	.nav .navLine {line-height: 80px; font-size: 19px; color: #fff; padding: 0 32px;}
	.navView .nav.active .navLine {color: #2BB7B3;}
	.nav_rv {float: right;}
	.nav_rv .item {float: left; display: flex; justify-content: center; align-items: center; height: 80px; padding: 0 21px; position: relative;}
	.nav_rv .item::after {display: block;content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 1px; height: 22px; background-color: rgba(255,255,255,0.75);} 
	.nav_rv .item:last-child::after {display: none;}
	.nav_rv .item .item_ha {display: block; display: flex; justify-content: center; align-items: center; color: #fff;}
	.nav_rv .item .icon {width: 8px; height: 7px; margin-left: 8px;}
	.nav_rv .item .icon2 {width: 8px; height: 7px; margin-left: 8px; display: none;}
	.nav_rv .item .u1 {display: inline-block;}
	.nav_rv .item .u2 {display: none;}
	
	.muen_cv {position: absolute; top: 100%; left: 0; width: 100%; background-color: rgba(0,0,0,0.75); display: none;}
	.nav_rv .item:hover {background-color: rgba(0,0,0,0.75);}
	.nav_rv .item:hover .icon {display: none;}
	.nav_rv .item:hover .icon2 {display: inline-block;}
	.nav_rv .item:hover .u1 {display: none;}
	.nav_rv .item:hover .u2 {display: inline-block;}
	.navView .nav:hover {background-color: rgba(0,0,0,0.75);}
	.navView .nav:hover .navLine {color: #2BB7B3;}
	.navView .nav:hover .muen_cv {display: block;}
	.muen_cv .item-mune {padding: 0 10px;}
	.muen_cv .item-mune a {height: 64px; padding: 0 16px; font-size: 19px; color: #fff; display: flex; justify-content: center; align-items: center; text-align: center; line-height: 24px; border-bottom: 1px solid rgba(255,255,255,0.5);}
	.muen_cv .item-mune:last-child a {border-bottom: none;}
	.muen_cv .item-mune:hover {background: url(../assets/nav_selected.png) left top no-repeat; background-size: auto 100%; }
	.muen_cv .item-mune:hover a {color: #2BB7B3;}
	.menu-button {display: none;}
	
	.userMune {
		position: absolute; top: 100%; left: 0; min-width: 100%; background-color: rgba(0,0,0,0.75); display: none;
	}
	.nav_rv .item:hover .userMune {display: block;}
	.userMune2 {width: 115px;}
	.userMune .item_um {padding: 0 10px;}
	.userMune .item_um a {height: 64px; font-size: 15px; color: #fff; display: flex; justify-content: center; align-items: center; text-align: center; line-height: 24px; border-bottom: 1px solid rgba(255,255,255,0.5);}
	.userMune .item_um:last-child a {border-bottom: none;}
	.userMune .item_um:hover {background: url(../assets/nav_selected.png) left top no-repeat; background-size: auto 100%; }
	.userMune .item_um:hover a {color: #2BB7B3;}
	
	
	@media screen and (max-width:1600px) {
		.nav .navLine {padding: 0 20px;}
		.muen_cv .item-mune a {padding: 15px 0; height: auto;}
	}
	@media screen and (max-width:1440px) {
		.logo img {width: 184px; margin-top: 14px;}
		.header  {height: 60px;}
		.nav_rv .item {height: 60px;}
		.nav .navLine {line-height: 60px; font-size: 14px;}
		.muen_cv .item-mune a {font-size: 14px;  height: 48px;}
	}
	@media screen and (max-width:1200px) {
		.navView {margin-left: 30px;}
	}
	@media screen and (max-width:990px) {
		.nav_rv {display: none;}
		.navView {display: none; position: absolute; left: 0; top: 100%; right: 0; z-index: 1000; background-color: rgba(0,0,0,0.85); margin-left: 0;}
		.navView .nav {width: 100%; }
		.menu-button {display: block; position: absolute; right: 0; top: 0; height: 100%; padding: 10px; }
		.menu-button .bar {height: 5px;margin: 6px auto;background-color: #fff;border-radius: 10px; width: 40px;transition: .3s;}
		.menu-button.active .bar:nth-of-type(1) { -webkit-transform: translateY(15px) rotate(
-45deg);-ms-transform: translateY(15px) rotate(-45deg);transform: translateY(15px) rotate(-45deg); margin-top: 0;}
		.menu-button.active .bar:nth-of-type(2) {opacity: 0;}
		.menu-button.active .bar:nth-of-type(3) {-webkit-transform: translateY(-7px) rotate(
45deg);-ms-transform: translateY(-7px) rotate(45deg);transform: translateY(-7px) rotate(
45deg); margin-bottom: 0;}
		.muen_cv {position: relative;}
	}

</style>
