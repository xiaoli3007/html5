<template>
	<div class="app-container">

		<el-dialog title="字段信息" :visible.sync="dialogFormVisible" v-if="v">



			<el-form :model="form">

				<el-form-item label="字段名" :label-width="formLabelWidth">
					<el-input v-model="form.field" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="字段别名" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="模型" :label-width="formLabelWidth">
					<el-radio-group v-model="form.modelid" disabled>
						<el-radio v-for="(item, index) in model_list" :key="index" @change="checkmodelid(item.modelid)" :label="item.modelid">{{item.name}}</el-radio>
					</el-radio-group>

				</el-form-item>


				<el-form-item label="类型" :label-width="formLabelWidth">
					<el-input v-model="form.formtype" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
			</div>
		</el-dialog>

		<el-row>
			<el-col :span="2">

				<el-page-header @back="gotoback" :content="title">
				</el-page-header>
			</el-col>
			<el-col :span="22">


				<el-form :inline="true" :model="searchform" class="demo-form-inline">
					<el-form-item label="字段名">
						<el-input v-model="searchform.name" placeholder="字段名"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="searchform.formtype" placeholder="类型">

							<el-option v-for="(item, index) in all_field_type" :key="index" :label="item" :value="index"></el-option>

						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>

					<el-form-item>
						<el-button type="success" @click="handleAdd()">添加</el-button>
					</el-form-item>

				</el-form>

			</el-col>
		</el-row>





		<el-table :data="datalist" style="width: 100%">


			<el-table-column label="模型">
				<template slot-scope="scope">
					{{ scope.row.model_name }}
				</template>
			</el-table-column>

			<el-table-column label="fieldid">
				<template slot-scope="scope">
					<!-- <i class="el-icon-time"></i> -->
					<span style="margin-left: 10px">{{ scope.row.fieldid }}</span>
				</template>
			</el-table-column>

			<el-table-column label="field">
				<template slot-scope="scope">
					{{ scope.row.field }}

				</template>
			</el-table-column>



			<el-table-column label="字段名">
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>

			<el-table-column label="类型">
				<template slot-scope="scope">
					{{ scope.row.formtype }}
				</template>
			</el-table-column>

			<el-table-column label="是否主表">
				<template slot-scope="scope">
					{{ scope.row.issystem==1?'是':'否' }}
				</template>
			</el-table-column>


			<el-table-column label="操作" width="300">
				<template slot-scope="scope">


					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button v-if="scope.row.isno==0 && scope.row.disabled==0" size="mini" type="warning" @click="handlejinyong(scope.$index, scope.row,1)">禁用</el-button>
					<el-button v-if="scope.row.isno==0 && scope.row.disabled==1" size="mini" type="success" @click="handlejinyong(scope.$index, scope.row,0)">启用</el-button>



					<el-button v-if="scope.row.isno==0" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		model_field_list,
		model_field_edit,
		model_field_delete,model_field_disabled
	} from '@/api/admin_model_field.js'
	// import router from '@/router/index.js'
	export default {
		data() {
			return {
				dialogFormVisible: false,
				dataCount: null,
				currentPage: null,
				pagesize: 20,
				form: {
					field: '',
					name: '',
					modelid: this.modelid,
					formtype: '',
				},
				formLabelWidth: '120px',

				table: false,
				v: false,
				modelid: 0,
				datalist: [],
				site_list: [],
				model_list: [],
				searchform: {
					name: '',
					formtype: ''
				},
				all_field_type: {},
				title: '',
			}
		},
		created() {

			this.modelid = this.$route.query.modelid

			if (this.modelid != 0) {
				this.init()
			} else {
				this.taskin = true
			}

		},
		watch: {
			'$route'(to, from) {
				// console.log(to)
				// console.log(from)
				this.init()
			}
		},
		methods: {
			gotoback() {
				// console.log(a);
				this.$router.replace({
					name: 'MList'
				})
			},
			onSubmit() {
				console.log('submit!');
				console.log(this.searchform);

				let resparams = JSON.stringify(this.searchform)

				this.$router.push({
					path: this.$route.path,
					query: {
						page: 1,
						searchform: resparams,
					}
				})

			},
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
					if (data.searchform) {
						this.searchform = JSON.parse(data.searchform)
					} else {
						this.searchform = {
							name: '',
							formtype: ''
						}
					}
				}
			},
			handleCurrentChange(page) {
				this.$router.push({
					path: this.$route.path,
					query: {
						page: page,
						pagesize: this.pagesize,
						userid: this.$store.state.user.userid,
						modelid: this.modelid,
						searchform: JSON.stringify(this.searchform)
					}
				})
			},

			fromsiteinfo() {

				console.log(this.form)
				// return
				// this.form.priv =this.$refs.tree.getCheckedKeys()
				let resparams = JSON.stringify(this.form)

				console.log(resparams)

				const params = {
					resparams: resparams,
					userid: this.$store.state.user.userid
				}
				model_field_edit(params).then(
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
					field: '',
					name: '',
					modelid: this.modelid,
					formtype: '',
				}
				this.form = rowi
			},
			handleEdit(index, row) {

				this.dialogFormVisible = true

				let rowi = JSON.parse(JSON.stringify(row))
				console.log(rowi)

				this.form.field = rowi.field
				this.form.name = rowi.name
				this.form.formtype = rowi.formtype

				// console.log(index, row);
			},
			handlejinyong(index, row,disabled) {
				console.log(row)
				const params = {
					userid: this.$store.state.user.userid,
					fieldid: row.fieldid,
					disabled:disabled
				}
				let text = '启用'
				if(disabled==1){
					text = '禁用'
				}
				
				_g.openGlobalLoading()
				model_field_disabled(params).then(response => {
					// console.log(response)
					_g.closeGlobalLoading()
					if (response.code == 20000) {
						_g.toastMsg('success', text+'成功', this)
						this.init()
					} else {
						_g.toastMsg('error', text+'错误', this)
					}
				})
				
			},
			 
			handleDelete(index, row) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					const params = {
						userid: this.$store.state.user.userid,
						fieldid: row.fieldid
					}
					_g.openGlobalLoading()
					model_field_delete(params).then(response => {
						// console.log(response)
						_g.closeGlobalLoading()
						if (response.code == 20000) {
							_g.toastMsg('success', '删除成功', this)
							this.init()
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
					modelid: this.modelid,
					searchform: JSON.stringify(this.searchform)
				}
				model_field_list(params).then(response => {
					_g.closeGlobalLoading()

					this.datalist = response.items
					this.all_field_type = response.all_field
					// this.group_list = response.group_list
					this.model_list = response.model_list
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
