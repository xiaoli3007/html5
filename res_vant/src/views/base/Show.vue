<template>
	<div class="list">
		<van-nav-bar title="详细" left-text="返回" left-arrow @click-left="onClickLeft" />


		<div v-if="taskin">
			<van-row>
				<van-col span="4">

					<van-button icon="share" type="primary" @click="showShare = true"> </van-button>
				</van-col>
				<van-col span="16">
					<h2>{{program.title}}</h2>
				</van-col>
				<van-col span="4">
					<!-- <van-icon name="star-o" /> -->
					<van-button @click="shoucang()" icon="star-o" type="primary"> </van-button>
					<!-- <van-button icon="star" type="primary"> </van-button> -->
				</van-col>
			</van-row>
			
			<div class="audio" v-if="program.template=='show_audio'">
			 <m-audio :show-duration="true" :autoplay="false" :arraylistaudio="meidia_list" :block="false" ref="myaudio_zi" ></m-audio> 
			 
			
			 
			</div>	
			
			<div class="video" v-if="program.template=='show'">
			<my-video :meidia_list="meidia_list" :autoStart="true"  ></my-video>
				
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
	 
	export default {
		components: {
			MyVideo
		},
		data() {
			return {
				catid: 0,
				news_id: 0,
				program: null,
				meidia_list: [],
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
			}
		},
		created() {
			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			this.init()
		},
		mounted() {
			console.log(this.meidia_list)
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
					}
				}
 
				getshow(getparams).then(response => {
					// this.data = response.items
					
					this.program = response.program_info
					//this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
					this.meidia_list = response.program_info.meidia_list
					
					// console.log(this.meidia_list)
					  
					this.taskin = true
				})


			},
			

		},
	}
</script>

<style scoped lang="less">
	
</style>
