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
	
	<!-- 	<el-form ref="form" :model="form" label-width="200px">

			<el-form-item label="站点">
				<el-radio-group v-model="form.siteid">
					
					<el-radio  v-for="(item, index) in datalist" :key="index" :label="item.siteid" border>{{item.name}}</el-radio>
					
				</el-radio-group>
			</el-form-item> 
		

			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>
		</el-form> -->
		
		<el-table
		    :data="datalist"
		    style="width: 100%">
			
			<el-table-column label="切换站点">
			  <template slot-scope="scope">
			 <el-radio @change="checksiteid(scope.row.siteid)"  :label=" scope.row.siteid" v-model="form.siteid" border>缺省</el-radio>
			  </template>
			</el-table-column>
			
		    <el-table-column
		      label="siteid"
		      >
		      <template slot-scope="scope">
		        <!-- <i class="el-icon-time"></i> -->
		        <span style="">{{ scope.row.siteid }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="站点名称"
		     >
		      <template slot-scope="scope">
		          {{ scope.row.name }}
		       
		      </template>
		    </el-table-column>
			
			<el-table-column
			  label="域名"
			 >
			  <template slot-scope="scope">
			      {{ scope.row.domain }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="媒体目录"
			  >
			  <template slot-scope="scope">
			      {{ scope.row.media_dir }}
			   
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="模板"
			  >
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
	} from '@/api/site'
	
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
				datalist:[],
				
				       
			}
		},
		created() {
			this.fetchData()
			 	
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
					 
					   console.log(response.code)
					 // this.version_info = response.version_info
					 this.datalist = response.items
					 // console.log(this.version_info )
					  
					  console.log(response.items)
					 console.log(this.datalist)
					 // if(this.datalist){
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
