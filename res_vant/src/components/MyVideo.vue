<template>
  <div>
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
</template>
<script>
	
	import {
		media_frequency
	} from '@/api/base'
	
export default {
	name: 'my-video',
  data() {
    return {
      // isStart: false,
      meidia_index: 0,
      playerOptions: {
      	height: '300',
      	autoplay: false,
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
	  
    }
  },
  watch: {
   
  },
  props: {
    meidia_list: {
      type: Array,
    },
    autoStart: {
      type: Boolean,
      default: false,
    },
    // defaultVal: {
    //   type: Number,
    //   default: 0,
    // }
  },
  mounted() {
		// 
		console.log(this.meidia_list)
		if (this.meidia_list.length > 0) {
			
			this.playerOptions.autoplay = this.autoStart
			
			if (this.meidia_list.length > 0 && this.meidia_list[0].playurl != '') {
				this.playerOptions.sources[0].src = this.meidia_list[0].playurl;
			}
			
			setTimeout(() => {
				// console.log('dynamic change options', this.player)
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
			}, 1000)
		
		}
		
  },
  computed: {
    player() {
    	return this.$refs.videoPlayer.player
    }
  },
  created: function() {
    console.log('created')
	

	
  },
  components: {},
  methods: {
    changesrc(index) {
    	if (this.meidia_list.length > 0 && this.meidia_list[index].playurl != '') {
    
    		this.playerOptions.sources[0].src = this.meidia_list[index].playurl;
    		this.meidia_index = index
			this.playerOptions.muted = false
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
		
		// console.log(this.meidia_index)
		
		
			let params = {
				catid: this.meidia_list[this.meidia_index].catid,
				news_id: this.meidia_list[this.meidia_index].news_id,
				media_id: this.meidia_list[this.meidia_index].id,
				userid: this.$store.state.user.userid,
			}
		console.log(params)
		media_frequency(params).then(response => {
			console.log(response)
		})
		
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
     
  }
}
</script>
<style>
/* div{ display: inline;} */
.vjs_video_3-dimensions {

		height: 300px;

	}
</style>