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
			  <el-breadcrumb-item>检索结果</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="retrievalView">
				<div class="conte_cv">
					<div class="retrieval_lv">
						<div class="title_lh2">分类限定类目</div>
						<!-- 学科 -->
						<div class="title_lh4" @click="touchTitle(0)">学科</div>
						<div class="div_tv" :class="titleIndex==0?'active':''">
							<div class="item" v-for="(item,index) in dataList" :key="index" @click="touchToShow(index)">
								<div class="item_iv">
									<div class="div_tn">{{item.label}}</div>
									<div class="div_tr">({{item.num}})</div>
								</div>
								<div class="item_mune" v-show="item.showLabel">
									<div class="div_mu" v-for="(dict,dictIndex) in item.children" :key="dictIndex"><span>·</span>{{dict.label}}</div>
								</div>
							</div>
						</div>
						<!-- 适用对象 -->
						<div class="title_lh4" @click="touchTitle(1)">适用对象</div>
						<div class="div_tv" :class="titleIndex==1?'active':''">
							<div class="item" v-for="(item,index) in dataList2" :key="index" @click="touchToShow2(index)">
								<div class="item_iv">
									<div class="div_tn">{{item.label}}</div>
									<div class="div_tr">({{item.num}})</div>
								</div>
								<div class="item_mune" v-show="item.showLabel">
									<div class="div_mu" v-for="(dict,dictIndex) in item.children" :key="dictIndex"><span>·</span>{{dict.label}}</div>
								</div>
							</div>
						</div>
						<!-- 时间筛选 -->
						<div class="title_lh4" @click="touchTitle(2)">时间筛选</div>
						<div class="timeList" :class="titleIndex==2?'active':''">
							<div class="item" v-for="(item,index) in timeList" :key="index">
								{{item}}
							</div>
						</div>
						<div class="div_tv div_tv2" :class="titleIndex==2?'active':''">
							<span>从</span>
							<el-date-picker
							  v-model="value1"
							  type="year"
							  value-format="yyyy"
							  placeholder="开始">
							</el-date-picker>
							<span>至</span>
							<el-date-picker
							  v-model="value2"
							  type="year"
							  value-format="yyyy"
							  :default-value="value1"
							  placeholder="结束">
							</el-date-picker>
						</div>
						<div class="btnView" :class="titleIndex==2?'active':''">
							<el-button class="btns">确定</el-button>
						</div>
						<!-- 责任者 -->
						<div class="title_lh4" @click="touchTitle(3)">责任者</div>
						<div class="div_tv" :class="titleIndex==3?'active':''">
							<div class="item" v-for="(item,index) in dataList3" :key="index" @click="touchToShow3(index)">
								<div class="item_iv">
									<div class="div_tn">{{item.label}}</div>
									<div class="div_tr">({{item.num}})</div>
								</div>
								<div class="item_mune" v-show="item.showLabel">
									<div class="div_mu" v-for="(dict,dictIndex) in item.children" :key="dictIndex"><span>·</span>{{dict.label}}</div>
								</div>
							</div>
						</div>
						<!-- 出版者 -->
						<div class="title_lh4" @click="touchTitle(4)">出版者</div>
						<div class="div_tv" :class="titleIndex==4?'active':''">
							<div class="item" v-for="(item,index) in dataList4" :key="index" @click="touchToShow4(index)">
								<div class="item_iv">
									<div class="div_tn">{{item.label}}</div>
									<div class="div_tr">({{item.num}})</div>
								</div>
								<div class="item_mune" v-show="item.showLabel">
									<div class="div_mu" v-for="(dict,dictIndex) in item.children" :key="dictIndex"><span>·</span>{{dict.label}}</div>
								</div>
							</div>
						</div>
						<!-- 出版地 -->
						<div class="title_lh4" @click="touchTitle(5)">出版地</div>
						<div class="div_tv" :class="titleIndex==5?'active':''">
							<div class="item" v-for="(item,index) in dataList5" :key="index" @click="touchToShow5(index)">
								<div class="item_iv">
									<div class="div_tn">{{item.label}}</div>
									<div class="div_tr">({{item.num}})</div>
								</div>
								<div class="item_mune" v-show="item.showLabel">
									<div class="div_mu" v-for="(dict,dictIndex) in item.children" :key="dictIndex"><span>·</span>{{dict.label}}</div>
								</div>
							</div>
						</div>
						<!-- 解放区教材 -->
						<div class="title_lh4" @click="touchTitle(6)">出版地</div>
						<div class="div_tv" :class="titleIndex==6?'active':''">
							<div class="item" v-for="(item,index) in dataList6" :key="index" @click="touchToShow6(index)">
								<div class="item_iv">
									<div class="div_tn">{{item.label}}</div>
									<div class="div_tr">({{item.num}})</div>
								</div>
								<div class="item_mune" v-show="item.showLabel">
									<div class="div_mu" v-for="(dict,dictIndex) in item.children" :key="dictIndex"><span>·</span>{{dict.label}}</div>
								</div>
							</div>
						</div>
						
					</div>
					<div class="retrieval_rv">
						<div class="classic_hv">
							检索结果
						</div>
						<div class="fix retrieval_row">
							<div class="item" v-for="(item,index) in 12" :key="index">
								
							</div>
						</div>
						<div class="pageView pageView_hv">
							<div class="fix title_pv">
								<div class="title">排序方式：</div>
								<span :class="havIndex == 0?'active':''" @click="touchToHav(0)">按时间</span>
								<span :class="havIndex == 1?'active':''" @click="touchToHav(1)">按浏览量</span>
							</div>
							<el-pagination
							  background
							  layout="prev, pager, next,jumper"
							  :total="100"
							  page-size="30">
							</el-pagination>
						</div>
						<div class="rankList retrievalList2">
							<div class="item" v-for="(item,index) in 6" :key="index">
								<div class="item_cv">
									<div class="imgView">
										<img class="img" src="../../assets/images/02.png" alt="">
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
										<div class="info_tv">
											<div class="name">版本: </div>
											<div class='tt'>修订本</div>
										</div>
										<div class="info_tv">
											<div class="name">全文: </div>
											<div class='tt t2'>第一册 46页  1932年   第二册 </div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="pageView">
							<el-pagination
							  background
							  layout="prev, pager, next,jumper"
							  :total="100"
							  page-size="30">
							</el-pagination>
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
				havIndex:0,
				titleIndex:-1,
				dataList: [
					{
					  label: '国文(语)',
					  num:6,
					  showLabel:false,
					  children: [{
						label: '国文2',
					  }]
					}, {
					  label: '算术',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '二级 2-1',
					  }], 
					}
				],
				dataList2: [
					{
					  label: '幼稚园',
					  num:6,
					  showLabel:false,
					  children: [{
						label: '幼稚园2',
					  }]
					}, {
					  label: '小学',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '小学2-1',
					  }], 
					},
					{
					  label: '中学',
					  num:12,
					  showLabel:false,
					  children: [{
						label: '中学2-1',
					  }], 
					},
					{
					  label: '师范',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '师范2-1',
					  }], 
					},
					{
					  label: '大学',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '大学2-1',
					  }], 
					},
					{
					  label: '其他',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '其他2-1',
					  }], 
					}
				],
				timeList:["1907","1908","1909","1910"],
				value1:'',
				value2:'',
				dataList3:[
					{
					  label: '罗根泽',
					  num:6,
					  showLabel:false,
					  children: [{
						label: '国文2',
					  }]
					}, {
					  label: '叶圣陶',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '二级 2-1',
					  }], 
					}
				],
				dataList4:[
					{
					  label: '商务印书馆',
					  num:6,
					  showLabel:false,
					  children: [{
						label: '国文2',
					  }]
					}, {
					  label: '商务印书馆',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '二级 2-1',
					  }], 
					}
				],
				dataList5:[
					{
					  label: '上海',
					  num:6,
					  showLabel:false,
					  children: [{
						label: '国文2',
					  }]
					}, {
					  label: '上海',
					  num:1,
					  showLabel:false,
					  children: [{
						label: '二级 2-1',
					  }], 
					}
				],
				dataList6:[
					{
					  label: '晋察冀',
					  num:6,
					  showLabel:false,
					  children: [{
						label: '国文2',
					  }]
					}
				],                         
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
			touchToHav:function(index){
				this.havIndex = index
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
			touchToShow:function(index){
				this.dataList[index].showLabel = !this.dataList[index].showLabel
			},
			touchToShow2:function(index){
				this.dataList2[index].showLabel = !this.dataList2[index].showLabel
			},
			touchToShow3:function(index){
				this.dataList3[index].showLabel = !this.dataList3[index].showLabel
			},
			touchToShow4:function(index){
				this.dataList4[index].showLabel = !this.dataList4[index].showLabel
			},
			touchToShow5:function(index){
				this.dataList5[index].showLabel = !this.dataList5[index].showLabel
			},
			touchToShow6:function(index){
				this.dataList6[index].showLabel = !this.dataList6[index].showLabel
			},
			touchTitle:function(index){
				if(this.titleIndex == index){
					this.titleIndex = -1
				} else {
					this.titleIndex = index
				}
				
			}
		}
	}
</script>

<style>
</style>
