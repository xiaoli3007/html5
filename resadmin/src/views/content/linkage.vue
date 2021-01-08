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
			  
			  	<el-input placeholder="关键词" v-model="filterText" style="margin-bottom:30px;"></el-input>
		  </el-col>
		</el-row>
		
	
		

		<el-tree class="filter-tree" :data="datalist" :props="defaultProps" accordion :filter-node-method="filterNode" ref="tree2">

			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.data.value }} <label v-html="kongge"></label>{{ node.label }}</span>
				<span>
					<el-button v-if="node.data.parentid==0" type="text" size="mini" @click="() => update(node)">
						更新缓存
					</el-button>
					
					<el-button type="text" size="mini" @click="() => append(data,node)">
增加子菜单
					</el-button>
					
					<el-button type="text" size="mini" @click="() => edit(node)">
						修改
					</el-button>
					<el-button type="text" size="mini" @click="() => remove(node, data)">
						删除
					</el-button>
				</span>
			</span>

		</el-tree>

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
	} from '@/api/admin_linkage.js'
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
				data2: [{
					id: 1,
					label: 'Level one 1',
					children: [{
						id: 4,
						label: 'Level two 1-1',
						children: [{
							id: 9,
							label: 'Level three 1-1-1'
						}, {
							id: 10,
							label: 'Level three 1-1-2'
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
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
			filterNode(value, data) {
				if (!value) return true
				return data.label.indexOf(value) !== -1
			},
			append(data,node) {
				 console.log(data)
				console.log(node.data)
				const newChild = {
					id: 200000,
					label: 'testtest',
					value: 20000,
					children: []
				};
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.unshift(newChild);
				// data.children.push(newChild);
			},
			update(node) {
				console.log(node)
				console.log(node.data)
				// const newChild = {
				// 	id: id++,
				// 	label: 'testtest',
				// 	children: []
				// };
				// if (!data.children) {
				// 	this.$set(data, 'children', []);
				// }
				// data.children.push(newChild);
			},
			edit(node) {
				console.log(node)
				console.log(node.data)
				// const newChild = {
				// 	id: id++,
				// 	label: 'testtest',
				// 	children: []
				// };
				// if (!data.children) {
				// 	this.$set(data, 'children', []);
				// }
				// data.children.push(newChild);
			},

			remove(node, data) {
				// const parent = node.parent;
				// const children = parent.data.children || parent.data;
				// const index = children.findIndex(d => d.id === data.id);
				// children.splice(index, 1);
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