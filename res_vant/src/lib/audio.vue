<template>
	<div style="padding: 0 20px;">
		<div class="x-audio-wrap" :class="{inline:!block}" ref="wrap" @click="play">
			<div class="x-sector" :class="{play:animate}">
				<div class="x-dot"></div>
			</div>
			<div class="x-audio-du">
				<div class="x-text">{{text}}</div>
				<div class="x-time">xxxxxxxxxx</div>
			</div>
		</div>
		<van-row>
			<van-col span="8">
				<van-icon size="80" name="arrow-left" />
			</van-col>
			<van-col span="8">

				<van-icon size="80" name="pause-circle-o" />
				<!-- <van-icon size="50" name="play-circle-o" /> -->


			</van-col>
			<van-col span="8">
				<van-icon size="80" name="arrow" />
			</van-col>
		</van-row>
		
		<van-divider>节目单</van-divider>
		
			 <van-row v-for="(item2, index2) in audioinfoList" :key="index2">
				<van-col span="24">
					<van-button plain hairline type="info" v-if="mindex!=index2" size="large" @click="changesrc(index2)">{{item2}}</van-button>
					<van-button type="info" v-if="mindex==index2" size="large" @click="changesrc(index2)">{{item2}}</van-button>
			 
				</van-col>
			 </van-row>
						 

	</div>
</template>
<script>
	export default {
		name: 'm-audio',
		props: {
			//  src:{
			//      type:String,
			//      default:''
			//  },
			showDuration: {
				type: Boolean,
				default: true
			},
			block: {
				type: Boolean,
				default: false
			},
			autoplay: {
				type: Boolean,
				default: false
			},

			arraylistaudio: {
				type: Array,
			}
		},
		data() {
			return {
				animate: false,
				timer: null,
				duration: [],
				durationtime: [],
				text: '',
				ended: false,
				audioList: [],
				audioinfoList: [],
				mindex: 0,
			}
		},
		mounted() {


			this.arraylistaudio.forEach(audiot => { //开始前先关闭所有可能正在运行的实例		

				let tempaudio = new Audio()
				tempaudio.src = audiot.videourl

				tempaudio.onplay = () => {
					this.animate = true
					this.timer = setInterval(() => {
						this.animate = false
						setTimeout(() => {
							this.animate = true
						}, 50)
					}, 1250);
				}
				tempaudio.onpause = () => {
					this.animate = false
					this.timer && clearInterval(this.timer)
				}
				tempaudio.onended = () => {
					this.animate = false
					this.timer && clearInterval(this.timer)
					this.ended = true
				}
				this.audioList.push(tempaudio)

				var duration = null
				tempaudio.addEventListener('canplaythrough', () => {

					this.duration.push(this.format(tempaudio.duration))
					this.durationtime.push(tempaudio.duration)

					// 
				})
				let title = audiot.title
				this.audioinfoList.push(title)

			})
			// console.log( this.audioinfoList)
			// this.audioinfoList.forEach(function(value,index){

			// 	// console.log(value)

			//  });


			if (this.autoplay) {
				this.audioList[this.mindex].play()
			}

			console.log(this.durationtime[0])

			// this.duration = this.audioinfoList[this.mindex]
			// this.durationtime = this.audioinfoList[this.mindex]
			this.text = this.audioinfoList[this.mindex]


		},
		watch: {
			ended(newValue, oldValue) {
				// console.log(oldValue)
				//console.log(newValue)

				// this.$emit("passtoparent_ennd", newValue)
			}
		},
		methods: {
			play() {

				//         this.audioList.forEach(audio=>{//开始前先关闭所有可能正在运行的实例
				//             // audio.load()
				// // audio.fastSeek(0)
				// audio.pause()
				//         })

				console.log(this.audioList[this.mindex])

				if (this.audioList[this.mindex].paused) {
					this.audioList[this.mindex].play()
				} else {
					this.audioList[this.mindex].pause()
				}
				// console.log(this.ended)
				// this.$emit("passtoparenttabvlue", this.tabvalue)
			},
			format(s) {
				var t = '';
				if (s > -1) {
					var min = Math.floor(s / 60) % 60;
					var sec = s % 60;

					if (min < 10) {
						t += "0";
					}
					t += min + "'";
					if (sec < 10) {
						t += "0";
					}
					t += sec.toFixed(2);
				}
				t = t.replace('.', '\"')
				return t;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.x-audio-wrap {
		height: 130px;
		width: 100%;
		 
		border-radius: 15px;
		// border: 1px solid #ddd;
		display: flex;
		align-items: center;
		// justify-content: space-between;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);

		.x-sector {
			height: 7px;
			width: 7px;
			border-radius: 4px 10px;
			border-right: 2px solid #ddd;
			border-top: 2px solid #ddd;
			transform: rotate(45deg);
			position: relative;
			margin-left: 10px;

			.x-dot {
				height: 4px;
				width: 4px;
				border-radius: 4px;
				background: #ddd;
				position: absolute;
				top: 4px;
			}
		}

		.x-sector::before {
			content: "";
			height: 9px;
			width: 9px;
			border-radius: 4px 12px;
			border-right: 2px solid #ddd;
			border-top: 2px solid #ddd;
			transform: rotate(0deg);
			position: absolute;
			right: -7px;
			top: -7px;
		}

		.x-sector::after {
			content: "";
			height: 12px;
			width: 12px;
			border-radius: 4px 14px;
			border-right: 2px solid #ddd;
			border-top: 2px solid #ddd;
			transform: rotate(0deg);
			position: absolute;
			right: -13px;
			top: -13px;
		}

		.x-audio-du {
			margin-left: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.x-text {
			color: #999;
			font-size: 30px;
			margin-right: 10px;
		}

		.x-time {
			color: #999;
			font-size: 12px;
			margin-right: 10px;
		}

		&.inline {
			display: inline-flex
		}
	}

	@keyframes play-dot {
		from {
			background: #ddd
		}

		to {
			background: #5cadff
		}
	}

	@keyframes play-sector {
		from {
			border-color: #ddd
		}

		to {
			border-color: #5cadff
		}
	}

	.x-sector.play {
		animation: play-sector 0.3s 0.1s ease-in-out;
	}

	.x-sector.play::before {
		animation: play-sector 0.3s 0.2s ease-in-out;
	}

	.x-sector.play::after {
		animation: play-sector 0.3s 0.3s ease-in-out;
	}

	.x-sector.play .x-dot {
		animation: play-dot 0.3s ease-in-out;
	}
</style>
