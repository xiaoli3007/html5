<template>
	<div class="">

		<el-dialog :modal="false" title="媒体信息" :visible.sync="dialogFormVisible" v-if="v">


			<el-form :model="form">

				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="form.title" autocomplete="off"></el-input>
				</el-form-item>


				<el-form-item label="路径" :label-width="formLabelWidth">
					<el-input v-model="form.filepath" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="媒体类型" :label-width="formLabelWidth">

					<el-select v-model="form.mediaformat" placeholder="媒体类型">

						<el-option v-for="(item, index) in media_format_list" :key="index" :label="item.description" :value="item.id"></el-option>

					</el-select>


				</el-form-item>

				<el-form-item label="服务器地址" :label-width="formLabelWidth">
					<el-input v-model="form.servername" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="下载URL" :label-width="formLabelWidth">
					<el-input v-model="form.down_url" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="描述" :label-width="formLabelWidth">

					<el-input type="textarea" v-model="form.desc"></el-input>

				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="fromsiteinfo()">确 定</el-button>
			</div>
		</el-dialog>



		<!-- 	<el-form :inline="true" :model="searchform" class="demo-form-inline">
	  <el-form-item label="名称">
	    <el-input v-model="searchform.title" placeholder="名称"></el-input>
	  </el-form-item>
	  <el-form-item label="媒体类型">
		  
		  <el-select clearable v-model="searchform.mediaformat" placeholder="媒体类型">
		  
		  	<el-option v-for="(item, index) in media_format_list" :key="index" :label="item.description" :value="item.id"></el-option>
		  
		  </el-select>
		  
	    
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="searchonSubmit">查询</el-button>
	  </el-form-item>
	  
	 <el-form-item>
	    <el-button type="warning" @click="handleAdd()">手动添加</el-button>
	  </el-form-item>  
	  
	</el-form> -->

		<el-button type="warning" @click="handleAddMedia()">到媒体库添加</el-button>

		<el-table :data="datalist" style="width: 100%">
			
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="服务器地址">
							<span>{{ props.row.servername }}</span>
						</el-form-item>
						<el-form-item label="下载地址">
							<span>{{ props.row.down_url }}</span>
						</el-form-item>
			
					</el-form>
				</template>
			</el-table-column>
			

			<el-table-column label="id">
				<template slot-scope="scope">
					<!-- <i class="el-icon-time"></i> -->
					<span style="margin-left: 10px">{{ scope.row.id }}</span>
				</template>
			</el-table-column>


			<el-table-column label="名称">
				<template slot-scope="scope">
					{{ scope.row.title }}

				</template>
			</el-table-column>

			<el-table-column label="类型">
				<template slot-scope="scope">
					{{ scope.row.leixing }}

				</template>
			</el-table-column>
			
			<el-table-column label="大小">
				<template slot-scope="scope">
					{{ scope.row.filesize_text }}
			
				</template>
			</el-table-column>
			
			<el-table-column label="格式">
				<template slot-scope="scope">
					{{ scope.row.fileext }}

				</template>
			</el-table-column>

			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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


		<el-drawer title="我是媒体库" :visible.sync="addContentMediaopen" :direction="direction" :modal="false" size="70%"
		 :with-header="true" :before-close="handleClose">


			<select_vamp_list :v_model_catid="v_model_catid" :v_model_news_id="v_model_news_id"  v-on:passtoparent="updatelist"></select_vamp_list>

		</el-drawer>




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
		media_list,
		media_edit,
		media_delete
	} from '@/api/content_media'
	// import router from '@/router/index.js'
	import select_vamp_list from '@/components/select_vamp_list'

	export default {
		components: {
			select_vamp_list
		},
		props: {
			v_model_title: {
				type: String,
				default: ''
			},
			v_model_catid: {
				type: Number,
				default: 0
			},
			v_model_news_id: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				dialogFormVisible: false,
				dataCount: null,
				currentPage: null,
				pagesize: 12,
				form: {
					title: '',
					filepath: '',
					mediaformat: '',
					servername: '',
					down_url: '',
					desc: '',
				},
				formLabelWidth: '120px',
				table: false,
				v: false,
				datalist: [],
				site_list: [],
				media_format_list: [],
				searchform: {
					title: '',
					mediaformat: ''
				},
				drawer: false,
				direction: 'ltr',
				siteid: getsiteid() ? getsiteid() : "1",

				addContentMediaopen: false,
				now_catid: 0,
				now_news_id: 0,
				now_title: '',

			}
		},
		created() {
			// this.catid = this.$route.query.catid
			// this.news_id = this.$route.query.news_id
			this.init()
		},
		watch: {
			'v_model_catid': {
				deep: true,
				handler: function(val, oldVal) {
					var vm = this
					// console.log(val)
					// console.log(oldVal)
					if (val != oldVal) {
						this.init()
					}
				}
			},
			'v_model_news_id': {
				deep: true,
				handler: function(val, oldVal) {
					var vm = this
					// console.log(val)
					// console.log(oldVal)
					if (val != oldVal) {
						this.init()
					}
				}
			},
			// '$route'(to, from) {
			// 	// console.log(to)
			// 	// console.log(from)
			// 	this.init()
			// },
		},
		methods: {
			
			updatelist(data){
				console.log(data)
				this.addContentMediaopen = false
				this.fetchData()
			},
			handleClose(done) {
				
				// console.log(done)
				done();
				// this.$confirm('确认关闭？')
				//   .then(_ => {
				//     done();
				//   })
				//   .catch(_ => {});
			},
			handleAddMedia() {
				this.addContentMediaopen = true
			},
			
			searchonSubmit() {

				// let resparams = JSON.stringify(this.searchform)

				this.currentPage = 1
				this.init()
				console.log('submit!');
			},
			checksiteid(id) {
				console.log(id)

			},
			init() {
				this.fetchData()
			},

			handleCurrentChange(page) {
				this.currentPage = page
				this.init()
			},

			fromsiteinfo() {

				console.log(this.form)
				// return
				// this.form.priv =this.$refs.tree.getCheckedKeys()
				let resparams = JSON.stringify(this.form)

				console.log(resparams)

				const params = {
					resparams: resparams,
					userid: this.$store.state.user.userid,
					siteid: this.siteid
				}
				media_edit(params).then(
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
					title: '',
					filepath: '',
					mediaformat: '',
					servername: '',
					down_url: '',
					desc: '',
				}
				this.form = rowi
			},
			handleEdit(index, row) {

				this.dialogFormVisible = true

				let rowi = JSON.parse(JSON.stringify(row))
				console.log(rowi)

				this.form.title = rowi.title
				this.form.filepath = rowi.filepath
				this.form.mediaformat = rowi.mediaformat
				this.form.servername = rowi.servername
				this.form.down_url = rowi.down_url
				this.form.desc = rowi.desc
				this.form.id = rowi.id

				// console.log(index, row);
			},
			handleDelete(index, row) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					const params = {
						userid: this.$store.state.user.userid,
						media_id: row.id
					}
					_g.openGlobalLoading()
					media_delete(params).then(response => {
						// console.log(response)
						_g.closeGlobalLoading()
						if (response.code == 20000) {
							_g.toastMsg('success', '删除成功', this)
							//  setTimeout(() => {
							//   _g.shallowRefresh(this.$route.name)
							// }, 500)
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
					siteid: this.siteid,
					catid: this.v_model_catid,
					news_id: this.v_model_news_id,
					searchform: JSON.stringify(this.searchform)
				}
				media_list(params).then(response => {
					_g.closeGlobalLoading()

					this.datalist = response.items
					// this.site_list = response.site_list
					this.media_format_list = response.media_format_list
					// this.model_list = response.model_list
					// console.log(this.media_format_list)
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
