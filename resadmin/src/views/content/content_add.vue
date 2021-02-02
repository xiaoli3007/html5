<template>

	<div class="app-container" v-if="taskin">
 								
		<el-page-header @back="gotoback" :content="title">
		</el-page-header>
		
			
			
		<div style="padding-top: 20px;">
			<el-row>

				<el-col :span="24" justify="left" align="left">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item v-for="(item, linkage_index) in form_linkage" :key="linkage_index">
							<el-cascader :placeholder="item.name" :options="item.data" v-model="all_form_data.form_linkage_data[linkage_index]"
							 :props="props" @change="handleChange"></el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>

								
			<el-row>

				<el-col :span="24" justify="left" align="left">
					<el-form :label-position="labelPosition" :model="programForm" :inline="false" size="medium" ref="ruleForm" :rules="rules"
					 label-width="100px" class="demo-ruleForm" v-if="taskformin">

						<el-row>


							<div v-for="(from_zhu, index) in all_form_field" :key="index">
								<el-col :span="24" justify="left" align="left">


									<el-form-item v-if="from_zhu.formtype=='text'" :label="from_zhu.name"  :prop="from_zhu.field">
										<el-input v-model="programForm[from_zhu.field]"></el-input>
									</el-form-item>

									<el-form-item v-if="from_zhu.formtype=='image'">
										<el-upload class="avatar-uploader" :action="from_zhu.uploadurl" :show-file-list="false"
										 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
											<img v-if="programForm[from_zhu.field]" :src="programForm[from_zhu.field]" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
											<div class="el-upload__tip" slot="tip">{{from_zhu.name}}</div>
										</el-upload>
									</el-form-item>

									<el-form-item v-if="from_zhu.formtype=='textarea'" :label="from_zhu.name" :prop="from_zhu.field">
										<el-input type="textarea" v-model="programForm[from_zhu.field]" :maxlength="from_zhu.maxlength" :minlength="from_zhu.minlength" show-word-limit></el-input>
									</el-form-item>
										
										<myediter  v-if="from_zhu.formtype=='editor'"  :v_model_name="from_zhu.name" :v_model_field="from_zhu.field" v-on:passtoparent="catchDatahtml"></myediter>
									
									<el-form-item v-if="from_zhu.formtype=='select'" :label="from_zhu.name" :prop="from_zhu.field">
										<el-select v-model="programForm[from_zhu.field]" placeholder="">
											<el-option v-for="(item, sindex) in from_zhu.dataarray" :key="sindex" :label="item.label" :value="item.value"></el-option>

										</el-select>
									</el-form-item>


									<el-form-item v-if="from_zhu.formtype=='radio'" :label="from_zhu.name" :prop="from_zhu.field">
										<el-radio-group v-model="programForm[from_zhu.field]">
											<el-radio v-for="(item, sindex) in from_zhu.dataarray" :key="sindex" :label="item.label">{{item.name}}</el-radio>

										</el-radio-group>
									</el-form-item>

									<el-form-item v-if="from_zhu.formtype=='checkbox'" :label="from_zhu.name" :prop="from_zhu.field">
										<el-checkbox-group v-model="programForm[from_zhu.field]">
											<el-checkbox v-for="(item, sindex) in from_zhu.dataarray" :key="sindex"   :label="item.label">{{item.name}}</el-checkbox>

										</el-checkbox-group>
									</el-form-item>


									<el-form-item v-if="from_zhu.formtype=='datetime'" :label="from_zhu.name" :prop="from_zhu.field">
										<el-date-picker  placeholder="选择日期" :type="from_zhu.date_form_type" :format="from_zhu.element_format"  value-format="timestamp" v-model="programForm[from_zhu.field]"   style="width: 100%;"></el-date-picker>


									</el-form-item>
								</el-col>
							</div>



						</el-row>


						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
							<el-button @click="resetForm('ruleForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>


		</div>
	</div>
</template>

<script>
	// 引入 wangEditor
	import wangEditor from 'wangeditor'
	import _ from 'lodash'
	import {
		getshow,
		get_model_field,publish_res
	} from '@/api/content'
	import _g from '@/utils/global.js'
	// import myediter from './components'
	import myediter from '@/components/myediter'

	export default {
		components: {
		  myediter	  
		},
		data() {
			return {
				imageUrl: '',
				props: {
					multiple: true,
					expandTrigger: 'hover',
					emitPath: false,
					checkStrictly: false
				},
				catid: 0,
				news_id: 0,
				program: null,
				data: null,
				taskin: false,
				taskformin: false,
				title: '资源添加',
				activetablist: null,
				labelPosition: 'right',
				programForm: {
					 
				},
				ruleForm: {
					name: '',
					region: '',
					type: [],
					date1: '',
					resource: '',
					desc: ''
				},
				rules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 200,
							message: '长度在 3 到 200 个字符',
							trigger: 'blur'
						}
					],

				},

				all_form_data: {
					form_linkage_data: [],

				},
				all_form_field: [],
				form_linkage: [],
				search_linkage_default_string: '',
				editor: null,
				editorData: '',
			}
		},
		filters: {

		},
		 mounted() {
			 
			 setTimeout(() => {
			 	 const editor = new wangEditor(`#demo1`)
			 	 // 配置 onchange 回调函数，将数据同步到 vue 中
			 	 editor.config.onchange = (newHtml) => {
			 	    this.editorData = newHtml
			 	 }
			 	 // 创建编辑器
			 	 editor.create()
			 	 this.editor = editor
				 
			 }, 1000);
			 
		    
		  },
		created() {

			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			// this.ebookid = 446654
			// console.log(this.ebookid);
			this.fetchmodelfield()
			if (this.news_id != 0) {
				this.init()
			} else {
				this.taskin = true
			}

		},
		methods: {
			catchDatahtml(data) {
			      // 通过代码获取编辑器内容
			       console.log(data)
				   
				   this.$set(this.programForm, data.name, data.value)
				    console.log(this.programForm)
				   
			    },
			 getEditorData() {
			      // 通过代码获取编辑器内容
			      let data = this.editor.txt.html()
			      alert(data)
			    },
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file)
				// this.imageUrl = URL.createObjectURL(file.raw);
				// this.programForm[res.field] = res.fileurl
				
				this.$set(this.programForm, res.field, res.fileurl)
				
			},
			beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				//   this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			handleChange(value) {

				let linkage_data = this.all_form_data.form_linkage_data
				//联动菜单拼接 ==================================
				let list_select_linkage = []
				_(linkage_data).forEach(function(value, key) {
					list_select_linkage.push(value)
				});
				this.search_linkage_default_string = list_select_linkage.join()
				console.log(this.search_linkage_default_string);
			},
			fetchmodelfield() {

				const params = {
					catid: this.catid,
					news_id: this.news_id,
				}
				var selfmain = this
				get_model_field(params).then(response => {

					let value = response.items
					console.log(value);
					let temp_linkage_data = []
					_(value.form_linkage).forEach(function(value2, key2) {
						// console.log(value2)
						_.set(temp_linkage_data, key2, value2.value);
					});

					_(value.form_base).forEach(function(value2, key2) {

						// selfmain.programForm[value2.field] = value2.value
						
						selfmain.$set(selfmain.programForm, value2.field, value2.value)
						
					});
					console.log(selfmain.programForm)

					selfmain.all_form_field = value.form_base
					selfmain.form_linkage = value.form_linkage
					selfmain.all_form_data.form_linkage_data = temp_linkage_data
					
					this.taskformin = true

				})
			},
			submitForm(formName) {
			 
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					// alert('submit!');
					// console.log(this.programForm)
					// console.log(this.search_linkage_default_string)
					
					let resparams=JSON.stringify(this.programForm)
					  console.log(resparams)
						return
					 const params = {
					 	catid: this.catid,
					 	edit_id: this.news_id,
						resparams: resparams,
						search_linkage_default_string: this.search_linkage_default_string,
						sysadd:1,
					 	userid: this.$store.state.user.userid
					 }
					// console.log(this.form.content)
					
					publish_res(params).then(response => {
						 console.log(response)
					 	 
						if (response.code == 20000) {
							 
							 _g.toastMsg('success', '提交成功！', this)
							 
							 this.$router.replace({
							 	name: 'Content_table_list',
							 	query: {
							 		catid: this.catid,
							 	}
							 })
						}else{
							 _g.toastMsg('error', '提交失败！', this)
						}
					})
					
					
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

			gotoback(a) {
				// console.log(a);
				this.$router.replace({
					name: 'Content_table_list'
				})
			},
			fetchData() {
				const loading = this.$loading({
					lock: true,
					text: '加载中...',
					spinner: 'el-icon-loading',
					background: '#000'
				});
				const params = {
					catid: this.catid,
					news_id: this.news_id,
					userid: this.$store.state.user.userid
				}
				getshow(params).then(response => {
					loading.close();
					// this.data = response.items
					this.program = response.program_info
					this.taskin = true
					this.title = '（资源）'+this.program.title +'（编辑）'
					console.log(this.program);
				})
			},

			init() {
				this.fetchData()
			},

		},
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
