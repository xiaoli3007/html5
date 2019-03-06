<template>
  <div class="about">
    <div id="app-4">
			<ol>
				<li v-for="item in tableData2">
    {{ item.name }}
  </li>
			</ol>
			<button @click="fetchData">dddd</button>
		</div>
  </div>
</template>

<script>
	import { getList} from '@/api/table'
	
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
				tableData3: '11'
			}
		},

		created() {
			// console.log(this.tableData3)
			this.fetchData()
		},
		methods: {
			formatter(row, column) {
				return row.address;
			},
			fetchData() {
				
				getList(this.listQuery).then(response => {
				  console.log(response)
				  this.tableData2 = response
				})
				
// 					axios.get('app_ionic.php?act=category')
// 					.then((response) =>{
// 						console.log(response.data)
// 						this.tableData2 = response.data
// 						// console.log(this.tableData3)
// 					})
// 					.catch((error)=> {
// 						console.log("axios=="+error);
// 					});
			},
			aaa(){
				this.tableData3 = 'ddd'
			}
		} 
	}
</script>

