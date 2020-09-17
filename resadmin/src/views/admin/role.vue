<template>
	<div class="app-container">

	<el-dialog title="站点信息" :visible.sync="dialogFormVisible">
	  <el-form :model="form">
	    <el-form-item label="站点名称" :label-width="formLabelWidth">
	      <el-input v-model="form.name" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="域名" :label-width="formLabelWidth">
		  <el-input v-model="form.domain" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="媒体目录" :label-width="formLabelWidth">
		  <el-input v-model="form.media_dir" autocomplete="off"></el-input>
		</el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
	  </div>
	</el-dialog>
	
	
		
					<el-button type="success" @click="add()">添加</el-button> 		
					
		<el-table
		    :data="datalist"
		    style="width: 100%">
			
		    <el-table-column
		      label="roleid"
		      width="180">
		      <template slot-scope="scope">
		        <!-- <i class="el-icon-time"></i> -->
		        <span style="margin-left: 10px">{{ scope.row.roleid }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="名称"
		      width="180">
		      <template slot-scope="scope">
		          {{ scope.row.rolename }}
		       
		      </template>
		    </el-table-column>
			
			<el-table-column
			  label="描述"
			  width="280">
			  <template slot-scope="scope">
			      {{ scope.row.description }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="站点"
			  width="180">
			  <template slot-scope="scope">
			      {{ scope.row.siteid }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="栏目权限"
			  width="100">
			  <template slot-scope="scope">
			      {{ scope.row.catidpriv }}
			   
			  </template>
			</el-table-column>
			
			
			
		    <el-table-column label="操作">
		      <template slot-scope="scope">
				   
				  
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  
		  
		  <el-row>
		  	<el-col :span="12">
		  			<!-- <div style="">
		  			  <el-button @click="toggleSelection(list)">全选</el-button>
		  			  <el-button @click="toggledelete()">删除</el-button>
		  			</div> -->
		  	</el-col>
		  	<el-col :span="12">
		  			<div class="block pages">
		  				<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize"
		  				 :current-page="currentPage" :total="dataCount">
		  				</el-pagination>
		  			</div>
		  	</el-col>
		  </el-row>	
		  

	</div>
</template>

<script>
	
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		role_info,role_list
	} from '@/api/admin'
	
	export default {
		data() {
			return {
				 dialogFormVisible: false,
				 dataCount: null,
				 currentPage: null,
				 pagesize: 2,
				form: {
				  name: '',
				  domain: '',
				  media_dir: '',
				  template: '',
				  logo: '',
				},
				formLabelWidth: '120px',
				  
				table: false,
				v: true,
				 
				datalist:[],
				  
				       
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
			init() {
				// this.getKeywords()
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
			fromsiteinfo() {
				
				let resparams=JSON.stringify(this.form)
			  const params = {
			  	resparams: resparams,
			  	userid: this.$store.state.user.userid
			  }
				role_info(params).then(
					response => {
						console.log(response)
						_g.toastMsg('success', '编辑成功！', this)
					})
				 this.dialogFormVisible = false
			},
			 handleEdit(index, row) {
				 
				 this.dialogFormVisible = true
				 let rowi = row
				 this.form = rowi
				console.log(index, row);
			  },
			  handleDelete(index, row) {
				console.log(index, row);
			  },
			fetchData() {
			    _g.openGlobalLoading()
				
					const params = {
						page: this.currentPage,
						pagesize: this.pagesize,
						userid: this.$store.state.user.userid,
					}
			  role_list(params).then(response => {
				     _g.closeGlobalLoading()
					 // this.version_info = response.version_info
					 this.datalist = response.items
					 // console.log(this.version_info )
					 console.log(this.datalist )
					 this.dataCount = parseInt(response.dataCount)
					 this.v = true
			  })
			    // this.listLoading = false
			},
		}
	}
</script>
