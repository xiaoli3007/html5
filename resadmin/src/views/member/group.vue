<template>
	<div class="app-container">

	<el-dialog  title="用户组信息" :visible.sync="dialogFormVisible"  v-if="v">
	  <el-form :model="form">
	    <el-form-item label="用户组名称" :label-width="formLabelWidth">
	      <el-input v-model="form.name" autocomplete="off"></el-input>
	    </el-form-item>
	
		
	<!-- 	<el-form-item label="站点" :label-width="formLabelWidth" >
			<el-radio-group v-model="form.siteid" disabled>
			        <el-radio v-for="(item, index) in site_list" :key="index" @change="checksiteid(item.siteid)"  :label="item.siteid"  >{{item.name}}</el-radio>
			    </el-radio-group>			 
		</el-form-item> -->
		
		
		<el-form-item label="描述" :label-width="formLabelWidth">
		  <el-input v-model="form.description" autocomplete="off"></el-input>
		</el-form-item>
	     
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
	  </div>
	</el-dialog>
	
	<el-button type="success" @click="handleAdd()">添加</el-button> 		
					
		<el-table
		    :data="datalist"
		    style="width: 100%">
			
				
		    <el-table-column   
		      label="groupid"
		      >
		      <template slot-scope="scope">
		        <!-- <i class="el-icon-time"></i> -->
		        <span style="margin-left: 10px">{{ scope.row.groupid }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="用户组名称"
		     >
		      <template slot-scope="scope">
		          {{ scope.row.name }}
		       
		      </template>
		    </el-table-column>
			
			<el-table-column
			  label="是否为系统组"
			 >
			  <template slot-scope="scope">
			      {{ scope.row.issystem }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="人数"
			 >
			  <template slot-scope="scope">
			      {{ scope.row.people }}
			   
			  </template>
			</el-table-column>
			
			 
			<el-table-column
			  label="描述"
			 >
			  <template slot-scope="scope">
			      {{ scope.row.description }}
			   
			  </template>
			</el-table-column>
			 
			 
			 
		    <el-table-column label="操作" width="280" >
		      <template slot-scope="scope">
				   
				<el-button type="primary"
				  size="mini"
				  @click="handleEdit(scope.$index, scope.row)">下载</el-button>
					
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
	import _ from 'lodash'
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		member_group_list,member_group_edit,member_group_delete
	} from '@/api/admin_member'
	// import router from '@/router/index.js'
	export default {
		data() {
			return {
				 dialogFormVisible: false,
				 dataCount: null,
				 currentPage: null,
				 pagesize: 12,
				form: {
				  name: '',
				  description:'',
				},
				formLabelWidth: '120px',
				  
				table: false,
				v: false,
				 
				datalist:[],
				site_list:[],
				 
				 
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
			 
			fromsiteinfo() {
				 	 
				console.log(this.form)
				// return
				// this.form.priv =this.$refs.tree.getCheckedKeys()
				let resparams=JSON.stringify(this.form)
				
				console.log(resparams)
				  
			  const params = {
			  	resparams: resparams,
			  	userid: this.$store.state.user.userid
			  }
				member_group_edit(params).then(
					response => {
						console.log(response)
						this.init()
						_g.toastMsg('success', '编辑成功！', this)
					})
				 this.dialogFormVisible = false
			},
			handleAdd() {
							 
				 this.dialogFormVisible = true
				 let rowi =  {
				  name: '',
				  description:'',
				}
				 this.form = rowi
			 },
			 handleEdit(index, row) {
				 
				 this.dialogFormVisible = true
				 
				 let rowi = JSON.parse(JSON.stringify(row))
				 console.log(rowi)
				 this.form.description =  ''
				 this.form.groupid = rowi.groupid
				 this.form.name = rowi.name
				// console.log(index, row);
			  },
			  handleDelete(index, row) {
				 this.$confirm('确认删除?', '提示', {
				   confirmButtonText: '确定',
				   cancelButtonText: '取消',
				   type: 'warning'
				 }).then(() => {
				 	
				 	const params = {
				 		userid: this.$store.state.user.userid,
				 		groupid: row.groupid
				 	}
				 	_g.openGlobalLoading()
				 	member_group_delete(params).then(response => {
				 		// console.log(response)
				 		_g.closeGlobalLoading()
				 		if (response.code == 20000) {
				 			_g.toastMsg('success', '删除成功',this)
				 			 setTimeout(() => {
				 			  _g.shallowRefresh(this.$route.name)
				 			}, 500)
				 		}else{
				 			_g.toastMsg('error', '删除错误',this)
				 		}
				 	})
				   // console.log(row.id);
				 }).catch(() => {
				   // catch error
				 })
			  },
			fetchData() {
			    _g.openGlobalLoading()
				
					const params = {
						page: this.currentPage,
						pagesize: this.pagesize,
						userid: this.$store.state.user.userid,
					}
			  member_group_list(params).then(response => {
				     _g.closeGlobalLoading()
					 
					 this.datalist = response.items
					  // this.site_list = response.site_list
					 // console.log(this.site_list)
					  this.dataCount = parseInt(response.dataCount)
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