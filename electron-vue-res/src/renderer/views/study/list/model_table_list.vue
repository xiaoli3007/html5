<template>
	<div class="app-container">



		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-cascader placeholder="课程分类" v-model="linkageid" :options="options" :props="props" @change="handleChange"></el-cascader>
			</el-form-item>

			<el-form-item>
				<el-input v-model="keywords" placeholder="关键词"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search()">查询</el-button>
			</el-form-item>
		</el-form>


		<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
			
			
			
			<el-table-column align="center" label='封面'>
				<template slot-scope="scope">
					<el-image style="width: 80px;cursor: pointer; " :src="scope.row.thumb_zm" fit="fill">
						
					</el-image>
				</template>
			</el-table-column> 
			
			<el-table-column align="center" label='类别'>
				<template slot-scope="scope">
					<el-tag> {{scope.row.catinfotext}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="标题">
				<template slot-scope="scope">
					{{scope.row.title}}
				</template>
			</el-table-column>
			<el-table-column label="字" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.s}}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column label="zixing" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.zixing}}
        </template>
      </el-table-column> -->

			<el-table-column label="操作" align="center">
				<template slot-scope="scope">

					<el-col :span="12">
 
						<el-button type="success" size="medium" v-if="scope.row.tingxie_taskid===0 && scope.row.iswrite!=0" v-on:click="read(1,scope.row.id,'lesson',0)">听写</el-button>
						<el-button type="success" size="medium" v-if="scope.row.tingxie_taskid!=0 && scope.row.iswrite!=0" v-on:click="readtask(scope.row.tingxie_taskid)" plain>听写</el-button>
					</el-col>
					<!-- <el-col :span="8"><el-button type="success" size="medium" v-on:click="read(1,1,scope.row.id,'lesson',0)">自动听写</el-button> </el-col> -->
					<el-col :span="12">

						<el-button type="warning" v-if="scope.row.shizi_taskid===0 && scope.row.isread!=0" size="medium" v-on:click="read(2,scope.row.id,'lesson',0)">识字</el-button>
						<el-button type="warning" size="medium" v-if="scope.row.shizi_taskid!=0 && scope.row.isread!=0" v-on:click="readtask(scope.row.shizi_taskid)" plain>识字</el-button>

 
					</el-col>

 



				</template>
			</el-table-column>

		</el-table>


		<div class="block pages">
			<el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="pagesize"
			 :current-page="currentPage" :total="dataCount">
			</el-pagination>
		</div>


	</div>
</template>

<script>
	import {
		getjiaocaiList,
		getjiaocai_cat_List
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				props: {
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
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
					}, {
						value: 'daohang',
						label: '导航',
					}]
				}, {
					value: 'ziyuan',
					label: '资源',
					children: [{
						value: 'axure',
						label: 'Axure Components'
					}, {
						value: 'sketch',
						label: 'Sketch Templates'
					}, {
						value: 'jiaohu',
						label: '组件交互文档'
					}]
				}]
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

			getjiaocai_cat_List().then(response => {
				this.options = response.items
				// console.log(this.options);
			})

		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			read(b, c, d, e) {
				this.$router.replace({
					name: 'Read',
					query: {
						type: b,
						relation_id: c,
						relation_type: d,
						taskid: e
					}
				})
			},
			readtask(a) {
				this.$router.replace({
					name: 'Read',
					query: {
						taskid: a
					}
				})
			},
			search() {

				this.$router.push({
					path: this.$route.path,
					query: {
						keywords: this.keywords,
						page: 1,
						linkageid: this.linkageid
					}
				})
			},
			handleCurrentChange(page) {
				this.$router.push({
					path: this.$route.path,
					query: {
						keywords: this.keywords,
						page: page,
						linkageid: this.linkageid
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
					linkageid: this.linkageid,
					userid: this.$store.state.user.userid,
				} 
				getjiaocaiList(params).then(response => {
					_g.closeGlobalLoading()
					this.list = response.items
					this.dataCount = parseInt(response.dataCount)
					// this.listLoading = false
						
					var temp = this.list
					_(temp).forEach(function(value, key) {
						// console.log(value.word1);
						var s = [] 
						_(value.wcell_list).forEach(function(value2, key2) {
							s.push(value2.word)
						});
						s = _.join(s, ',')
						// console.log(typeof temp);
						// console.log(temp[key].name);
						// this.list['sss']=s  
						_.set(temp, key + '.s', s);
					});
					this.list = temp 
					console.log(temp);
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

		},
		watch: {
			'$route'(to, from) {
				this.init()
			}
		}
	}
</script>
