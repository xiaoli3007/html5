<template>
	<div class="homes">
		<div class="wp">
			<div class="logoView logoView2">
				<a href="" class="logo"><img src="../../assets/images/logo.png" alt=""></a>
				<div class="titleView">
					<img src="../../assets/images/title2.png" alt="">
				</div>
			</div>
			<div class="searchView">
				<div class="fix searchTab">
					<div class="item" :class="tabIndex==index?'active':''" v-for="(item,index) in tabList" :key="index" @click="touchToTab(index)">{{item}}
						<img class="icon" src="../../assets/images/down.png" alt=""></div>
				</div>
				<div class="search_cv">
					<div class="search_lv">
						<div class="inputView">
							<img src="../../assets/images/search.png" alt="">
							<el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						</div>
						<div class="word_tj">
							热词推荐：
							<span v-for="(item,index) in searchList" :key="index">{{item}}</span>
						</div>
					</div>
					<el-button class="btn">搜索</el-button>
				</div>
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="bread_cv">
				<img class="icon" src="../../assets/images/icon_home.png" alt="">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>教材导航</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="conteViews">
				<div class="title_hv">
					<div class="line_l">
						<div class="line"></div>
						<img src="../../assets/images/icon_title.png" alt="">
					</div>
					<div class="title">教材导航</div>
					<div class="line_l">
						<img src="../../assets/images/icon_title.png" alt="">
						<div class="line"></div>
					</div>
				</div>
				<div class="listView listView2">
					<div class="item" v-for="(item,index) in titleList" :key="index">
						<div class="name">{{item.name}} <i class="el-icon-arrow-right"></i></div>
						<div class="fix item_rv">
							<div class="tt" v-for="(dict,i) in item.list" :key="i"><span>{{dict}}</span></div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabList: ["全库","教材","教参教辅","课程标准","高级搜索"],
				tabIndex: 0,
				searchList: ["小学", "蒙学新教育课本", "李彦", "广告", "训蒙新读本序言", "新最高等小", "例言", "训蒙新读本序言", "新..."],
				state:'',
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
					{
						name: '中学',
						list: ["学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范",
							"其他"
						],
						showMore: false
					},
					{
						name: '大学',
						list: ["学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范",
							"其他"
						],
						showMore: false
					},
					{
						name: '师范',
						list: ["学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范",
							"其他"
						],
						showMore: false
					},
					{
						name: '其他',
						list: ["学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范", "其他", "学前", "小学", "中学", "大学", "师范",
							"其他"
						],
						showMore: false
					}
				]
			}
		},
		created:function(){
			
		},
		methods:{
			loadAll() {
				return [{
						"value": "三全鲜食（北新泾店）",
						"address": "长宁区新渔路144号"
					},
					{
						"value": "Hot honey 首尔炸鸡（仙霞路）",
						"address": "上海市长宁区淞虹路661号"
					},
					{
						"value": "新旺角茶餐厅",
						"address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
					},
					{
						"value": "泷千家(天山西路店)",
						"address": "天山西路438号"
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
			}
		}
	}
</script>

<style>
</style>
