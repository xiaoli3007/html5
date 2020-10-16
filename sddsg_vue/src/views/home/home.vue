<template>
	<div class="homes" id="app">
		<div class="wp">
			<div class="logoView"><a href=""><img src="../../assets/images/logo.png" alt=""></a></div>
			<div class="titleView"><img src="../../assets/images/title.png" alt=""></div>
			<div class="searchView mt40">
				<div class="fix searchTab">
					<div class="item" :class="tabIndex==index?'active':''" v-for="(item,index) in tabList" :key="index" @click="touchToTab(index)">{{item}}
						<img class="icon" src="../../assets/images/down.png" alt=""></div>
				</div>
				<div class="search_cv">
					<div class="search_lv">
						<div class="inputView">
							<img src="../../assets/images/search.png" alt="">
							<!-- <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete> -->
							
							<el-autocomplete v-model="keywords" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
							
						</div>
						<div class="word_tj">
							热词推荐：
							<span v-for="(item,index) in searchList" :key="index">{{item}}</span>
						</div>
					</div>
					<el-button class="btn" @click="onSearch()">搜索</el-button>
				</div>
			</div>
			<div class="conteView">
				<div class="conte_cv">
					<div class="conte_lv">
						<div class="title_tv">
							<div class="title_lt">
								<img src="../../assets/images/icon_title.png" alt="">
								<div class="title">教材导航</div>
								<div class="line_bg"></div>
							</div>
							<div class="more">更多></div>
						</div>
						<div class="listView">
							<div class="item" v-for="(item,index) in linkageList" :key="index">
								<div class="name">{{item.label}}</div>
								<div class="fix item_rv">
									<div class="tt" :class="item.showMore?'tab':''" v-for="(dict,i) in ((item.children.length > 11 && !item.showMore)?11:item.children)" :key="i" ><span>{{item.children[i].label}}</span></div>
									<div v-if="item.children.length > 11" class="tt iconDown" @click="touchToShowMore(index)"><i class="el-icon-arrow-down"></i></div>
								</div>
							</div>
						</div>
						<div class="title_tv">
							<div class="title_lt">
								<img src="../../assets/images/icon_title.png" alt="">
								<div class="title">经典展示</div>
								<div class="line_bg"></div>
							</div>
							<div class="more">更多></div>
						</div>
						<div id="banner" class="banner" >
							<div class="swiper-container">
							    <div class="swiper-wrapper">
							        <div @click="gotoShow(item.catid,item.id)" class="swiper-slide" v-for="(item,index) in zhanshiList.result"  :key="index">
								   <img :src="item.thumb" style=" width: 139px;" /> 
										
										 <!-- <img src="../../assets/images/01.png" /> -->
									</div>
							    </div>
							    <div class="swiper-pagination"></div>
							    <div class="swiper-button-prev"></div>
							    <div class="swiper-button-next"></div>
							    <div class="swiper-scrollbar"></div>
							</div>
						</div>
					</div>
					<div class="conte_rv">
						<div class="title_tv">
							<div class="title_lt">
								<img src="../../assets/images/icon_title.png" alt="">
								<div class="title">本库动态</div>
								<div class="line_bg"></div>
							</div>
							<div class="more">更多></div>
						</div>
						<div class="newsList">
							<div class="item" v-for="(item,index) in dongtaiList.result" :key="index">
								<div class="tt"><span>•</span>{{item.title}}</div>
								<div class="time">{{item.inputtime}}</div>
							</div>
						</div>
						<div class="title_tv">
							<div class="title_lt">
								<img src="../../assets/images/icon_title.png" alt="">
								<div class="title">使用排行</div>
								<div class="line_bg"></div>
							</div>
							<div class="more">更多></div>
						</div>
						<div class="paimList">
							<div class="item" v-for="(item,index) in rankList" :key="index">
								<span :class="index < 3?'t1':''">{{index+1}}</span>
								<div class="tt">{{item.title}}</div>
							</div>
						</div>
						<div class="title_tv">
							<div class="title_lt">
								<img src="../../assets/images/icon_title.png" alt="">
								<div class="title">友情链接</div>
								<div class="line_bg"></div>
							</div>
							<div class="more"></div>
						</div>
						<div class="selectView">
							<el-select v-model="region1" placeholder="请选择活动区域">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						<!-- 	<el-select v-model="region2" placeholder="请选择活动区域">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select> -->
						</div>
						<div class="openView">
							<img src="../../assets/images/icon_01.png" alt="">
							<div class="name">关于本库</div>
						</div>

					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import NaviBar from '../../components/NaviBar.vue';
	import swiper from "swiper/dist/js/swiper.js";
	import "swiper/dist/css/swiper.min.css";
	
	import {index_home} from '@/api/base'
	
	export default {
		name: "homes",
		components: {
			NaviBar
		},
		data() {
			return {
				tabList: ["资源搜索", "高级搜索"],
				tabIndex: 0,
				state: '',
				region1: '',
				region2: '',
				searchList: ["小学", "蒙学新教育课本", "李彦", "广告", "训蒙新读本序言", "新最高等小", "例言", "训蒙新读本序言", "新..."],
				titleList: [{
						name: '学前',
						list: ["学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范",
							"其他"
						],
						showMore: false
					},
					{
						name: '小学',
						list: ["学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范",
							"其他"
						],
						showMore: false
					},
					
				],
				screenWidth: document.body.clientWidth, // 屏幕宽度
				timer: false,
				pageView:5,
				linkageList:[],
				zhanshiList:{result:[]},
				rankList:[],
				dongtaiList:{},
				loadingend:false,
				keywords:'',
				restaurants: [],
			}
		},
		mounted: function() {
			this.restaurants = this.loadAll();
			
			// 监听窗口大小
			window.onresize = () => {
			  return (() => {
				this.screenWidth = document.body.clientWidth
			  })()
			}
		
				// new swiper('.swiper-container', {
				// 	slidesPerView: this.pageView,
				// 	spaceBetween: 10,
				// 	loop: true,
				// 	// observer:true,//修改swiper自己或子元素时，自动初始化swiper
				// 	// observeParents:true,//修改swiper的父元素时，自动初始化swiper
				// 	autoplay:{
				// 		delay:2000,
				// 		disableOnInteraction: false,
				// 	},
				// 	// 如果需要前进后退按钮
				// 	navigation: {
				// 	  nextEl: '.swiper-button-next',
				// 	  prevEl: '.swiper-button-prev',
				// 	},
				// })
				
			
			
			  
		},
		watch:{
			screenWidth (val) {
			  if (!this.timer) {
				this.screenWidth = val
				if (this.screenWidth < 768) {
					this.pageView = 1
				}
				this.timer = true
				let that = this
				setTimeout(function () {
				  that.timer = false
				}, 400)
			  }
			}
		},
		created() {
			this.fetchData()	
		},
		methods: {
			onSearch() {
				  let val = this.keywords
				  this.$router.replace({
				  	name: 'List',
				  	query: {
				  		keywords: val,
				  	}
				  })
				  
			      // Toast(val);
			 },
			gotoShow(catid, id) {
				this.$router.replace({
					name: 'Show',
					query: {
						catid: catid,
						news_id: id
					}
				})
			},
			fetchData() {
			   // this.$loading.show()  
			   
				 const getparams = {
					loading: true,
				    params: {
				    }
				  }
			 
			 index_home(getparams).then(response => {
			   
					// this.slideimages = response[0].slideimages
					 
					 let  templinkages = response[3].data
					 templinkages.forEach(function (value, i) {
					 	 templinkages[i].showMore = false
					 })
					 console.log(templinkages)
					 
					 this.linkageList = templinkages
					 
					
					  this.zhanshiList = response[1].data[3]
					 this.dongtaiList = response[1].data[5]
					 this.rankList = response[2].data
					 
					   console.log(this.zhanshiList)
					   console.log(this.dongtaiList)
					   console.log(this.rankList)
					  //  if( this.zhanshiList.result.length>0){
							// console.log(111)
							
							// this.loadingend = true
					  //  }
					  
					   this.$nextTick(() => {
					          
							  new swiper('.swiper-container', {
							  	slidesPerView: this.pageView,
							  	spaceBetween: 10,
							  	loop: true,
							   
							  	autoplay:{
							  		delay:2000,
							  		disableOnInteraction: false,
							  	},
							  	// 如果需要前进后退按钮
							  	navigation: {
							  	  nextEl: '.swiper-button-next',
							  	  prevEl: '.swiper-button-prev',
							  	},
							  })
							  
					        });
					  
					   
			  }) 
			   
			},
			loadAll() {
				return [{
						"value": "三全鲜食（北新泾店）",
						"address": "长宁区新渔路144号"
					},
					{
						"value": "Hot honey 首尔炸鸡（仙霞路）",
						"address": "上海市长宁区淞虹路661号"
					},
				 	 
				];
			},
			touchToTab: function(index) {
				this.tabIndex = index
			},
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			createStateFilter(queryString) {
				return (state) => {
					return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
			},
			touchToShowMore:function(index){
				console.log("显示点击了那个____",index)
				// this.titleList[index].showMore = !this.titleList[index].showMore
				this.linkageList[index].showMore = !this.linkageList[index].showMore
			}
		}
	}
</script>

<style scoped>
	@import url("../../assets/style/style.css");

	.swiper-container {
		width: 100%;
		margin: 20px auto;
	}
</style>
