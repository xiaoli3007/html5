<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="活动名称" prop="title">
			<el-input v-model="ruleForm.title"></el-input>
		</el-form-item>
		<el-form-item label="活动区域" prop="region">
			<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="活动时间" required>
			<el-col :span="11">
				<el-form-item prop="date1">
					<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.date1"
					 style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-form-item prop="date2">
					<el-time-picker type="fixed-time" format="HH 时 mm 分 ss 秒" value-format="HH:mm:ss" placeholder="选择时间" v-model="ruleForm.date2"
					 style="width: 100%;"></el-time-picker>
				</el-form-item>
			</el-col>
		</el-form-item>
		<el-form-item label="即时配送" prop="delivery">
			<el-switch v-model="ruleForm.delivery"></el-switch>
		</el-form-item>
		<el-form-item label="活动性质" prop="type">
			<el-checkbox-group v-model="ruleForm.type">
				<el-checkbox label="1" name="type">餐厅线上活动</el-checkbox>
				<el-checkbox label="2" name="type">地推活动</el-checkbox>
				<el-checkbox label="3" name="type">线下主题活动</el-checkbox>
				<el-checkbox label="4" name="type"> 单纯品牌曝光</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="特殊资源" prop="resource">
			<el-radio-group v-model="ruleForm.resource">
				<el-radio label="11">线上品牌商赞助</el-radio>
				<el-radio label="22">线下场地免费</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="活动形式" prop="content">
			<el-input type="textarea" v-model="ruleForm.content"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')"  v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import {
		insertContent,getContentOne
	} from '@/api/content.js'

	export default {
		data() {
			return {
				ruleForm: {
					title: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					content: ''
				},
				rules: {
					title: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 500,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: false,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'string',
						required: false,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'string',
						required: false,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: false,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: false,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					content: [{
						required: false,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				 fullscreenLoading: false
			};
		},
		created() {
			// console.log(this.tableData3)
			this.id = {id:this.$route.params.id}
			this.fetchOneData()
		},
		methods: {
			 fetchOneData() {
				 _g.openGlobalLoading()
				getContentOne(this.id).then(response => {
					// console.log(response)
					_g.closeGlobalLoading()
					this.ruleForm = response['data']
				})
			
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm);
						// alert('submit!');
						  this.fullscreenLoading = true;
						insertContent(this.ruleForm).then(response => {
							//console.log(response)
							 
							if(response.result=='success'){
								this.$notify({
								  title: '成功',
								  message: '修改成功',
								  type: 'success'
								});
								 this.fullscreenLoading = false; 
								this.$router.replace({ name: 'contentlist' })
							}else{
								 this.fullscreenLoading = false; 
								this.$notify.error({
								  title: '错误',
								  message: response.msg
								});
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
			}
		}
	}
</script>
