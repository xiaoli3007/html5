<template>
	<div class="app-container">

		<el-tabs type="card" v-model="activeName"  @tab-click="handleClick">
			<template v-for="(fromsinge, index) in from_options">
				<el-tab-pane :label="fromsinge.catname" :name="fromsinge.catid" :key="index">
					<el-form :inline="true" class="demo-form-inline">

						<el-row>
							<!-- <el-col :span="4" :offset="2">
								<div class="form_title">联动菜单</div>
								</el-col> -->
							<el-col :span="24">
								<el-form-item v-for="(from_linkage, linkage_index) in fromsinge.search_linkage_form" :key="linkage_index" >
									<el-cascader :placeholder="from_linkage.name" v-model="search_all_form_data.linkage_data[index][linkage_index]"  :options="from_linkage.data" :props="props"
									 @change="handleChange"></el-cascader>
								</el-form-item>
							</el-col>
						</el-row>
						
						 <el-tabs tab-position="left" style=""  @tab-click="stypehandleClick">
						    <el-tab-pane label="精准搜索" > 
									<el-row>
										<!-- <el-col :span="4"><div class="form_title">主文本</div></el-col> -->
										<el-col :span="24">
									
											<el-form-item v-for="(from_zhu, zhu_index) in fromsinge.search_text_form_zhu" :key="zhu_index">
												<el-input v-model="search_all_form_data.zhudata[index][zhu_index].value" @change="handlesearchtextChange" :placeholder="from_zhu.name" :clearable="true"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									
									<el-row>
										<!-- <el-col :span="4"><div class="form_title">副文本</div></el-col> -->
										<el-col :span="24">
							    		
											<el-form-item v-for="(from_fu, fu_index) in fromsinge.search_text_form_fu" :key="fu_index"> 
								 				<el-input v-model="search_all_form_data.fudata[index][fu_index].value" @input="handlesearchfutextChange" :placeholder="from_fu.name" :clearable="true"></el-input> 
											</el-form-item>
									
										</el-col>
									</el-row>
							</el-tab-pane>
						    <el-tab-pane label="全文搜索"  >
									<el-row>
										<!-- <el-col :span="4"><div class="form_title">全文检索</div></el-col> -->
										<el-col :span="20">
											<!-- <el-form-item></el-form-item> -->
												<el-input v-model="keywords" placeholder="全文" :clearable="true" size="large"></el-input>
											
										</el-col>
									</el-row>
							</el-tab-pane>
						     
						  </el-tabs>
						  
						

						

						<el-row>
							<el-col :span="4" :offset="4">
							<el-form-item>
								<el-button type="primary" @click="search()">查询</el-button> 			</el-form-item>
							</el-col>
							  
							<el-col :span="2" :offset="14">
						<el-form-item>
							<el-button type="success" @click="add()">添加</el-button> 			</el-form-item>
							
							
						</el-col>
						</el-row>
						
						
					</el-form>

				</el-tab-pane>
			</template>
		</el-tabs>



	<!-- 	<div class="booklist22" style="margin-top: 15px; display: none;">
			<el-row :gutter="20" v-loading.body="listLoading" element-loading-text="Loading">
				<el-col :span="4" v-for="(singe, index) in list" :key="index">
					<el-card :body-style="{ padding: '0px' }">
						<img :src="singe.thumb_url" class="image">
						<div style="padding: 14px;">
							<span>
								{{singe.j_t}}
							</span>
							<div class="bottom clearfix">
								<time class="time">{{singe.program.inputtime}}</time>
								<el-button type="text" class="button" @click.native="gotoShow(singe.catid,singe.id)">详细</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div> -->
		

		<el-table :data="list"  ref="multipleTable"  @selection-change="handleSelectionChange" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			<el-table-column label="标题">
				<template slot-scope="scope" >
					{{scope.row.program.title}}
				</template>
			</el-table-column>
			
			<!-- <el-table-column  align="center" label='封面' >
				<template slot-scope="scope">
					<el-image style="width: 80px;cursor: pointer; " :src="scope.row.thumb_url" fit="fill">

					</el-image>
				</template>
			</el-table-column> -->

			<el-table-column align="center" label='类别'>

				<template slot-scope="scope">
					<el-tag v-for="(slide, index) in scope.row.cat_array" :key="index">
						{{slide.name}}
					</el-tag>
				</template>

			</el-table-column>
			
			<el-table-column label="发布时间" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.program.inputtime}}</span>
				</template>
			</el-table-column>


			<el-table-column label="操作" align="center">
				<template slot-scope="scope">

					<el-col :span="24">
						
						  <el-button icon="el-icon-search"  v-on:click="gotoShow(scope.row.catid,scope.row.id)" circle></el-button> 
						  <el-button   v-on:click="add(scope.row.catid,scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
						 
						  <el-button  v-on:click="handleDelete(scope.row.catid,scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
					 </el-col>
					 


				</template>
			</el-table-column>

		</el-table>
			
			<el-row>
				<el-col :span="12">
						<div style="">
						  <el-button @click="toggleSelection(list)">全选</el-button>
						  <el-button @click="toggledelete()">删除</el-button>
						</div>
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
		 
	} from '@/utils/auth'
	import {
		model_data_list,
		get_catlist_data,deleteContent
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
				list: null,
				listLoading: true,
				loading: false,
				dataCount: null,
				currentPage: null,
				keywords: '',
				multipleSelection: [],
				pagesize: 12,
				linkageid: 0,
				siteid:getsiteid()!='' ? getsiteid() :'1',
				catid: 0,
				activeName: '',
				tab_index: 0,
				from_options: [],
				options: [],
				search_linkage_form_data: [],
				search_all_form_data: {
					linkage_data: [],
					zhudata: [],
					fudata: [],
				},
				list_select_linkage: [],
				search_linkage_default_string: '',
				search_main_text: '',
				search_fu_text: '',
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'gray',
					deleted: 'danger'
				}
				return statusMap[status]
			}
		},
		created() {
			this.init()

			// getjiaocai_cat_List().then(response => {
			// 	this.options = response.items
			// 	// console.log(this.options);
			// })
			const params = {
				siteid: this.siteid,
			}

			get_catlist_data(params).then(response => {
				this.from_options = response.items
				// console.log(this.from_options);
				this.catid = this.from_options[0].catid
				this.activeName= this.from_options[0].catid
				// console.log(this.catid);
				let temp = this.from_options
				//表单model加载=================
				const selfmain = this
				let no_temp_linkage_data = []
				let no_temp_zhu_data = []
				let no_temp_fu_data = []
				_(temp).forEach(function(value, key) {
					
					let temp_linkage = value.search_linkage_form
					let temp_linkage_data = []
					_(temp_linkage).forEach(function(value2, key2) {
						_.set(temp_linkage_data, key2, "");
					});
					_.set(no_temp_linkage_data, key, temp_linkage_data);
						
					let temp_zhu = value.search_text_form_zhu
					let temp_zhu_data = []
					_(temp_zhu).forEach(function(value3, key3) {
						_.set(temp_zhu_data, key3, {field:value3.field,value:""});
					});
					_.set(no_temp_zhu_data, key, temp_zhu_data);
					
					let temp_fu = value.search_text_form_fu
					let temp_fu_data = []
					_(temp_fu).forEach(function(value4, key4) {
						 _.set(temp_fu_data, key4, {field:value4.field,value:""});
					});
					 _.set(no_temp_fu_data, key, temp_fu_data);
				});
				
				selfmain.search_all_form_data.linkage_data =   no_temp_linkage_data
				selfmain.search_all_form_data.zhudata =   no_temp_zhu_data
				selfmain.search_all_form_data.fudata =   no_temp_fu_data
				
				// console.log(this.search_linkage_form_data);
				// console.log(this.search_text_form_zhu_data);
				// console.log(this.search_all_form_data);
				
			})

		},
		methods: {
			handleDelete(catid, id) {
				this.$confirm('确认删除该资源?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					
					const params = {
						catid: catid,
						news_id: id
					}
					
					_g.openGlobalLoading()
					deleteContent(params).then(response => {
						// console.log(response)
						_g.closeGlobalLoading()
						if (response.code == 20000) {
							
							_g.toastMsg('success', '删除成功',this)
							 setTimeout(() => {
							  _g.shallowRefresh(this.$route.name)
							}, 500)
							
						}else{
							_g.toastMsg('error', '删除错误',this)
						}
					})
				  // console.log(row.id);
				}).catch(() => {
				  // catch error
				})
				
				
			},
			toggledelete() {
			 
			 let deletres = []
			 this.multipleSelection.forEach(row => {
			 				  console.log(row)
			 		deletres.push({catid:row.catid,news_id:row.id})	
			 });
			 console.log(deletres)
			 if(deletres.length==0){
				 _g.toastMsg('error', '请先勾选资源！',this)
				 return
			 }
			 this.$confirm('确认删除该资源?', '提示', {
			   confirmButtonText: '确定',
			   cancelButtonText: '取消',
			   type: 'warning'
			 }).then(() => {
			 	
			 	const params = {
			 		
					resparams: JSON.stringify(deletres),
			 	}
			 	
			 	_g.openGlobalLoading()
			 	deleteContent(params).then(response => {
			 		// console.log(response)
			 		_g.closeGlobalLoading()
			 		if (response.code == 20000) {
			 			
			 			_g.toastMsg('success', '删除成功',this)
			 			 setTimeout(() => {
			 			  _g.shallowRefresh(this.$route.name)
			 			}, 500)
			 			
			 		}else{
			 			_g.toastMsg('error', '删除错误',this)
			 		}
			 	})
			   // console.log(row.id);
			 }).catch(() => {
			   // catch error
			 })
			 
		  },
			toggleSelection(rows) {
			if (rows) {
			  rows.forEach(row => {
				  console.log(row)
				this.$refs.multipleTable.toggleRowSelection(row);
			  });
			} else {
			  this.$refs.multipleTable.clearSelection();
			}
		  },
		  handleSelectionChange(val) {
			this.multipleSelection = val;
			// console.log(this.multipleSelection)
		  },
			handleChange(value) {
				console.log(value);
				console.log(this.search_all_form_data);
				let linkage_data = this.search_all_form_data.linkage_data[this.tab_index]
				//联动菜单拼接 ==================================
				let list_select_linkage = []
				_(linkage_data).forEach(function(value, key) {
					_(value).forEach(function(value2, key2) {
						// _.set(list_select_linkage, key, value2);
						list_select_linkage.push(value2)
					});
				});
				this.search_linkage_default_string = list_select_linkage.join()
			},
			handlesearchtextChange(value){
				console.log(value);
				  // let  main = [JSON.stringify(this.data.xm_type[this.data.TabCur])]
				 let zhudata = this.search_all_form_data.zhudata[this.tab_index]
				 this.search_main_text = JSON.stringify(zhudata)
				
			}, 
			handlesearchfutextChange(value){
				
				 let fudata = this.search_all_form_data.fudata[this.tab_index]
				 this.search_fu_text = JSON.stringify(fudata)
				 console.log(this.search_fu_text)
			}, 
			stypehandleClick(tab, event) {
				console.log(tab.label)
				if(tab.label=='精准搜索'){
					this.keywords = ''
				}
			},
			handleClick(tab, event) {
				 //切换tab  清空所有表单 model
				 // console.log(tab, event);
			        console.log(this.search_all_form_data);
				   // console.log(this.catid);  
				   	let linkage_data = this.search_all_form_data.linkage_data[this.tab_index]
					let zhudata = this.search_all_form_data.zhudata[this.tab_index]
					let fudata = this.search_all_form_data.fudata[this.tab_index]
				   
				   //.tab_index
				   if(tab.name!=this.catid){
					   _(linkage_data).forEach(function(value, key) {
					   		_.set(linkage_data, key, []);
					    });
					    _(zhudata).forEach(function(value, key) {
					   		_.set(zhudata,  key+"[value]", "");
					    });
					    _(fudata).forEach(function(value, key) {
					    	_.set(fudata,  key+"[value]", "");
					    });
					   // console.log(this.search_all_form_data); 
					   this.tab_index = tab.index 
					   //所有form model 清空  传值清空
					   this.search_linkage_default_string = ''
					   this.search_main_text = ''
					   this.search_fu_text = ''
					   this.keywords = ''
					    
					   this.catid = tab.name
					   this.$router.push({
							path: this.$route.path,
							query: {
								page: 1,
								catid: tab.name
							}
						}) 
				   }
			 },
			 add(catid=0, id=0) {
				 if(catid==0){
					 catid = this.catid
				 }
			 	this.$router.replace({
			 		name: 'Content_add',
			 		query: {
			 			catid: catid,
			 			news_id: id
			 		}
			 	})
			 },
			gotoShow(catid, id) {
				this.$router.replace({
					name: 'Model_show',
					query: {
						catid: catid,
						news_id: id
					}
				})
			},
			search() {
				
				this.$router.push({
					path: this.$route.path,
					query: {
						keywords: this.keywords,
						page: 1,
						catid: this.catid,
						siteid: this.siteid,
						 search_main_text:this.search_main_text,
						 search_fu_text:this.search_fu_text,
						 search_linkage_default_string: this.search_linkage_default_string,
					} 
				}) 
			},
			handleCurrentChange(page) {
				this.$router.push({
					path: this.$route.path,
					query: {
						keywords: this.keywords,
						page: page,
						catid: this.catid,
						siteid: this.siteid,
						search_main_text:this.search_main_text,
						search_fu_text:this.search_fu_text,
						 search_linkage_default_string: this.search_linkage_default_string, 
					}
				})
			},  
			fetchData() {
				_g.openGlobalLoading()
				// this.listLoading = true
				const params = {

					keywords: this.keywords,
					page: this.currentPage,
					pagesize: this.pagesize,
					catid: this.catid,
					siteid: this.siteid,
					search_main_text:this.search_main_text,
					search_fu_text:this.search_fu_text,
					search_linkage_default_string: this.search_linkage_default_string, 
					userid: this.$store.state.user.userid,
				} 
				model_data_list(params).then(response => {
					_g.closeGlobalLoading()
					this.list = response.items
					this.dataCount = parseInt(response.dataCount)
					// this.listLoading = false

					var temp = this.list
					_(temp).forEach(function(value, key) {
						// console.log(value.word1);
						var s = ''
    
						s = _.truncate(value.program.title, {
							'length': 12,
							'separator': ' '
						})
						// console.log(typeof temp);
						// console.log(temp[key].name);
						// this.list['sss']=s  
						_.set(temp, key + '.j_t', s);
					});
					this.list = temp
					 // console.log(temp);
				})
				this.listLoading = false
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
			get_linkage_data() {
				let data = this.$route.query
				if (data) {
					if (data.page) {
						this.search_linkage_default_string = data.search_linkage_default_string
					} else {
						this.search_linkage_default_string = ""
					}
				}
			},
			getKeywords() {
				let data = this.$route.query
				if (data) {
					if (data.keywords) {
						this.keywords = data.keywords
					} else {
						this.keywords = ''
					}
				}
			},
			init() {
				// this.getKeywords()
				this.getCurrentPage()
				this.fetchData()
			},

		},
		watch: {
			'$route'(to, from) {
				this.init()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.form_title{
		height: 40px; line-height: 40px; display: none;	}
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.booklist22 {

		.el-col {
			border-radius: 4px;
			margin-bottom: 10px;
		}
	}

</style>
