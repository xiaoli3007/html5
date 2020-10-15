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
			  <el-breadcrumb-item>使用排行</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="conteViews">
				<div class="title_hv">
					<div class="line_l">
						<div class="line"></div>
						<img src="../../assets/images/icon_title.png" alt="">
					</div>
					<div class="title">使用排行</div>
					<div class="line_l">
						<img src="../../assets/images/icon_title.png" alt="">
						<div class="line"></div>
					</div>
				</div>
				<div class="rankList">
					<div class="item" v-for="(item,index) in 6" :key="index">
						<div class="item_cv">
							<div class="imgView">
								<img class="img" src="../../assets/images/02.png" alt="">
								<img v-if="index == 0" class="icon" src="../../assets/images/icon_n1.png" alt="">
								<img v-if="index == 1" class="icon" src="../../assets/images/icon_n2.png" alt="">
								<img v-if="index == 2" class="icon" src="../../assets/images/icon_n3.png" alt="">
							</div>
							<div class="item_inv">
								<div class="info_tv info_tvh">
									<div class="name">书名: </div>
									<div class='tt h2'>开明新编高级国文读本</div>
									<img src="../../assets/images/icon_hot.png" alt="">
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">责任者: </div>
										<div class='tt'>叶圣陶等</div>
									</div>
									<div class="info_tv">
										<div class="name">丛书: </div>
										<div class='tt t2'>小学生文库</div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">出版信息: </div>
										<div class='tt'>1948 开明书店</div>
									</div>
									<div class="info_tv">
										<div class="name">适用对象: </div>
										<div class='tt'>高小</div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">版本: </div>
										<div class='tt'>修订本</div>
									</div>
									<div class="info_tv">
										<div class="name">全文: </div>
										<div class='tt t2'>第一册 46页  1932年   第二册 </div>
									</div>
								</div>
								<div class="info_tv info_tvb">
									<div class="name">详情: </div>
									<div class='tt'>这里是详细文字信息这里是详细文字信息这里是详细文字信息这里是详文字信息这里是文字信息这里是细文字细文细文信息这这里是详细文字信息这里是详细文字信息这里是详细文字信息这里是详细文字信...</div>
								</div>
							</div>
						</div>
						<img class="line_ibg" src="../../assets/images/line_bg.png" alt="">
					</div>
				</div>
				<div class="pageView">
					<el-pagination
					  background
					  layout="prev, pager, next,jumper"
					  :total="100"
					  :page-size="30">
					</el-pagination>
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
				state:''
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
			},
		}
	}
</script>

<style>
</style>
