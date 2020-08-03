<template>
	<div class="app-container">

		
		<el-tabs type="border-card">
		  <el-tab-pane label="栏目1">
			  <el-form :inline="true" class="demo-form-inline">
			  	<el-form-item>
			  		<el-cascader placeholder="课程分类" v-model="linkageid" :options="options" :props="props" @change="handleChange"></el-cascader>
			  	</el-form-item>
			  
			  	<el-form-item>
			  		<el-input v-model="keywords" placeholder="关键词"></el-input>
			  	</el-form-item>
			  	<el-form-item>
			  		<el-button type="primary" @click="search()">查询</el-button>
			  	</el-form-item>
			  </el-form>
			  
		  </el-tab-pane>
		  <el-tab-pane label="栏目1">栏目1</el-tab-pane>
		  <el-tab-pane label="栏目1">栏目1</el-tab-pane>
		  <el-tab-pane label="栏目1">栏目1</el-tab-pane>
		</el-tabs>
		

		
<div class="booklist22" style="margin-top: 15px;">
	<el-row  :gutter="20" v-loading.body="listLoading" element-loading-text="Loading" >
	  <el-col  :span="4" v-for="(singe, index) in list" :key="index" >
	    <el-card :body-style="{ padding: '0px' }">
	      <img  :src="singe.thumb_url" class="image">
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
	<!-- <div class="booklist">
		
	<el-row :gutter="20" v-loading.body="listLoading" element-loading-text="Loading" >
		<el-col :span="4" v-for="(singe, index) in list" :key="index">
			<div class="grid-content bg-purple" >
				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center" style="margin-bottom:0;">
						<el-image style="width: 120px;cursor: pointer; " :src="singe.thumb_url" fit="fill" @click.native="gotoShow(singe.catid,singe.id)"></el-image>
					</el-col>
				</el-row>
				<el-row style="margin-top: 0;">
					<el-col :span="20" :offset="2" justify="center" align="center" style="margin-bottom:0;">
						<p>
							<el-link @click.native="gotoShow(singe.catid,singe.id)">{{singe.program.title}}</el-link>
						</p>
						
							
					</el-col>
				</el-row>
			</div>
		</el-col>
	
	</el-row>
	 </div> -->
	 
	 
	 
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
 
						<el-button type="success" size="medium"  v-on:click="gotoShow(scope.row.catid,scope.row.id)">详细</el-button>
						
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
		getjiaocai_cat_List
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
				catid:33,
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

		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			gotoShow(catid,id) {
				this.$router.replace({
					name: 'Model_show',
					query: { catid: catid,news_id: id}
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
						
						s = _.truncate(value.program.title, {'length': 12,'separator': ' '})
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
	  .booklist22{
		  
		  .el-col {
		  	border-radius: 4px;
		  	margin-bottom: 10px;
		  }
	  }
	  
	// .booklist{
	// p {
	// 	margin: 10px 0 0 0; font-size: 12px; 
	// 	  // line-height: 1.2;
	// }
	// .el-row {
	// 	margin: 10px 0 0;
	// 	padding: 0 15px;

	// 	&:last-child {
	// 		margin-bottom: 0;
	// 	}
	// }

	// .el-col {
	// 	border-radius: 4px;
	// 	margin-bottom: 10px;
	// }

	// .bg-purple-dark {
	// 	background: #99a9bf;
	// }

	// .bg-purple {
	// 	background: #eee; border: 1px solid #ccc;
	// }

	// .bg-purple-light {
	// 	background: #e5e9f2;
	// }

	// .grid-content {
	// 	border-radius: 4px; 
	// 	// min-height: 260px; max-height: 290px;  
	// 	 overflow: hidden;
	// 	 height: 290px;
	// }

	// .row-bg {
	// 	padding: 10px 0;
	// 	background-color: #f9fafc;
	// }

	// }
</style>

