<template>
	
	
	
	<div class="app-container" v-if="taskin">

 <el-page-header @back="gotoback" :content="program.title">
	</el-page-header> 
	
		 


		<el-row>
			
			<el-col :span="20" :offset="2" justify="left" align="left">
				<div class="" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px; line-height: 20px;">
				
				<el-row> 
					<el-col :span="3"  >
						<el-image style="width: 120px;cursor: pointer; " :src="program.thumb_url" fit="fill" ></el-image>
					</el-col>
					
					<el-col  :offset="3" :span="18"  justify="left" align="left">
						
							<p v-if="program.cat_array">
								分类：<el-tag v-for="(slide, index) in program.cat_array" :key="index">
					{{slide.name}}  
					</el-tag>
								
								</p>
							<p v-if="program.description!=''">简介：{{program.description}}</p>
							 
				</el-col> 
				</el-row>
				</div>
			</el-col>
		</el-row>


		
	</div>
</template>

<script>
	import {
		getshow
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				catid: 0,
				news_id: 0,
				program: null,
				data: null,
				taskin: false,
				title:'aaaa',
				activetablist:null
			}
		},
		filters: {

		},
		created() {

			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			// this.ebookid = 446654
			// console.log(this.ebookid);
			this.init()
			
			
		},
		methods: {
			 readtask(a) {
				 // console.log(a);
				this.$router.replace({ name: 'Read' , query:{  taskid: a }})
			},
			
			gotoback(a) {
				// console.log(a);
				this.$router.replace({
					name: 'Model_table_list'
				})
			},
			fetchData() {
				const loading = this.$loading({
					lock: true,
					text: '加载中...',
					spinner: 'el-icon-loading',
					background: '#000'
				});

				const params = {
					catid: this.catid,
					news_id: this.news_id,
					userid:this.$store.state.user.userid
				}
				getshow(params).then(response => {
					loading.close();
					// this.data = response.items
					this.program = response.program_info
					//this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
					// console.log(response);
					this.taskin = true
					//console.log(this.activetablist);
					
				})
				
					
			}, 

			init() {
				this.fetchData()
			},

		},
	}
</script>
