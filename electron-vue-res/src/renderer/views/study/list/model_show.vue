<template>
	<div class="app-container">

		<el-row v-if="taskin">
			<el-col :span="20" :offset="2" justify="center" align="center">
				<div class="" style="margin-top: 15px;">
					<span>{{program.title}}</span>
					<el-tag type="info" @click.native="gotoback" class="backbutton"> 返回</el-tag>
				</div>
			</el-col>
		</el-row>


		<el-row v-if="taskin">
			
			<el-col :span="20" :offset="2" justify="left" align="left">
				<div class="" style="margin-top: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px; line-height: 20px;">
				
				<el-row> 
					<el-col :span="3"  >
						<el-image style="width: 120px;cursor: pointer; " :src="program.thumb_zm" fit="fill" ></el-image>
					</el-col>
					
					<el-col :span="21"  justify="left" align="left">
						
							<p v-if="program.author!=''">作者：{{program.author}}</p>
							<p v-if="program.subject!=''">主题：{{program.subject}}</p>
							<p v-if="program.description!=''">简介：{{program.description}}</p>
							<p v-if="program.head!=''">开头：{{program.head}}</p>
						
				</el-col> 
				</el-row>
				</div>
			</el-col>
		</el-row>


		<el-row v-if="taskin" v-for="(slide, index) in data" :key="index">
			<el-col :span="20" :offset="2" justify="left" align="left">
				<div class="" style="margin-top: 15px;">
					<span>
						<el-tag type="success" effect="dark">{{slide.obj.name}}</el-tag>
					</span>
					<el-divider></el-divider>

					<el-tabs v-model="activetablist[index].wcell_name" type="border-card">
					  
						<el-tab-pane v-for="(sub, index2) in slide.wcell_list" :key="index2" :label="sub.name" :name="sub.md5">
							<el-tag v-for="(sub2, index3) in sub.data" :key="index3">{{sub2.word}}</el-tag>
								
								<div><p style="float: right;"> 
								
								<!-- <el-button type="warning">开始识字</el-button>
								 -->
								
								<el-button type="warning" v-if="sub.shizi_taskid===0"  v-on:click="read(2,program.id,'ebook',0,index2,index)">识字</el-button> 
								<el-button type="warning" v-if="sub.shizi_taskid!=0"  v-on:click="readtask(sub.shizi_taskid)" plain>识字</el-button>
								
								 
								</p></div>
								 
						</el-tab-pane>
   
					</el-tabs>
					<!-- <el-tag type="info" v-for="(sub, index2) in slide.wcell_list" :key="index2">{{sub.name}}</el-tag> -->
					<!-- 	<span > {{sub.word}}</span> <el-divider direction="vertical"></el-divider> -->
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import {
		getbookshow
	} from '@/api/table'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				ebookid: 0,
				program: null,
				data: null,
				taskin: false,
				activeName: 'first',
				activetablist:null
			}
		},
		filters: {

		},
		created() {

			this.ebookid = this.$route.query.ebookid
			// this.ebookid = 446654
			// console.log(this.ebookid);
			this.init()
			
			
		},
		methods: {
			 readtask(a) {
				 // console.log(a);
				this.$router.replace({ name: 'Read' , query:{  taskid: a }})
			},
			read(b,c,d,e,f,g) {
				//console.log({ type: b,relation_id: c, relation_type: d, taskid: e, gid: f,wcell_type:g})
				this.$router.replace({ name: 'Read' , query:{ type: b,relation_id: c, relation_type: d, taskid: e, gid: f,wcell_type:g}})
			},
			gotoback(a) {
				// console.log(a);
				this.$router.replace({
					name: 'Book'
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
					ebookid: this.ebookid,
					userid:this.$store.state.user.userid
				}
				getbookshow(params).then(response => {
					loading.close();
					this.data = response.items
					this.program = response.program
					this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
					// console.log(response);
					this.taskin = true
					
					console.log(this.activetablist);
					
				})
				
					
			},

			init() {
				this.fetchData()
			},

		},
	}
</script>
