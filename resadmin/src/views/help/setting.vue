<template>
	<div class="app-container">


	<!-- 	<el-form ref="form" :model="form" label-width="200px">

			<el-form-item label="站点">
				<el-radio-group v-model="form.siteid">
					
					<el-radio  v-for="(item, index) in siteidlist" :key="index" :label="item.siteid" border>{{item.name}}</el-radio>
					
				</el-radio-group>
			</el-form-item> 
		

			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form> -->
		
		<el-table
		    :data="siteidlist"
		    style="width: 100%">
			
			<el-table-column label="切换站点">
			  <template slot-scope="scope">
			 <el-radio @change="checksiteid(scope.row.siteid)"  :label=" scope.row.siteid" v-model="form.siteid" border>缺省</el-radio>
			  </template>
			</el-table-column>
			
		    <el-table-column
		      label="siteid"
		      width="180">
		      <template slot-scope="scope">
		        <!-- <i class="el-icon-time"></i> -->
		        <span style="margin-left: 10px">{{ scope.row.siteid }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="站点名称"
		      width="180">
		      <template slot-scope="scope">
		          {{ scope.row.name }}
		       
		      </template>
		    </el-table-column>
			
			<el-table-column
			  label="域名"
			  width="280">
			  <template slot-scope="scope">
			      {{ scope.row.domain }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="媒体目录"
			  width="180">
			  <template slot-scope="scope">
			      {{ scope.row.media_dir }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="模板"
			  width="100">
			  <template slot-scope="scope">
			      {{ scope.row.template }}
			   
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
		  

	</div>
</template>

<script>
	
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		setting,setting_info
	} from '@/api/help'
	
	export default {
		data() {
			return {
				version_info:null,
				setting_info:null,
				table: false,
				v: true,
				form: {
					// siteid: getsiteid() ? parseInt(getsiteid()) : 1,
					siteid: getsiteid() ? getsiteid() : "1",
				},
				siteidlist:[],
				   tableData: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        },],
				       
			}
		},
		created() {
			this.fetchData()
			 console.log(this.form);
				
		},
		methods: {
			 
			checksiteid(e) {
				console.log(e);
				// return
				// const loading = this.$loading({
				// 	lock: true,
				// 	text: '提交中， 请稍等...',
				// 	spinner: 'el-icon-loading',
				// 	background: 'rgba(0, 0, 0, 0.7)'
				// });

				// console.log(this.form);
				setsiteid(this.form.siteid)
				 _g.toastMsg('success', '切换成功！', this)
				// setting(this.$store.state.user.userid, this.form.siteid).then(
				// 	response => {
				// 		loading.close();
				// 		console.log(response)
				// 		_g.toastMsg('success', '保存成功！', this)
				// 	})
				 // loading.close();
			},
			 handleEdit(index, row) {
				console.log(index, row);
			  },
			  handleDelete(index, row) {
				console.log(index, row);
			  },
			fetchData() {
			    _g.openGlobalLoading()
				
					const params = {
						userid: this.$store.state.user.userid,
					}
			  setting_info(params).then(response => {
				     _g.closeGlobalLoading()
					 // this.version_info = response.version_info
					 this.siteidlist = response.siteidlist
					 // console.log(this.version_info )
					 console.log(this.siteidlist )
					 // if(this.siteidlist){
						//  this.form.siteid  = parseInt(this.setting_info.siteid)
						//  setsiteid(parseInt(this.setting_info.siteid))
					 // }
					 this.v = true
			  })
			    // this.listLoading = false
			},
		}
	}
</script>
