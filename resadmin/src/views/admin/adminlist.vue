<template>
	<div class="app-container">

	<el-dialog title="站点信息" :visible.sync="dialogFormVisible">
	  <el-form :model="siteform">
	    <el-form-item label="站点名称" :label-width="formLabelWidth">
	      <el-input v-model="siteform.name" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="域名" :label-width="formLabelWidth">
		  <el-input v-model="siteform.domain" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="媒体目录" :label-width="formLabelWidth">
		  <el-input v-model="siteform.media_dir" autocomplete="off"></el-input>
		</el-form-item>
	    
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
	  </div>
	</el-dialog>
	
	
		
		<el-table
		    :data="siteidlist"
		    style="width: 100%">
			
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
		site_info,site_list
	} from '@/api/setting'
	
	export default {
		data() {
			return {
				 dialogFormVisible: false,
				siteform: {
				  name: '',
				  domain: '',
				  media_dir: '',
				  template: '',
				  logo: '',
				},
				formLabelWidth: '120px',
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
				
				setsiteid(this.form.siteid)
				 _g.toastMsg('success', '切换成功！', this)
				
			},
			fromsiteinfo() {
				// return
				// const loading = this.$loading({
				// 	lock: true,
				// 	text: '提交中， 请稍等...',
				// 	spinner: 'el-icon-loading',
				// 	background: 'rgba(0, 0, 0, 0.7)'
				// });
				let resparams=JSON.stringify(this.siteform)
			  const params = {
			  	resparams: resparams,
			  	userid: this.$store.state.user.userid
			  }
				site_info(params).then(
					response => {
						// loading.close();
						console.log(response)
						_g.toastMsg('success', '编辑成功！', this)
					})
				 // loading.close();
				 this.dialogFormVisible = false
			},
			 handleEdit(index, row) {
				 
				 this.dialogFormVisible = true
				 let rowi = row
				 this.siteform = rowi
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
			  site_list(params).then(response => {
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
