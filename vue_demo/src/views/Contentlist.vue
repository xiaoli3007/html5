<template>

	<el-table :data="tableData" stripe style="width: 100%">
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


</template>
<script>
	import {
		getContentList,deleteContentOne
	} from '@/api/content.js'

	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			// console.log(this.tableData3)
			this.fetchData()
		},
		computed: {
			
		},
		components: {

		},
		methods: {
			fetchData() {
				getContentList(this.listQuery).then(response => {
					// console.log(response)
					this.tableData = response['data']
				})

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
				  // console.log(row.id);
				  // _g.openGlobalLoading()
				  // _g.closeGlobalLoading()
				  // _g.toastMsg('success', '删除成功')
				   setTimeout(() => {
				    _g.shallowRefresh(this.$route.name)
				  }, 1500)
				}).catch(() => {
				  // catch error
				})
				
// 				deleteContentOne({id:row.id}).then(response => {
// 					// console.log(response)
// 					if(response.result=='success'){
// 						this.$notify({
// 						  title: '成功',
// 						  message: '删除成功',
// 						  type: 'success'
// 						});
// 						 
// 					}else{
// 						this.$notify.error({
// 						  title: '删除错误',
// 						  message: response.msg
// 						});
// 					}
// 				})
			}
		}
	}
</script>
