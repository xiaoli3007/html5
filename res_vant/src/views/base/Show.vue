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



			<video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" :playsinline="true" @play="onPlayerPlay($event)"
			 @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)"
			 @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)"
			 @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)">
			</video-player>

			<van-divider>节目单</van-divider>

			<van-row v-for="(item2, index2) in meidia_list" :key="index2">
				<van-col span="24">
					<van-button plain hairline type="info" v-if="meidia_index!=index2" size="large" @click="changesrc(index2)">{{item2.title}}</van-button>
					<van-button type="info" v-if="meidia_index==index2" size="large" @click="changesrc(index2)">{{item2.title}}</van-button>

				</van-col>
			</van-row>

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

	export default {

		data() {
			return {
				catid: 0,
				news_id: 0,
				program: null,
				meidia_index: 0,
				meidia_list: [],
				data: null,
				taskin: false,
				playerOptions: {
					height: '300',
					autoplay: true,
					muted: true,
					language: 'zh-CN',
					playbackRates: [0.7, 1.0, 1.5, 2.0],
					sources: [{
						type: "video/mp4",
						// mp4 http://vjs.zencdn.net/v/oceans.mp4
						src: "",
						// webm 
						// src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
					}],
					poster: "",
				},
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
			// this.ebookid = 446654
			// console.log(this.ebookid);
			this.init()

		},
		mounted() {

			console.log(this.meidia_list)
			// console.log('this is current player instance object', this.player)
			if (this.meidia_list.length > 0) {

				setTimeout(() => {
					// console.log('dynamic change options', this.player)

					// change src
					// this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';

					// change item
					// this.$set(this.playerOptions.sources, 0, {
					//   type: "video/mp4",
					//   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
					// })

					// change array
					// this.playerOptions.sources = [{
					//   type: "video/mp4",
					//   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
					// }]
					this.player.muted(false)
				}, 5000)

			}
		},
		computed: {
			player() {
				return this.$refs.videoPlayer.player
			}
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
					console.log(response)
					this.program = response.program_info
					//this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
					this.meidia_list = response.program_info.meidia_list
					//console.log(this.meidia_list[0].videourl)
					if (response.program_info.meidia_list.length > 0 && response.program_info.meidia_list[0].videourl != '') {
						this.playerOptions.sources[0].src = response.program_info.meidia_list[0].videourl;
					}


					this.taskin = true
				})


			},
			changesrc(index) {
				if (this.meidia_list.length > 0 && this.meidia_list[index].videourl != '') {

					this.playerOptions.sources[0].src = this.meidia_list[index].videourl;
					this.meidia_index = index
				}
			},
			// listen event
			onPlayerPlay(player) {
				console.log('player play!', player)
			},
			onPlayerPause(player) {
				console.log('player pause!', player)
			},
			onPlayerEnded(player) {
				console.log('player ended!', player)
			},
			onPlayerLoadeddata(player) {
				console.log('player Loadeddata!', player)
			},
			onPlayerWaiting(player) {
				// console.log('player Waiting!', player)
			},
			onPlayerPlaying(player) {
				console.log('player Playing!', player)
			},
			onPlayerTimeupdate(player) {
				//console.log('player Timeupdate!', player.currentTime())
			},
			onPlayerCanplay(player) {
				// console.log('player Canplay!', player)
			},
			onPlayerCanplaythrough(player) {
				// console.log('player Canplaythrough!', player)
			},

			// or listen state event
			playerStateChanged(playerCurrentState) {
				// console.log('player current update state', playerCurrentState)
			},

			// player is ready
			playerReadied(player) {
				// seek to 10s
				console.log('example player 1 readied', player)
				player.currentTime(0)
				// console.log('example 01: the player is readied', player)
			}

		},
	}
</script>

<style scoped lang="less">
	.vjs_video_3-dimensions {

		height: 300px;

	}
</style>
