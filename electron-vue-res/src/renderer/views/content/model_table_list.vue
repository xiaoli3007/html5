<template>
	<div class="app-container">

		<el-tabs type="card">
			<template v-for="(fromsinge, index) in from_options">
				<el-tab-pane :label="fromsinge.catname">
					<el-form :inline="true" class="demo-form-inline">

						<el-row>
							<!-- <el-col :span="4" :offset="2">
								<div class="form_title">联动菜单</div>
								</el-col> -->
							<el-col :span="24">
								<el-form-item v-for="(from_linkage, linkage_index) in fromsinge.search_linkage_form">
									<el-cascader :placeholder="from_linkage.name" v-model="linkageid" :options="from_linkage.data" :props="props"
									 @change="handleChange"></el-cascader>
								</el-form-item>
							</el-col>
						</el-row>
						
						 <el-tabs tab-position="left" style="">
						    <el-tab-pane label="精准搜索">
									<el-row>
										<!-- <el-col :span="4"><div class="form_title">主文本</div></el-col> -->
										<el-col :span="24">
									
											<el-form-item v-for="(from_zhu, zhu_index) in fromsinge.search_text_form_zhu">
												<el-input v-model="keywords" :placeholder="from_zhu.name" :clearable="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									
									<el-row>
										<!-- <el-col :span="4"><div class="form_title">副文本</div></el-col> -->
										<el-col :span="24">
									
											<el-form-item v-for="(from_fu, fu_index) in fromsinge.search_text_form_fu">
												<el-input v-model="keywords" :placeholder="from_fu.name" :clearable="true"></el-input>
											</el-form-item>
									
										</el-col>
									</el-row>
							</el-tab-pane>
						    <el-tab-pane label="全文搜索">
									<el-row>
										<!-- <el-col :span="4"><div class="form_title">全文检索</div></el-col> -->
										<el-col :span="24">
											<el-form-item>
												<el-input v-model="keywords" placeholder="全文" :clearable="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
							</el-tab-pane>
						     
						  </el-tabs>
						  
						

						

						<el-row>
							<el-col :span="4" :offset="20">
						<el-form-item>
							<el-button type="primary" @click="search()">查询</el-button> 			</el-form-item>
						</el-col>
						</el-row>
						
						
					</el-form>

				</el-tab-pane>
			</template>
		</el-tabs>



		<div class="booklist22" style="margin-top: 15px;">
			<el-row :gutter="20" v-loading.body="listLoading" element-loading-text="Loading">
				<el-col :span="4" v-for="(singe, index) in list" :key="index">
					<el-card :body-style="{ padding: '0px' }">
						<img :src="singe.thumb_url" class="image">
						<div style="padding: 14px;">
							<span>
								{{singe.j_t}}
							</span>
							<div class="bottom clearfix">
								<time class="time">{{singe.program.inputtime}}</time>
								<el-button type="text" class="button" @click.native="gotoShow(singe.catid,singe.id)">详细</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		

		<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label='封面'>
				<template slot-scope="scope">
					<el-image style="width: 80px;cursor: pointer; " :src="scope.row.thumb_url" fit="fill">

					</el-image>
				</template>
			</el-table-column>

			<el-table-column align="center" label='类别'>

				<template slot-scope="scope">
					<el-tag v-for="(slide, index) in scope.row.cat_array" :key="index">
						{{slide.name}}
					</el-tag>
				</template>

			</el-table-column>
			<el-table-column label="标题">
				<template slot-scope="scope">
					{{scope.row.program.title}}
				</template>
			</el-table-column>
			<el-table-column label="发布时间" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.program.inputtime}}</span>
				</template>
			</el-table-column>


			<el-table-column label="操作" align="center">
				<template slot-scope="scope">

					<el-col :span="12">

						<el-button type="success" size="medium" v-on:click="gotoShow(scope.row.catid,scope.row.id)">详细</el-button>

					</el-col>


				</template>
			</el-table-column>

		</el-table>


		<div class="block pages">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize"
			 :current-page="currentPage" :total="dataCount">
			</el-pagination>
		</div>




	</div>
</template>

<script>
	import {
		model_data_list,
		getjiaocai_cat_List,
		get_catlist_data
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				props: {
					multiple: true,
					expandTrigger: 'hover',
					emitPath: false,
					checkStrictly: false
				},
				list: null,
				listLoading: true,
				loading: false,
				dataCount: null,
				currentPage: null,
				keywords: '',
				multipleSelection: [],
				pagesize: 12,
				linkageid: 0,
				catid: 33,
				from_options: [],
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
					}, {
						value: 'daohang',
						label: '导航',
					}]
				}, {
					value: 'ziyuan',
					label: '资源',
					children: [{
						value: 'axure',
						label: 'Axure Components'
					}, {
						value: 'sketch',
						label: 'Sketch Templates'
					}, {
						value: 'jiaohu',
						label: '组件交互文档'
					}]
				}]
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'gray',
					deleted: 'danger'
				}
				return statusMap[status]
			}
		},
		created() {
			this.init()

			getjiaocai_cat_List().then(response => {
				this.options = response.items
				// console.log(this.options);
			})

			get_catlist_data().then(response => {
				this.from_options = response.items
				console.log(this.from_options);
			})

		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			gotoShow(catid, id) {
				this.$router.replace({
					name: 'Model_show',
					query: {
						catid: catid,
						news_id: id
					}
				})
			},
			search() {

				this.$router.push({
					path: this.$route.path,
					query: {
						keywords: this.keywords,
						page: 1,
						linkageid: this.linkageid
					}
				})
			},
			handleCurrentChange(page) {
				this.$router.push({
					path: this.$route.path,
					query: {
						keywords: this.keywords,
						page: page,
						linkageid: this.linkageid
					}
				})
			},
			fetchData() {
				_g.openGlobalLoading()
				// this.listLoading = true
				const params = {

					keywords: this.keywords,
					page: this.currentPage,
					pagesize: this.pagesize,
					linkageid: this.linkageid,
					catid: this.catid,
					userid: this.$store.state.user.userid,
				}
				model_data_list(params).then(response => {
					_g.closeGlobalLoading()
					this.list = response.items
					this.dataCount = parseInt(response.dataCount)
					// this.listLoading = false

					var temp = this.list
					_(temp).forEach(function(value, key) {
						// console.log(value.word1);
						var s = ''

						s = _.truncate(value.program.title, {
							'length': 12,
							'separator': ' '
						})
						// console.log(typeof temp);
						// console.log(temp[key].name);
						// this.list['sss']=s  
						_.set(temp, key + '.j_t', s);
					});
					this.list = temp
					console.log(temp);
				})
				this.listLoading = false
			},
			getCurrentPage() {
				let data = this.$route.query
				if (data) {
					if (data.page) {
						this.currentPage = parseInt(data.page)
					} else {
						this.currentPage = 1
					}
				}
			},
			getKeywords() {
				let data = this.$route.query
				if (data) {
					if (data.keywords) {
						this.keywords = data.keywords
					} else {
						this.keywords = ''
					}
				}
			},
			init() {
				this.getKeywords()
				this.getCurrentPage()
				this.fetchData()
			},

		},
		watch: {
			'$route'(to, from) {
				this.init()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.form_title{
		height: 40px; line-height: 40px; display: none;	}
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.booklist22 {

		.el-col {
			border-radius: 4px;
			margin-bottom: 10px;
		}
	}

</style>
