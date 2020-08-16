<template>
	
	
	
	<div class="app-container" v-if="taskin">

 <el-page-header @back="gotoback" :content="title">
	</el-page-header> 
	 
	 <div style="padding-top: 20px;">
		<el-row>
			
			<el-col :span="24"   justify="left" align="left">
					<el-form :label-position="labelPosition" :model="ruleForm" :inline="false"  size="medium" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item label="活动名称" prop="name">
					    <el-input v-model="ruleForm.name"></el-input>
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
					        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="2">-</el-col>
					    <el-col :span="11">
					      <el-form-item prop="date2">
					        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
					      </el-form-item>
					    </el-col>
					  </el-form-item>
					  <el-form-item label="即时配送" prop="delivery">
					    <el-switch v-model="ruleForm.delivery"></el-switch>
					  </el-form-item>
					  <el-form-item label="活动性质" prop="type">
					    <el-checkbox-group v-model="ruleForm.type">
					      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					      <el-checkbox label="地推活动" name="type"></el-checkbox>
					      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
					      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
					    </el-checkbox-group>
					  </el-form-item>
					  <el-form-item label="特殊资源" prop="resource">
					    <el-radio-group v-model="ruleForm.resource">
					      <el-radio label="线上品牌商赞助"></el-radio>
					      <el-radio label="线下场地免费"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="活动形式" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
					  </el-form-item>
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
	import {
		getshow
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				catid: 0,
				news_id: 0,
				program: null,
				data: null,
				taskin: false,
				title:'资源添加',
				activetablist:null,
				 labelPosition: 'right',
				 ruleForm: {
				          name: '',
				          region: '',
				          date1: '',
				          date2: '',
				          delivery: false,
				          type: [],
				          resource: '',
				          desc: ''
				        },
				        rules: {
				          name: [
				            { required: true, message: '请输入活动名称', trigger: 'blur' },
				            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				          ],
				          region: [
				            { required: true, message: '请选择活动区域', trigger: 'change' }
				          ],
				          date1: [
				            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				          ],
				          date2: [
				            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				          ],
				          type: [
				            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				          ],
				          resource: [
				            { required: true, message: '请选择活动资源', trigger: 'change' }
				          ],
				          desc: [
				            { required: true, message: '请填写活动形式', trigger: 'blur' }
				          ]
				        },
			}
		},
		filters: {

		},
		created() {

			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			// this.ebookid = 446654
			// console.log(this.ebookid);
			if(this.news_id!=0){
				this.init()
			}else{
				this.taskin = true
			}
			
		 	
		},
		methods: {
		  submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					alert('submit!');
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			  },
			  resetForm(formName) {
				this.$refs[formName].resetFields();
			  },
			//  readtask(a) {
			// 	 // console.log(a);
			// 	this.$router.replace({ name: 'Read' , query:{  taskid: a }})
			// },
			
			gotoback(a) {
				// console.log(a);
				this.$router.replace({
					name: 'Model_table_list'
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
					userid:this.$store.state.user.userid
				}
				getshow(params).then(response => {
					loading.close();
					// this.data = response.items
					this.program = response.program_info
					this.taskin = true
					//console.log(this.activetablist);
					
				})
				
					
			}, 

			init() {
				this.fetchData()
			},

		},
	}
</script>
