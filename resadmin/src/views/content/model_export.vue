<template>
	<div class="app-container">

	 			
		<el-table
		    :data="datalist"
		    style="width: 100%">
			
				
		    <el-table-column   
		      label="catid"
		      >
		      <template slot-scope="scope">
		        <!-- <i class="el-icon-time"></i> -->
		        <span style="margin-left: 10px">{{ scope.row.catid }}</span>
		      </template>
		    </el-table-column>
		  
			
			<el-table-column
			  label="栏目"
			  >
			  <template slot-scope="scope">
			      {{ scope.row.catname }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="模型"
			  >
			  <template slot-scope="scope">
			    <el-tag  type="success">{{ scope.row.modelname }}</el-tag>  
			  </template>
			</el-table-column>
			  
			 
		    <el-table-column label="操作"  >
		      <template slot-scope="scope">
				    <el-button @click="checksiteid(scope.row)" type="text" size="small">模板导出</el-button>
				  <el-button type="text" size="small">元数据导入</el-button>
				  <el-button type="text" size="small">媒体数据导入</el-button> 
		      </template>
		    </el-table-column>
		  </el-table>
		  
	  
		  

	</div>
</template>

<script>
	import _ from 'lodash'
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		content_cat_list
	} from '@/api/content_import.js'
	// import router from '@/router/index.js'
	export default {
		data() {
			return {
				 dialogFormVisible: false,
				 dataCount: null,
				 currentPage: null,
				 pagesize: 12,
				formLabelWidth: '120px',
				table: false,
				v: false,
				datalist:[],
				siteid: getsiteid()  ? getsiteid() : '1',
				site_list:[],
				model_list:[],
				 
				 
			}
		},
		created() {
			this.init()
		},
		watch: {
			'$route'(to, from) {
				// console.log(to)
				// console.log(from)
				this.init()
			}
		},
		methods: {
			  
			checksiteid(id) {
				console.log(id)
				
			},
			init() {
				 
				this.getCurrentPage()
				this.fetchData()
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
			handleCurrentChange(page) {
				this.$router.push({
					path: this.$route.path,
					query: {
						// keywords: this.keywords,
						page: page,
					}
				})
			}, 
			
			fetchData() {
			    _g.openGlobalLoading()
				
					const params = {
						page: this.currentPage,
						pagesize: this.pagesize,
						userid: this.$store.state.user.userid,
						siteid: this.siteid,
					}
			  content_cat_list(params).then(response => {
				     _g.closeGlobalLoading()
					 
					 this.datalist = response.items
					  // this.site_list = response.site_list
					 
					 // console.log(this.site_list)
					 
					 this.v = true
			  })
			    // this.listLoading = false
			},
		}
	}
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>