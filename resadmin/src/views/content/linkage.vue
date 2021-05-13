<template>
	<div class="app-container">
		
		<el-dialog :fullscreen="false" title="联动信息" :visible.sync="dialogFormVisible"  v-if="v">
		  <el-form :model="form">
			  
			  <el-form-item label="英文名称" :label-width="formLabelWidth">
			    <el-input v-model="form.keyid_input" autocomplete="off"></el-input>
			  </el-form-item>
			  
		    <el-form-item label="名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
			
			<el-form-item label="排序" :label-width="formLabelWidth">
			  <el-input v-model="form.listorder" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="描述" :label-width="formLabelWidth">
			  <el-input v-model="form.description" autocomplete="off"></el-input>
			</el-form-item>
			 
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
		  </div>
		</el-dialog>
		
		
		<el-row>
		  <el-col :span="2">
			  
<el-button type="success" @click="handleAdd()">添加</el-button> 
		  </el-col>
		  <el-col :span="22">
			  
			  	<!-- <el-input placeholder="关键词" v-model="filterText" style="margin-bottom:30px;"></el-input> -->
		  </el-col>
		</el-row>
		
		<el-table :data="datalist" style="width: 100%">
		
		
			<el-table-column label="排序" width="">
				<template slot-scope="scope">
					{{ scope.row.listorder }}
		
				</template>
			</el-table-column>
		
			<el-table-column label="keyid" width="">
				<template slot-scope="scope">
					<!-- <i class="el-icon-time"></i> -->
					<span style="margin-left: 10px">{{ scope.row.linkageid }}</span>
				</template>
			</el-table-column>
			<el-table-column label="名称" width="">
				<template slot-scope="scope">
					{{ scope.row.name }}
		
				</template>
			</el-table-column>
			
		
			<el-table-column label="描述" width="">
				<template slot-scope="scope">
					{{ scope.row.description }}
		
				</template>
			</el-table-column>
			
		
			<el-table-column label="操作"  width="250" fixed="right">
				<template slot-scope="scope">
		
		<el-button size="mini" @click="handleSub(scope.$index, scope.row)">管理子菜单</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	
		

	</div>
</template>

<script>
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		linkage_list,linkage_delete,linkage_edit
	} from '@/api/linkage.js'
	 let id = 1000;
	export default {


		data() {
			return {
				dialogFormVisible: false,
				v: false,
				form: {
				  keyid_input: '',
				  name: '',
				  listorder: '',
				  description: '',
				},
				formLabelWidth: '120px',
				filterText: '',
				 
				datalist: [],
				kongge:'&nbsp;&nbsp;&nbsp;&nbsp;'

			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val)
			}
		},
		created() {
			this.init()
		},

		methods: {
			init() {

				this.fetchData()
			},
			fetchData() {
				_g.openGlobalLoading()

				const params = {
					page: this.currentPage,
					pagesize: this.pagesize,
					userid: this.$store.state.user.userid,
				}
				linkage_list(params).then(response => {
					_g.closeGlobalLoading()
					// this.version_info = response.version_info
					this.datalist = response.items
					// this.sitelist = response.sitelist
					// this.catlist = response.catlist
					console.log(this.datalist)

					// this.dataCount = parseInt(response.dataCount)
					this.v = true
				})
				// this.listLoading = false
			},
		
			frominfo() {
				console.log(this.form)
			 let resparams=JSON.stringify(this.form)
			  console.log(resparams)
			  const params = {
			  	resparams: resparams,
			  	userid: this.$store.state.user.userid
			  }
				linkage_edit(params).then(
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
				  keyid_input: '',
				  name: '',
				  listorder: '',
				  description: '',
				}
				 this.form = rowi
				 // console.log(this.default_keys)
			 },
			 handleEdit(index, row) {
				 
				 this.dialogFormVisible = true
				 
				 let rowi = JSON.parse(JSON.stringify(row))
				   
				    // rowi.priv = rowi.priv?rowi.priv.split(','):[]
				let selfmain =  this 
				
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
				  	linkage_delete(params).then(response => {
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

		},

	}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>