<template>
	<div class="list">
		<van-nav-bar title="详细" left-text="返回" left-arrow @click-left="onClickLeft" />


		<div v-if="taskin">
			<van-row>
				<van-col span="4">

					<!-- <van-button icon="share" type="primary" @click="showShare = true"> </van-button> -->
				</van-col>
				<van-col span="16">
					<!-- <h2>{{program.title}}</h2> -->
				</van-col>
				<van-col span="4">
					<!-- <van-icon name="star-o" /> -->
					<van-button @click="shoucang()" icon="star-o" type="primary"> </van-button>
					<!-- <van-button icon="star" type="primary"> </van-button> -->
				</van-col>
			</van-row>
			
			<van-collapse v-model="activeNames">
			  <van-collapse-item :title="program.title" name="1">
				   <van-row  v-for="(itemfild, index3) in main_resource_fild" :key="index3" >
				  	<van-col span="8"><div style="text-align: right;">{{itemfild.name}}： </div></van-col>
				  <van-col span="16"><div style="text-align: left;">{{itemfild.value}}</div></van-col>
				  <div style="margin-top: 15px;"> </div>
				  </van-row>
				 
				    
				  
			  </van-collapse-item>
			  
			</van-collapse>
			
			
			<div class="image" v-if="program.template=='show_image'">
			 <my-image  :meidia_list="meidia_list"  ref="mytext" ></my-image> 
			 
			</div>	
			
			<div class="wendang" v-if="program.template=='show_text'">
			 <my-text  :meidia_list="meidia_list"  ref="mytext" ></my-text> 
			 
			</div>	
			
			<div class="audio" v-if="program.template=='show_audio'">
			 <m-audio :show-duration="true" :autoplay="false" :arraylistaudio="meidia_list" :block="false" ref="myaudio_zi" ></m-audio> 
			</div>	
			
			<div class="video" v-if="program.template=='show'">
			<my-video :meidia_list="meidia_list" :autoStart="true"  ></my-video>
				
			</div>	
			
			<div class="three" v-if="program.template=='show_three'">
			 <my-three  :meidia_list="meidia_list"  ref="mytext" ></my-three> 
			 
			</div>	
			
			

		</div>

		<van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
	</div>



</template>

<script>
	import {
		Toast
	} from 'vant';
	import {
		getshow
	} from '@/api/base'
	import {
		favorite_save
	} from '@/api/user'
	
	import MyVideo from '@/components/MyVideo'
	import MyText from '@/components/MyText'
	import MyThree from '@/components/MyThree'
	import MyImage from '@/components/MyImage'
	export default {
		components: {
			MyVideo,
			MyText,
			MyImage,
			MyThree
		},
		data() {
			return {
				catid: 0,
				news_id: 0,
				program: null,
				meidia_list: [],
				main_resource_fild: [],
				data: null,
				taskin: false,
				showShare: false,
				options: [{
						name: '微信',
						icon: 'wechat'
					},
					{
						name: '微博',
						icon: 'weibo'
					},
					{
						name: '复制链接',
						icon: 'link'
					},
					// { name: '分享海报', icon: 'poster' },
					// { name: '二维码', icon: 'qrcode' },
				],
				activeNames: ['1'],
			}
		},
		created() {
			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			this.init()
		},
		mounted() {
			// console.log(this.meidia_list)
		},
		computed: {
			// player() {
			// 	return this.$refs.videoPlayer.player
			// }
		},
		methods: {
			onSelect(option) {
				Toast(option.name);
				this.showShare = false;
			},
			onClickLeft() {
				this.$router.replace({
					name: 'List',
					// query: {
					// 	catid: catid,
					// 	news_id: id
					// }
				})

			},
			shoucang() {
				console.log(1111)
				console.log(this.$store.state.user.userid)
				if (!this.$store.state.user.userid) {
					Toast('请登录！');
					return
				}
				const getparams = {
					loading: false,
					params: {
						catid: this.catid,
						news_id: this.news_id,
						userid: this.$store.state.user.userid,
					}
				}

				favorite_save(getparams).then(response => {
					// this.data = response.items
					console.log(response)

					Toast(response.message);

				})


			},

			init() {
				this.fetchData()
			},
			fetchData() {


				const getparams = {
					loading: false,
					params: {
						catid: this.catid,
						news_id: this.news_id,
						userid: this.$store.state.user.userid,
					}
				}
 
				getshow(getparams).then(response => {
					// this.data = response.items
					
					this.program = response.program_info
					//this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
					this.meidia_list = response.program_info.meidia_list
					
					 console.log(response.main_resource_fild)
					this.main_resource_fild = response.main_resource_fild
					
					this.taskin = true
				})


			},
			

		},
	}
</script>

<style scoped lang="less">
	
</style>
