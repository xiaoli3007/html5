<template>
	<div class="app-container">

		<el-dialog :fullscreen="false" title="栏目信息" :visible.sync="dialogFormVisible" v-if="v">
			<el-form :model="form">
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="form.catname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" :label-width="formLabelWidth">
					<el-input v-model="form.description" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item  label="模型" :label-width="formLabelWidth">
					<el-select v-if="form.catid==''" v-model="form.modelid"  placeholder="请选择">
						<el-option v-for="item in modellist" :key="item.modelid" :label="item.name" :value="item.modelid">
						</el-option>
					</el-select>
					

					<el-select  v-if="form.catid!=''" v-model="form.modelid" disabled placeholder="请选择">
						<el-option v-for="item in modellist" :key="item.modelid" :label="item.name" :value="item.modelid">
						</el-option>
					</el-select>

				</el-form-item>

				<el-form-item label="列表模板" :label-width="formLabelWidth">

					<el-select v-model="form.list_template" placeholder="请选择">
						<el-option v-for="(item, index) in list_template_data" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>

				</el-form-item>

				<el-form-item label="详情模板" :label-width="formLabelWidth">

					<el-select v-model="form.show_template" placeholder="请选择">
						<el-option v-for="(item, index) in show_template_data" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>

				</el-form-item>




			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
			</div>
		</el-dialog>



		<el-button type="success" @click="handleAdd()">添加</el-button>

		<el-table :data="datalist" style="width: 100%">

			<!-- <el-table-column type="expand">
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
			    </el-table-column> -->

			<el-table-column label="catid" width="">
				<template slot-scope="scope">
					<!-- <i class="el-icon-time"></i> -->
					<span style="margin-left: 10px">{{ scope.row.catid }}</span>
				</template>
			</el-table-column>
			<el-table-column label="名称" width="">
				<template slot-scope="scope">
					{{ scope.row.catname }}

				</template>
			</el-table-column>

			<el-table-column label="描述" width="">
				<template slot-scope="scope">
					{{ scope.row.description }}

				</template>
			</el-table-column>
			
			<el-table-column label="模型" width="">
				<template slot-scope="scope">
					{{ scope.row.model_name }}
			
				</template>
			</el-table-column>
			
			<el-table-column label="站点" width="">
				<template slot-scope="scope">
					{{ scope.row.site_name }}

				</template>
			</el-table-column>



			<el-table-column label="操作">
				<template slot-scope="scope">


					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		cat_info,
		cat_list,cat_edit,
		cat_delete
	} from '@/api/category'



	// import router from '@/router/index.js'
	export default {
		data() {
			return {
				dialogFormVisible: false,
				dataCount: null,
				currentPage: null,
				pagesize: 12,
				form: {
					catid: '',
					catname: '',
					description: '',
					siteid: getsiteid()  ? getsiteid() : '1',
					modelid: '',
					list_template: '',
					show_template: ''
					// priv: [],
				},
				formLabelWidth: '120px',
				table: false,
				v: false,
				siteid: getsiteid()  ? getsiteid() : '1',
				datalist: [],
				sitelist: [],
				modellist: [],
				list_template_data: [],
				show_template_data: [],
				privlist: [],
				 
			}
		},
		created() {
			this.init()
			var aa = getsiteid()
			console.log(aa)
		},
		watch: {
			'$route'(to, from) {
				// console.log(to)
				// console.log(from)
				this.init()
			}
		},
		methods: {

			checksiteid(siteid) {
				console.log(siteid)

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
				let resparams = JSON.stringify(this.form)

				console.log(resparams)
				// return
				const params = {
					resparams: resparams,
					userid: this.$store.state.user.userid
				}
				cat_edit(params).then(
					response => {
						console.log(response)
						 this.init()
						_g.toastMsg('success', response.message, this)
					})
				this.dialogFormVisible = false
			},
			handleAdd() {

				this.dialogFormVisible = true
				let rowi = {
					catid: '',
					catname: '',
					description: '',
					siteid: getsiteid() ? getsiteid() : '1',
					modelid: '',
					list_template: '',
					show_template: '',

					// priv: [],
				}
				console.log(rowi)
				this.form = rowi
			},
			handleEdit(index, row) {

				this.dialogFormVisible = true

				let rowi = JSON.parse(JSON.stringify(row))
				console.log(rowi)
				// rowi.catidpriv = rowi.catidpriv?rowi.catidpriv.split(','):[]
				// // console.log(rowi)
				// rowi.priv = rowi.priv?rowi.priv.split(','):[]

				let selfmain = this


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
						catid: row.catid
					}
					_g.openGlobalLoading()
					cat_delete(params).then(response => {
						// console.log(response)
						_g.closeGlobalLoading()
						if (response.code == 20000) {
							_g.toastMsg('success', '删除成功', this)
							setTimeout(() => {
								_g.shallowRefresh(this.$route.name)
							}, 500)
						} else {
							_g.toastMsg('error', '删除错误', this)
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
					siteid: this.siteid,
				}
				cat_list(params).then(response => {
					_g.closeGlobalLoading()
					// this.version_info = response.version_info
					this.datalist = response.items
					this.modellist = response.modellist

					this.show_template_data = response.show_template_list
					this.list_template_data = response.list_template_list

					// console.log(this.version_info )
					// console.log(this.sitelist[1] )
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
