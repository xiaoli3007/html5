<template>
	<div class="app-container">

	<el-dialog  title="管理员信息" :visible.sync="dialogFormVisible"  v-if="v">
	  <el-form :model="form">
	    <el-form-item label="用户名" :label-width="formLabelWidth">
	      <el-input v-model="form.username" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="密码" :label-width="formLabelWidth">
		  <el-input v-model="form.password" show-password></el-input>
		</el-form-item>
		
		<el-form-item label="角色" :label-width="formLabelWidth">
			<el-radio-group v-model="form.roleid">
			        <el-radio v-for="(item, index) in role_list" :key="index" @change="checkroleid(item.roleid)"  :label="item.roleid"  >{{item.rolename}}</el-radio>
			    </el-radio-group>
				
			
			 
		</el-form-item>
		
		<el-form-item label="姓名" :label-width="formLabelWidth">
		  <el-input v-model="form.realname" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" :label-width="formLabelWidth">
		  <el-input v-model="form.email" autocomplete="off"></el-input>
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
		      label="userid"
		      >
		      <template slot-scope="scope">
		        <!-- <i class="el-icon-time"></i> -->
		        <span style="margin-left: 10px">{{ scope.row.userid }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="用户名"
		      >
		      <template slot-scope="scope">
		          {{ scope.row.username }}
		       
		      </template>
		    </el-table-column>
			
			<el-table-column
			  label="姓名"
			  >
			  <template slot-scope="scope">
			      {{ scope.row.realname }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="角色"
			 >
			  <template slot-scope="scope">
			      {{ scope.row.role_info.rolename }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="邮箱"
			 >
			  <template slot-scope="scope">
			      {{ scope.row.email }}
			   
			  </template>
			</el-table-column>
			<el-table-column
			  label="最后登录"
			  >
			  <template slot-scope="scope">
			      {{ scope.row.lastlogintime }}
			   
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
	import _ from 'lodash'
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		admin_info,admin_list,admin_delete
	} from '@/api/admin'
	// import router from '@/router/index.js'
	export default {
		data() {
			return {
				 dialogFormVisible: false,
				 dataCount: null,
				 currentPage: null,
				 pagesize: 12,
				form: {
				  username: '',
				  realname: '',
				  password:'',
				  email: '',
				  roleid: '',
				},
				formLabelWidth: '120px',
				  
				table: false,
				v: false,
				 
				datalist:[],
				role_list:[],
				 
				 
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
			checkroleid(id) {
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
				admin_info(params).then(
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
				  username: '',
				  realname: '',
				  password:'',
				  email: '',
				  roleid: '',
				}
				 this.form = rowi
			 },
			 handleEdit(index, row) {
				 
				 this.dialogFormVisible = true
				 
				 let rowi = JSON.parse(JSON.stringify(row))
				 console.log(rowi)
				 this.form.password =  ''
				 this.form.userid = rowi.userid
				 this.form.username = rowi.username
				 this.form.realname = rowi.realname
				 this.form.email = rowi.email
				 this.form.roleid = rowi.roleid
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
				 		duserid: row.userid
				 	}
				 	_g.openGlobalLoading()
				 	admin_delete(params).then(response => {
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
			  admin_list(params).then(response => {
				     _g.closeGlobalLoading()
					 this.datalist = response.items
					 this.role_list = response.role_list
					 
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