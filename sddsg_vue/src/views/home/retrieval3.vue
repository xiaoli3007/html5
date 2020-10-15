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
			  <el-breadcrumb-item>经典展示</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="conteViews">
				<div class="retrievalList2">
					<div class="item">
						<div class="item_cv">
							<div class="imgView">
								<img class="img" src="../../assets/images/02.png" alt="">
							</div>
							<div class="item_inv">
								<div class="info_tv info_tvh2">
									<div class="name">书名: </div>
									<div class='tt h2'>开明新编高级国文读本</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">其他题名 </div>
										<div class='tt'></div>
									</div>
									<div class="info_tv">
										<div class="name">索书号</div>
										<div class='tt'>国文（语）</div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">丛书</div>
										<div class='tt'></div>
									</div>
									<div class="info_tv">
										<div class="name">页码</div>
										<div class='tt'>255（图片4）</div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">责任者</div>
										<div class='tt'>小学生文库</div>
									</div>
									<div class="info_tv">
										<div class="name">版本</div>
										<div class='tt'></div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">其他责任者</div>
										<div class='tt'>叶圣陶等</div>
									</div>
									<div class="info_tv">
										<div class="name">中图分类号</div>
										<div class='tt'>高小</div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">出版</div>
										<div class='tt'>上海:开明书店 1948</div>
									</div>
									<div class="info_tv">
										<div class="name">语种</div>
										<div class='tt'></div>
									</div>
								</div>
								<div class="item_ttv">
									<div class="info_tv">
										<div class="name">关键词</div>
										<div class='tt'>
											<span>关键词</span>
											<span>关键词</span>
										</div>
									</div>
									<div class="info_tv">
										<div class="name"></div>
										<div class='tt'></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="conte_ml">
					<div class="title_rev">分册信息</div>
					<div class="fix copies_row">
						<div class="item" v-for="(item,index) in 4" :key="index">
							<div class="name">第一册</div>
							<div class="page_cv">
								<div class="pt">页 码：125</div>
								<div class="nt">出版年：1900</div>
							</div>
						</div>
					</div>
					<div class="title_rev">描述</div>
					<div class="describe">高中补充读本。选叶圣陶、张天翼、冯至、孙福熙、吕郭沫若、郭沫若、叔湘、郭沫若、朱自清、鲁迅、李广田、费孝通、曹禺、艾青、艾漠、田间、鲁黎等21人的作品25篇。</div>
					<div class="title_rev">目录</div>
					<el-table
					      :data="tableData"
					      style="width: 100%">
					      <el-table-column
							fixed
					        prop="date"
					        label="序"
					        width="40">
					      </el-table-column>
					      <el-table-column
					        prop="name"
					        label="标题"
							>
							<template slot-scope="scope">
								<p class="ptn">姓名: {{ scope.row.name }}</p>
							</template>
					      </el-table-column>
					      <el-table-column
					        prop="address"
							width="66"
					        label="标题">
					      </el-table-column>
					    </el-table>
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
				tableData: [{
					date: '1',
					name: '邻舍吴老先生 叶圣陶',
					address: '10'
				  }, {
					date: '2',
					name: '我的学生',
					address: '16'
				  }, {
					date: '3',
					name: '华威先生 张天翼',
					address: '33'
				  }, {
					date: '4',
					name: '一封没写完的信 康白情',
					address: '46'
				}]
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
