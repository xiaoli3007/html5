<template>
	<div class="app-container">
		<!-- 字段添加-------------------------- -->
		<el-dialog title="字段信息" :visible.sync="dialogFormVisible" v-if="v">
			<el-form :model="form" :rules="rules" ref="ruleFormadd">

				<el-form-item label="模型" :label-width="formLabelWidth">
					<el-radio-group v-model="form.modelid" disabled>
						<el-radio v-for="(item, index) in model_list" :key="index" @change="checkmodelid(item.modelid)" :label="item.modelid">{{item.name}}</el-radio>
					</el-radio-group>

				</el-form-item>


				<el-form-item  prop="formtype" label="类型" :label-width="formLabelWidth" >
					<el-select @change="form_type_change" v-model="form.formtype" placeholder="类型">

						<el-option v-for="(item, index) in add_field_type" :key="index" :label="item" :value="index"></el-option>

					</el-select>

				</el-form-item>


				<el-form-item  prop="field" label="字段名" :label-width="formLabelWidth">
					<el-input v-model="form.field" autocomplete="off"></el-input>
				</el-form-item>


				<el-form-item prop="name" label="字段别名" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item v-if="!no_issearch.includes(form.formtype)" label="是否作为搜索条件" :label-width="formLabelWidth">
					<el-radio-group v-model="form.issearch">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>

				  
			 <el-form-item prop="setting.linkageid" label="联动菜单" :label-width="formLabelWidth" v-if="form.formtype=='linkage'"  key="setting.linkageid">
					<el-select v-model="form.setting.linkageid" placeholder="联动菜单">
						<el-option v-for="(item, index) in linkage_list" :key="index" :label="item.name" :value="item.linkageid"></el-option>

					</el-select>

				</el-form-item> 

				<el-form-item v-if="!no_default.includes(form.formtype)" label="默认值" :label-width="formLabelWidth">
					<el-input v-model="form.setting.defaultvalue" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item v-if="form.formtype=='box'" label="选项类型" :label-width="formLabelWidth">
					<el-radio-group v-model="form.setting.boxtype">
						<el-radio v-for="(item, index) in boxtype_list" :key="index" :label="index">{{item}}</el-radio>
					</el-radio-group>

				</el-form-item>

				<el-form-item prop="setting.options" v-if="form.formtype=='box'" label="选项列表" :label-width="formLabelWidth" key="setting.options">
					<el-input type="textarea" v-model="form.setting.options" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
				</el-form-item>

				<el-form-item v-if="form.formtype=='datetime'" label="时间格式" :label-width="formLabelWidth">
					<el-radio-group v-model="form.setting.fieldtype">
						<el-radio v-for="(item, index) in date_fieldtype_list" :key="index" :label="index">{{item}}</el-radio>
					</el-radio-group>

				</el-form-item>

				<el-form-item prop="minlength" label="最小值" :label-width="formLabelWidth">
					<el-input v-model="form.minlength" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="maxlength" label="最大值" :label-width="formLabelWidth">
					<el-input v-model="form.maxlength" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="fromsiteinfo('ruleFormadd')">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 字段编辑-------------------------- -->
		<el-dialog title="字段信息编辑---" :visible.sync="dialogFormVisible_edit" v-if="v">
			<el-form :model="edit_form" :rules="rules" ref="ruleForm">

				<el-form-item label="模型" :label-width="formLabelWidth">
					<el-radio-group v-model="edit_form.modelid" disabled>
						<el-radio v-for="(item, index) in model_list" :key="index" @change="checkmodelid(item.modelid)" :label="item.modelid">{{item.name}}</el-radio>
					</el-radio-group>

				</el-form-item>

				<el-form-item label="类型" :label-width="formLabelWidth">
					<el-select disabled v-model="edit_form.formtype" placeholder="类型">

						<el-option v-for="(item, index) in all_field_type" :key="index" :label="item" :value="index"></el-option>

					</el-select>

				</el-form-item>


				<el-form-item label="字段名" :label-width="formLabelWidth">
					<el-input v-model="edit_form.field" autocomplete="off" :disabled="true"></el-input>
				</el-form-item>


				<el-form-item prop="name" label="字段别名" :label-width="formLabelWidth">
					<el-input v-model="edit_form.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item v-if="!no_issearch.includes(edit_form.formtype)" label="是否作为搜索条件" :label-width="formLabelWidth">
					<el-radio-group v-model="edit_form.issearch">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>


				<el-form-item prop="setting.linkageid" label="联动菜单" :label-width="formLabelWidth" v-if="edit_form.formtype=='linkage'" key="setting.linkageid">
					<el-select v-model="edit_form.setting.linkageid" placeholder="联动菜单">

						<el-option v-for="(item, index) in linkage_list" :key="index" :label="item.name" :value="item.linkageid"></el-option>

					</el-select>

				</el-form-item>

				<el-form-item v-if="!no_default.includes(edit_form.formtype)" label="默认值" :label-width="formLabelWidth">
					<el-input v-model="edit_form.setting.defaultvalue" autocomplete="off"></el-input>
				</el-form-item>



				<el-form-item v-if="edit_form.formtype=='box'" label="选项类型" :label-width="formLabelWidth">
					<el-radio-group v-model="edit_form.setting.boxtype">
						<el-radio v-for="(item, index) in boxtype_list" :key="index" :label="index">{{item}}</el-radio>
					</el-radio-group>

				</el-form-item>

				<el-form-item prop="setting.options" v-if="edit_form.formtype=='box'" label="选项列表" :label-width="formLabelWidth" key="setting.options">
					<el-input type="textarea" v-model="edit_form.setting.options" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
				</el-form-item>

				<el-form-item v-if="edit_form.formtype=='datetime'" label="时间格式" :label-width="formLabelWidth">
					<el-radio-group v-model="edit_form.setting.fieldtype">
						<el-radio v-for="(item, index) in date_fieldtype_list" :key="index" :label="index">{{item}}</el-radio>
					</el-radio-group>

				</el-form-item>

				<el-form-item prop="minlength" label="最小值" :label-width="formLabelWidth">
					<el-input v-model="edit_form.minlength" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="maxlength" label="最大值" :label-width="formLabelWidth">
					<el-input v-model="edit_form.maxlength" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible_edit = false">取 消</el-button>
				<el-button type="primary" @click="fromsiteinfo('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 字段搜索-------------------------- -->
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



		<!-- 字段列表-------------------------- -->

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
		model_field_delete,
		model_field_disabled,
		model_field_name_isexit,
		model_field_linkageid_isexit,
	} from '@/api/admin_model_field.js'
	// import router from '@/router/index.js'
	export default {
		data() {
			var maxlength_fuc = (rule, value, callback) => {
				console.log(rule)
				if (this.form.minlength == 0 && value == 0) {
					callback();
				}
				if (value <= this.form.minlength) {
					callback(new Error('请输入大于最小值的数字值'));
					console.log('----')
				} else {
					callback();
				}
			};
			var isexit_name = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入表名'));
				} else {
					console.log(value)
					const params = {
						field: value,
						modelid: this.modelid
					}
					model_field_name_isexit(params).then(response => {
						console.log(response)
						if (response.code != 20000) {
							callback(new Error(response.message));
						} else {
							callback();
						}

					})

				}
			};
			var isexit_linkageid = (rule, value, callback) => {

				console.log('联动验证')

				if (value === '') {
					callback(new Error('请选择联动菜单'));
				} else {

					const params = {
						linkageid: value,
						modelid: this.modelid,
						fieldid: this.is_edit ? this.edit_form.setting.linkageid : '',
					}
					model_field_linkageid_isexit(params).then(response => {
						console.log(response)
						if (response.code != 20000) {
							callback(new Error(response.message));
						} else {
							callback();
						}

					})

				}
			};
			return {
				dialogFormVisible: false,
				dialogFormVisible_edit: false,
				dataCount: null,
				currentPage: null,
				pagesize: 20,
				rules: {
					formtype: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur'
					}, ],
					field: [{
							required: true,
							message: '请输入英文表名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 30,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						},
						{
							pattern: /^([a-zA-Z0-9]|[_]){0,20}$/,
							message: '必须为英文或英文加数字',
							trigger: 'blur'
						},
						{
							validator: isexit_name,
							trigger: 'blur'
						}
					],
					name: [{
							required: true,
							message: '请输入字段别名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 50,
							message: '长度在 2 到 50 个字符',
							trigger: 'blur'
						}
					],
					setting: {
						linkageid: [{
								required: true,
								message: '请选择联动菜单',
								trigger: 'change'
							},
							{
								validator: isexit_linkageid,
								trigger: 'change'
							}
						],
						options: [{
							required: true,
							message: '请填入选项列表',
							trigger: 'blur'
						}],
					}
					,
					minlength: [{
						pattern: /^([0-9]+)$/,
						message: '必须为数字',
						trigger: 'blur'
					}, ],
					maxlength: [{
							pattern: /^([0-9]+)$/,
							message: '必须为数字',
							trigger: 'blur'
						},
						{
							validator: maxlength_fuc,
							trigger: 'blur'
						},
					],
					
				},
				form: {
					field: '',
					name: '',
					modelid: this.modelid,
					formtype: '',
					minlength: 0,
					maxlength: 0,
					setting: {
						linkageid: '',
						boxtype: 'radio',
						options: '选项名称1|选项值1',
						fieldtype: 'date',
						defaultvalue: '',
					},
					issearch: '0',
					 setting_linkageid: '',
					// setting_boxtype: 'radio',
					// setting_options: '选项名称1|选项值1',
					// setting_fieldtype:'date',
					//setting_defaultvalue:'',
				},
				edit_form: {
					field: '',
					name: '',
					modelid: this.modelid,
					formtype: '',
					minlength: 0,
					maxlength: 0,
					setting: {
						linkageid: '',
						boxtype: 'radio',
						options: '选项名称1|选项值1',
						fieldtype: 'date',
						defaultvalue: '',
					},
					issearch: 0,
				},
				no_default: ["datetime", "linkage"],
				no_issearch: ["image"],
				formLabelWidth: '130px',
				table: false,
				v: false,
				is_edit: false, //是否为编辑
				modelid: 0,
				datalist: [],
				site_list: [],
				model_list: [],
				linkage_list: [],
				boxtype_list: [],
				date_fieldtype_list: [],
				searchform: {
					name: '',
					formtype: ''
				},
				all_field_type: {},
				add_field_type: {},
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
			form_type_change(item){
				if(item=='linkage'){
					console.log(item)
					 // this.$refs['ruleFormadd'].clearValidate();
					// this.rules.
				}
				
			},
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
						modelid: this.modelid,
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

			fromsiteinfo(formName) {

				this.$refs[formName].validate((valid) => {
					if (valid) {
						// this.form.priv =this.$refs.tree.getCheckedKeys()				 
						let resparams = ''
						if (this.is_edit) {
							console.log(this.edit_form)
							resparams = JSON.stringify(this.edit_form)
						} else {
							console.log(this.form)
							resparams = JSON.stringify(this.form)
						}

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

						if (this.is_edit) {
							this.dialogFormVisible_edit = false
						} else {
							this.dialogFormVisible = false
						}


					} else {
						console.log(this.form)
						console.log('error submit!!');
						return false;
					}
				});


			},
			handleAdd() {


				let rowi = {
					field: '',
					name: '',
					modelid: this.modelid,
					formtype: '',
					minlength: 0,
					maxlength: 0,
					setting_linkageid:'',
					setting: {
						linkageid: '',
						boxtype: 'radio',
						options: '选项名称1|选项值1',
						fieldtype: 'date',
						defaultvalue: '',
					},
					issearch: '0',
				}
				this.form = rowi
				this.is_edit = false

				setTimeout(() => {
					this.dialogFormVisible = true
				}, 200);
			},
			handleEdit(index, row) {


				let rowi = JSON.parse(JSON.stringify(row))
				// console.log(rowi)
				console.log(this.edit_form)
				this.edit_form.fieldid = rowi.fieldid
				this.edit_form.field = rowi.field
				this.edit_form.name = rowi.name
				this.edit_form.formtype = rowi.formtype

				this.edit_form.minlength = rowi.minlength
				this.edit_form.maxlength = rowi.maxlength
				this.edit_form.issearch = rowi.issearch
				this.edit_form.setting.boxtype = rowi.setting.boxtype
				this.edit_form.setting.linkageid = rowi.setting.linkageid
				this.edit_form.setting.options = rowi.setting.options
				this.edit_form.setting.fieldtype = rowi.setting.fieldtype
				this.edit_form.setting.defaultvalue = rowi.setting.defaultvalue
				this.is_edit = true
				console.log('ssssss');
				setTimeout(() => {
					this.dialogFormVisible_edit = true
				}, 200);
			},
			handlejinyong(index, row, disabled) {
				console.log(row)
				const params = {
					userid: this.$store.state.user.userid,
					fieldid: row.fieldid,
					disabled: disabled
				}
				let text = '启用'
				if (disabled == 1) {
					text = '禁用'
				}

				_g.openGlobalLoading()
				model_field_disabled(params).then(response => {
					// console.log(response)
					_g.closeGlobalLoading()
					if (response.code == 20000) {
						_g.toastMsg('success', text + '成功', this)
						this.init()
					} else {
						_g.toastMsg('error', text + '错误', this)
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
					this.add_field_type = response.add_field
					this.linkage_list = response.linkage_list
					this.model_list = response.model_list
					this.boxtype_list = response.boxtype_list
					this.date_fieldtype_list = response.date_fieldtype_list
					console.log(111)
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
