<template>
	<div class="app-container">

	<el-dialog :fullscreen="false" title="角色信息" :visible.sync="dialogFormVisible"  v-if="v">
	  <el-form :model="form">
	    <el-form-item label="名称" :label-width="formLabelWidth">
	      <el-input v-model="form.rolename" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="描述" :label-width="formLabelWidth">
		  <el-input v-model="form.description" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="站点" :label-width="formLabelWidth">
			
			 <el-radio v-for="(item, index) in sitelist" :key="index" @change="checksiteid(item.siteid)"  :label="item.siteid" v-model="form.siteid" border>{{item.name}}</el-radio>
			 
		</el-form-item>
		
		<el-form-item label="栏目权限" :label-width="formLabelWidth">
			
			
			<el-checkbox-group v-model="form.catidpriv"  >
			      
			      <el-checkbox v-for="(item, index) in sitelist[form.siteid?form.siteid:1].catlist" :key="index"  :label="item.catid"  >{{item.catname}}</el-checkbox>
				   
			    </el-checkbox-group>
				
	 
		</el-form-item>
		
		<el-form-item label="权限" :label-width="formLabelWidth">
			 <el-tree
			   :data="privlist"
			   show-checkbox
			   node-key="id"
			   ref="tree"
			   :default-expanded-keys="default_expanded"
			   :default-checked-keys="default_keys"
			   @check="treecheck"
			   :props="defaultProps">
			 </el-tree>
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
			
			   <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          
			          <el-form-item label="栏目权限">
			            <span>{{ props.row.catidpriv }}</span>
			          </el-form-item>
			          <el-form-item label="权限">
			            <span>{{ props.row.priv }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
				
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
		role_info,role_list,role_delete
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
				  roleid: '',
				  rolename: '',
				  description: '',
				  siteid: '',
				  catidpriv: [],
				  priv: [],
				},
				formLabelWidth: '120px',
				  
				table: false,
				v: false,
				 
				datalist:[],
				sitelist:[],
				catlist:[],
				privlist:[],  
				default_expanded:[],  
				default_keys:[], 
			  defaultProps: {
					   children: 'children',
					   label: 'label'
					 }
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
			getrount() {
				
				// let matched =JSON.parse(JSON.stringify(this.$router.options.routes))
				let matched =JSON.parse(JSON.stringify(this.$store.state.permission.routers))
				 // console.log(this.$store.state.permission.routers)
				let parentm =[]
				let tempmath =[]
				_(matched).forEach(function(value, key) {
						  // console.log(value)
						  if(value.meta!=null && !value.hidden){
							  if(value.meta.title!=''){
								  
								 _.set(parentm, key, value.name); 
							  	 _.set(tempmath, key, {label:value.meta.title,id:value.name}); 
								 let children =[]
								 _( value.children).forEach(function(value2, key2) {								
									 if(value2.meta!=null && !value2.hidden){
									 	 if(value2.meta.title!=''){
											  _.set(children, key2, {label:value2.meta.title,id:value2.name}); 
										 }}
									 
								 })
								 _.set(tempmath, key+"[children]", children); 
							  }
						  }
						  
				});
				
				 tempmath = _.compact(tempmath)
				 this.privlist = tempmath
				 
				 // this.default_expanded  = parentm
				  console.log(tempmath)
			},
			checksiteid(siteid) {
				console.log(siteid)
				
			},
			init() {
				this.getrount()
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
			treecheck(a,b){
				// console.log(a)
				console.log(b.checkedKeys)
				
				this.form.priv = b.checkedKeys
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
				role_info(params).then(
					response => {
						console.log(response)
						this.init()
						_g.toastMsg('success', '编辑成功！', this)
					})
				 this.dialogFormVisible = false
			},
			handleAdd() {
							 
				 this.dialogFormVisible = true
				 let rowi = {
				  roleid: '',
				  rolename: '',
				  description: '',
				  siteid: '',
				  catidpriv: [],
				  priv: [],
				}
				 this.form = rowi
			 },
			 handleEdit(index, row) {
				 
				 this.dialogFormVisible = true
				 
				 let rowi = JSON.parse(JSON.stringify(row))
				 console.log(rowi)
				 rowi.catidpriv = rowi.catidpriv?rowi.catidpriv.split(','):[]
				 // console.log(rowi)
				 rowi.priv = rowi.priv?rowi.priv.split(','):[]
				 
				let selfmain =  this 
				 setTimeout(function () {
				     // console.log(selfmain.$refs.tree)
					 // selfmain.default_keys = rowi.priv
					 selfmain.$refs.tree.setCheckedKeys(rowi.priv);
				 }, 100);
				 
				 
				  // this.$refs.tree.setCheckedKeys([]);
				 // this.$refs.tree.setCheckedKeys(rowi.priv);
				 //this.$set(this.default_keys, rowi.priv)
				  
				 this.form = rowi
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
				  		roleid: row.roleid
				  	}
				  	_g.openGlobalLoading()
				  	role_delete(params).then(response => {
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
			  role_list(params).then(response => {
				     _g.closeGlobalLoading()
					 // this.version_info = response.version_info
					 this.datalist = response.items
					 this.sitelist = response.sitelist
					 // this.catlist = response.catlist
					 // console.log(this.version_info )
					 console.log(this.sitelist[1] )
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