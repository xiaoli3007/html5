<template>
	
	
	
	<div class="app-container" v-if="taskin">

 <el-page-header @back="gotoback" :content="title">
	</el-page-header> 
	 
	 <div style="padding-top: 20px;">
		 <el-row>
		 	
		 	<el-col :span="24"   justify="left" align="left">
				<el-form :inline="true" class="demo-form-inline">
		 <el-form-item v-for="(item, linkage_index) in form_linkage" :key="linkage_index" >
		 	<el-cascader :placeholder="item.name"   :options="item.data" v-model="all_form_data.form_linkage_data[linkage_index]" :props="props"
		 	 @change="handleChange"></el-cascader>
		 </el-form-item> 
		 </el-form>
		 </el-col>
		 </el-row>
			 
		<el-row>
			
			<el-col :span="24"   justify="left" align="left">
					<el-form :label-position="labelPosition" :model="ruleForm" :inline="false"  size="medium" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				
				<el-row>		
				<div v-for="(from_zhu, index) in all_form_field" :key="index">
						<el-col :span="12"   justify="left" align="left">	
					  <el-form-item v-if="from_zhu.formtype=='text'" :label="from_zhu.name" >
					    <el-input  v-model="ruleForm.name"></el-input>
					  </el-form-item>
					  
					  <el-form-item  v-if="from_zhu.formtype=='select'" :label="from_zhu.name" prop="region">
					    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
					      <el-option v-for="(item, sindex) in from_zhu.dataarray" :key="sindex"  :label="item.label" :value="item.value"></el-option>
					       
					    </el-select>
					  </el-form-item>
					  
					  
					  <el-form-item v-if="from_zhu.formtype=='radio'" :label="from_zhu.name">
					    <el-radio-group v-model="ruleForm.resource">
					      <el-radio v-for="(item, sindex) in from_zhu.dataarray" :key="sindex"  :label="item.label">{{item.name}}</el-radio>
					       
					    </el-radio-group>
					  </el-form-item>
					  
					  <el-form-item v-if="from_zhu.formtype=='checkbox'" :label="from_zhu.name">
					    <el-checkbox-group v-model="ruleForm.type">
					      <el-checkbox v-for="(item, sindex) in from_zhu.dataarray" :key="sindex"  :label="item.label" >{{item.name}}</el-checkbox>
					      
					    </el-checkbox-group>
					  </el-form-item>
					  
					  
					  <el-form-item  v-if="from_zhu.formtype=='datetime'" :label="from_zhu.name">
					        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					     
						 
					  </el-form-item>
					  
					<!--  <el-form-item label="活动形式" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
					  </el-form-item> -->
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
	import _ from 'lodash'
	import {
		getshow,get_model_field
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
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
				title:'资源添加',
				activetablist:null,
				 labelPosition: 'right',
				 ruleForm: {
				          name: '',
				          region: '',
						  type: [],
				          date1: '',
				          resource: '',
				          desc: ''
				        },
				        rules: {
				          name: [
				            { required: true, message: '请输入标题', trigger: 'blur' },
				            { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
				          ],
				          
				        },
				
				all_form_data: {
					form_linkage_data: [],
					 
				},
				all_form_field:[],
				form_linkage:[],
				search_linkage_default_string:'',
			}
		},
		filters: {

		},
		created() {
			
			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			// this.ebookid = 446654
			// console.log(this.ebookid);
			this.fetchmodelfield()
			if(this.news_id!=0){
				this.init()
			}else{
				this.taskin = true
			}
			
		},
		methods: {
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
					 
				}
				var selfmain = this 
				get_model_field(params).then(response => {
					
					let  value = response.items
					console.log(value);
					let temp_linkage = value.form_linkage
					let temp_linkage_data = []
					_(temp_linkage).forEach(function(value2, key2) {
						_.set(temp_linkage_data, key2, "");
					});
					
					selfmain.all_form_field =  value.form_base
					selfmain.form_linkage = value.form_linkage
					selfmain.all_form_data.form_linkage_data =   temp_linkage_data
					
					
				})
			}, 
		  submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					// alert('submit!');
					console.log(this.ruleForm)
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
					console.log(this.program);
				})
			}, 

			init() {
				this.fetchData()
			},

		},
	}
</script>
