<template>
	<div class="app-container">
		<el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>

		<el-tree class="filter-tree" :data="datalist" :props="defaultProps" accordion :filter-node-method="filterNode" ref="tree2">

			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.data.value }} <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>{{ node.label }}</span>
				<span>
					<el-button v-if="node.data.parentid==0" type="text" size="mini" @click="() => update(node)">
						更新缓存
					</el-button>
					
					<el-button type="text" size="mini" @click="() => edit(node)">
						修改
					</el-button>
					<el-button type="text" size="mini" @click="() => remove(node, data)">
						删除
					</el-button>
				</span>
			</span>

		</el-tree>

	</div>
</template>

<script>
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		linkage_list
	} from '@/api/admin_linkage.js'
	 let id = 1000;
	export default {


		data() {
			return {
				filterText: '',
				data2: [{
					id: 1,
					label: 'Level one 1',
					children: [{
						id: 4,
						label: 'Level two 1-1',
						children: [{
							id: 9,
							label: 'Level three 1-1-1'
						}, {
							id: 10,
							label: 'Level three 1-1-2'
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				datalist: []

			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val)
			}
		},
		created() {
			this.init()
		},

		methods: {
			init() {

				this.fetchData()
			},
			fetchData() {
				_g.openGlobalLoading()

				const params = {
					page: this.currentPage,
					pagesize: this.pagesize,
					userid: this.$store.state.user.userid,
				}
				linkage_list(params).then(response => {
					_g.closeGlobalLoading()
					// this.version_info = response.version_info
					this.datalist = response.items
					// this.sitelist = response.sitelist
					// this.catlist = response.catlist
					console.log(this.datalist)

					// this.dataCount = parseInt(response.dataCount)
					this.v = true
				})
				// this.listLoading = false
			},
			filterNode(value, data) {
				if (!value) return true
				return data.label.indexOf(value) !== -1
			},
			update(node) {
				console.log(node)
				console.log(node.data)
				// const newChild = {
				// 	id: id++,
				// 	label: 'testtest',
				// 	children: []
				// };
				// if (!data.children) {
				// 	this.$set(data, 'children', []);
				// }
				// data.children.push(newChild);
			},
			edit(node) {
				console.log(node)
				console.log(node.data)
				// const newChild = {
				// 	id: id++,
				// 	label: 'testtest',
				// 	children: []
				// };
				// if (!data.children) {
				// 	this.$set(data, 'children', []);
				// }
				// data.children.push(newChild);
			},

			remove(node, data) {
				// const parent = node.parent;
				// const children = parent.data.children || parent.data;
				// const index = children.findIndex(d => d.id === data.id);
				// children.splice(index, 1);
			},

		},

	}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>