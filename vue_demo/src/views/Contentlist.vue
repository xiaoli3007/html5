<template>
	<div>
	<div class="m-b-20 ovf-hd">
		<el-form :inline="true"  class="demo-form-inline">
		  <el-form-item>
			<el-input v-model="keywords" placeholder="关键词"></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="search()">查询</el-button>
		  </el-form-item>
		</el-form>
	</div>
	

	<el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
		<el-table-column prop="title" label="标题" width="280">
		</el-table-column>
		<el-table-column prop="date" label="时间" width="280">
		</el-table-column>
		<el-table-column label="操作" width="280">


			<template slot-scope="scope">
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			</template>


		</el-table-column>
	</el-table>

<div class="block pages">
				<el-pagination
				@current-change="handleCurrentChange"
				background
				layout="prev, pager, next"
				:page-size="max"
				:current-page="currentPage"
				:total="dataCount">
				</el-pagination>
			</div>
			
</div>
</template>
<script>
	import {
		getContentList,deleteContentOne
	} from '@/api/content.js'

	export default {
		data() {
			return {
				tableData: [],
				loading:false,
				dataCount: null,
				currentPage: null,
				keywords: '',
				multipleSelection: [],
				max: 3
			}
		},
		created() {
			// console.log(this.tableData3)
			this.init()
		},
		computed: {
			
		},
		components: {

		},
		methods: {
			search() {
			  router.push({ path: this.$route.path, query: { keywords: this.keywords, page: 1 }})
			},
			 handleCurrentChange(page) {
			  router.push({ path: this.$route.path, query: { keywords: this.keywords, page: page }})
			},
			fetchData() {
				this.loading = true
				const params = {
				    keywords: this.keywords,
				    page: this.currentPage,
				    max: this.max
				}
				getContentList(params).then(response => {
					console.log(response)
					this.loading = false
					this.tableData = response['data']
					this.dataCount = parseInt(response['dataCount'])
				})

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
			  this.getKeywords()
			  this.getCurrentPage()
			  this.fetchData()
			},
			handleEdit(index, row) {
				console.log(index, row);
				this.$router.push({ name: 'contentedit', params: { id: row.id }})
			},
			handleDelete(index, row) {
				this.$confirm('确认删除该用户?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					
					_g.openGlobalLoading()
					deleteContentOne({id:row.id}).then(response => {
						// console.log(response)
						_g.closeGlobalLoading()
						if(response.result=='success'){
							
							_g.toastMsg('success', '删除成功')
							 setTimeout(() => {
							  _g.shallowRefresh(this.$route.name)
							}, 1500)
							
						}else{
							_g.toastMsg('error', '删除错误')
						}
					})
				  // console.log(row.id);
				}).catch(() => {
				  // catch error
				})
				
				
			}
		},
		watch: {
		  '$route' (to, from) {
		    this.init()
		  }
		}
	}
</script>
