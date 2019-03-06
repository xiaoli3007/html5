<template>
	<el-container>
		<el-header>
			<Nav></Nav>
		</el-header>
		<el-main>
			<el-table :data="tableData2" stripe style="width: 100%">
				<el-table-column prop="display_time" label="日期" width="180">
				</el-table-column>
				<el-table-column prop="pageviews" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="title" label="地址">
				</el-table-column>
			</el-table>

			<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="date" label="日期" sortable width="180">
				</el-table-column>
				<el-table-column prop="name" label="姓名" sortable width="180">
				</el-table-column>
				<el-table-column prop="address" label="地址" :formatter="formatter">
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>底部</el-footer>
	</el-container>
</template>

<script>
	import Nav from '@/components/Nav.vue'
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎第三方',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				tableData2: null,
				tableData3: null
			}
		},

		created() {
			this.fetchData()
		},
		methods: {
			formatter(row, column) {
				return row.address;
			},
			fetchData() {
// 				axios.get('/table/list')
// 					.then((response) => {
// 						this.tableData2 = response.data.data.items
// 						// console.log(this.tableData3)
// 					})
// 					.catch((error) => {
// 						console.log("axios==" + error);
// 					});

			}
		},
		components: {
			Nav
		}
	}
</script>
