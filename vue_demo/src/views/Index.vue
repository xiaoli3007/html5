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
	import supermemo2 from 'supermemo2'

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
			let quality =1  // 表示审核质量的介于0和5之间的数字。0是最差的，5是最好的。.
			let lastSchedule= 2 // 上次审阅空间的持续时间
			let lastFactor =3 // 用于计算上一个计划的因素。
			let ret = supermemo2(quality, lastSchedule, lastFactor)
			console.log(ret)
			// {
			//     schedule: Number, // 下一个评论空间。
			//     factor: Number, // 在下一轮计算中应该使用的因素。
			//     isRepeatAgain: Boolean // 如果是真的，应重新检查项目，直到质量不低于4。
			// }
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
