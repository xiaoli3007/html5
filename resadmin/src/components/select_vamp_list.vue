<template>
	<div class="">


		<el-form :inline="true" :model="searchform" class="demo-form-inline">
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

		</el-form>


		<el-table :data="datalist"  ref="multipleTable"  @selection-change="handleSelectionChange" style="width: 100%">

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

			<el-table-column type="selection" width="55">
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

			<el-table-column label="路径" width="200">
				<template slot-scope="scope">
					{{ scope.row.filepath }}
				</template>
			</el-table-column>



			<el-table-column label="类型">
				<template slot-scope="scope">
					{{ scope.row.leixing }}

				</template>
			</el-table-column>

			<el-table-column label="格式">
				<template slot-scope="scope">
					{{ scope.row.fileext }}

				</template>
			</el-table-column>



			<el-table-column label="转码状态">
				<template slot-scope="scope">
					{{ scope.row.convertstate }}

				</template>
			</el-table-column>


		</el-table>


		<el-row>
			<el-col :span="12">
				<div style="">
					<el-button @click="toggleSelection(list)">全选</el-button>
					<el-button @click="toggleadd()">添加</el-button>
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
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		vamp_list,
		vamp_content_media_insert
	} from '@/api/vamp'
	// import router from '@/router/index.js'
	// import myuploadeasy from '@/components/myuploadeasy'


	export default {
		components: {

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
				pagesize: 5,
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
				direction: 'ttb',
				siteid: getsiteid() ? getsiteid() : "1",
				catid: 0,
				news_id: 0,

			}
		},
		created() {
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
						this.catid = val
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
						this.news_id = val
					}
				}
			},
			// '$route'(to, from) {
			// 	// console.log(to)
			// 	// console.log(from)
			// 	this.init()
			// }
		},
		methods: {

			toggleadd() {

				let addres = []
				this.multipleSelection.forEach(row => {
					console.log(row)
					addres.push({
						vamp_id: row.id
					})
				});
				console.log(addres)
				if (addres.length == 0) {
					_g.toastMsg('error', '请先勾选资源！', this)
					return
				}
				return
				this.$confirm('确认添加该资源?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					const params = {
						userid: this.$store.state.user.userid,
						siteid:this.siteid,
						catid:this.catid,
						news_id:this.news_id,
						resparams: JSON.stringify(addres),
					}

					_g.openGlobalLoading()
					vamp_content_media_insert(params).then(response => {
						// console.log(response)
						_g.closeGlobalLoading()
						if (response.code == 20000) {

							_g.toastMsg('success', '成功', this)
							setTimeout(() => {
								// _g.shallowRefresh(this.$route.name)
							}, 500)

						} else {
							_g.toastMsg('error', '错误', this)
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
			searchonSubmit() {

				let resparams = JSON.stringify(this.searchform)

					this.currentPage = 1
					this.init()
				console.log('submit!');
			},

			init() {

				// this.getCurrentPage()
				this.fetchData()
			},
			getCurrentPage() {
				// this.searchform = JSON.parse(data.searchform)
			},
			handleCurrentChange(page) {
				this.currentPage = page
				this.init()
			},

			fetchData() {
				_g.openGlobalLoading()

				const params = {
					page: this.currentPage,
					pagesize: this.pagesize,
					userid: this.$store.state.user.userid,
					siteid: this.siteid,
					searchform: JSON.stringify(this.searchform)
				}
				vamp_list(params).then(response => {
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
