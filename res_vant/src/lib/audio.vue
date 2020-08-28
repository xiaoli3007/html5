<template>
	<div style="padding: 0 20px;">
		
		<div style="padding:0 0  30px 0;">
		<van-row>
			<van-col span="24">
		
		<van-slider @input="sliderinput" @change="sliderchange" v-model="jindu" :min="0" :max="100" bar-height="20"  >
		  <!-- <template #button>
		    <div class="custom-button">
		       
		    </div>
		  </template> -->
		</van-slider>
		
		</van-col>
		</van-row>
		</div>
		
		<div class="x-audio-wrap" :class="{inline:!block}" ref="wrap" @click="play">
			<div class="x-sector" :class="{play:animate}">
				<div class="x-dot"></div>
			</div>
			<div class="x-audio-du">
				<div class="x-text">{{text}}</div>
				<div class="x-time">{{duration}}</div>
			</div>
		</div>
		<van-row>
			<van-col span="8">
				<van-icon size="80" @click="prevSong"  name="arrow-left" />
			</van-col>
			<van-col span="8">

				<van-icon size="80"  @click="play" v-if="isplay" name="pause-circle-o" />
				 <van-icon size="80" @click="play"  v-if="!isplay" name="play-circle-o" /> 


			</van-col>
			<van-col span="8">
				<van-icon size="80" @click="nextSong"  name="arrow" />
			</van-col>
		</van-row>
		
		<van-row>
				<van-col span="6">
					<van-button @click="changestate(0)"  v-if="state!=0" plain type="primary">顺序</van-button>
					<van-button v-if="state==0"  type="primary">顺序</van-button>
					
				</van-col>
				<van-col span="6">
					<van-button @click="changestate(1)" v-if="state!=1" plain type="primary">随机</van-button>
					<van-button v-if="state==1" type="primary">随机</van-button>
					
				</van-col>
				<van-col span="6">
					<van-button @click="changestate(2)" v-if="state!=2" plain type="primary">单曲循环</van-button>
					<van-button v-if="state==2" type="primary">单曲循环</van-button>
					
				</van-col>
				<van-col span="6">
					<van-button @click="changestate(3)" v-if="state!=3" plain type="primary">顺序循环</van-button>
					<van-button v-if="state==3" type="primary">顺序循环</van-button>
					
				</van-col>
		</van-row>
		
	
		
		
		<van-divider>节目单</van-divider>
		
			 <van-row v-for="(item2, index2) in audioinfoList" :key="index2">
				<van-col span="24">
					<van-button plain hairline type="info" v-if="mindex!=index2" size="large" @click="setCurIndex(index2)">{{item2}}</van-button>
					<van-button type="info" v-if="mindex==index2" size="large" >{{item2}}</van-button>
			 
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
				slidertimer: null,
				duration: null,
				durationtime: null,
				text: '',
				ended: false,
				audioList: [],
				audioinfoList: [],
				mindex: 0,
				isplay: false,
				state:0,
				jindu: 0,
				ctime: null,
			}
		},
		mounted() {


			this.arraylistaudio.forEach(audiot => { 		

				let tempaudio = new Audio()
				tempaudio.src = audiot.videourl
				this.audioList.push(tempaudio)
				let title = audiot.title
				this.audioinfoList.push(title)

			})
			// console.log( this.audioinfoList)
			// this.audioinfoList.forEach(function(value,index){

			// 	// console.log(value)

			//  });


			// if (this.autoplay) {
			// 	this.audioList[this.mindex].play()
			// }
			
		  	
			this.initplay()	
		},
		watch: {
			ended(newValue, oldValue) {
				//  console.log(oldValue)
				// console.log(newValue)
				if(newValue){
					this.nextSong()
				}
				// this.$emit("passtoparent_ennd", newValue)
			},
			ctime(newValue, oldValue) {
			
				// console.log(newValue)
				if(newValue){
					this.duration =this.format(newValue)
					let geValue = (newValue*100)/this.durationtime
						// console.log(geValue)
					this.jindu = geValue
				}
			}
		},
		methods: {
			sliderinput(e){
				// console.log(e)
			},
			sliderchange(e){
				// console.log(e)
				// console.log(this.durationtime)
				let a = this.audioList[this.mindex]
				let geValue = (e*this.durationtime)/100
				// console.log(geValue)
				this.stop()
				this.audioList[this.mindex].currentTime = geValue
				this.play()
				// console.log(a.currentTime )
			},
			initplay(){
				 let tmp = this.audioList[this.mindex]
				 
				 if(this.duration){
					 this.duration =this.format(tmp.duration)
					 this.durationtime =tmp.duration
				 }else{
					 tmp.addEventListener('canplaythrough', () => {
					  	this.duration =this.format(tmp.duration)
					  	this.durationtime =tmp.duration
					  })
				 }
				 
				  tmp.onplay = () => {
					  this.ended = false
				  	this.animate = true
				  	this.timer = setInterval(() => {
				  		this.animate = false
				  		setTimeout(() => {
				  			this.animate = true
				  		}, 50)
				  	}, 1250);
					
					this.slidertimer = setInterval(() => {
						 this.ctime= tmp.currentTime 
					}, 1000);
					
				  }
				  tmp.onpause = () => {
				  	this.animate = false
				  	this.timer && clearInterval(this.timer)
					this.slidertimer && clearInterval(this.slidertimer)
				  }
				  tmp.onended = () => {
				  	this.animate = false
				  	this.timer && clearInterval(this.timer)
					this.slidertimer && clearInterval(this.slidertimer)
				  	this.ended = true
				  }
				  // this.ctime= this.audioinfoList[this.mindex].currentTime 
				  this.text = this.audioinfoList[this.mindex]
				  this.isplay = !this.audioList[this.mindex].paused
			},
			play() {
 
				// console.log(this.audioList[this.mindex])
				if (this.audioList[this.mindex].paused) {
					this.audioList[this.mindex].play()
					this.isplay = true
				} else {
					this.audioList[this.mindex].pause()
					this.isplay = false
				}
				// console.log(this.ended)
				// this.$emit("passtoparenttabvlue", this.tabvalue)
			},
			changestate(state){
				this.state = state
				// console.log(Math.floor(Math.random()*this.audioList.length))
			},
			stop() {
				// console.log(this.audioList[this.mindex])
				this.audioList[this.mindex].pause()
				this.audioList[this.mindex].load()
				this.isplay = false
			},
			// 修改索引
			setCurIndex(index){
			  this.stop()
			  this.mindex = index;
			  this.initplay()	//初始化新的音频
			  this.play()
			  
			},
			// 切换到上一首歌曲
			prevSong(){
			 let  currentIndex = this.mindex	
			  currentIndex--;
			  if(currentIndex<0){
				  return
			  }
			  currentIndex = currentIndex>0?currentIndex:0;
			  this.setCurIndex(currentIndex)
			},
			// 切换到下一首歌曲
			nextSong(){
			   let  currentIndex =  this.mindex	
			   
			   if(this.state==1){	//随机播放 
			   
			     currentIndex = Math.floor(Math.random()*this.audioList.length)
				 console.log(currentIndex)
			   }else if(this.state==3){	 //顺序循环
					
					currentIndex++;
					
					currentIndex = currentIndex>this.audioList.length-1?0:currentIndex;
					
			   }else if(this.state==2){	 //单曲循环
			    
			   }else if(this.state==0){	//顺序播放
				   currentIndex++;
				   if(currentIndex>this.audioList.length-1){
				   	 return
				   }
			   }
			 
			  this.setCurIndex(currentIndex)
			},
			format(s) {
				var t = '';
				if (s > -1) {
					var min = Math.floor(s / 60) % 60;
					var sec = s % 60;

					if (min < 10) {
						t += "0";
					}
					t += min + ":";
					if (sec < 10) {
						t += "0";
					}
					// t += sec.toFixed(2);
					t += sec.toFixed(0);
				}
				t = t.replace('.', '\:')
				return t;
			},
		}
	}
</script>
<style lang="scss" scoped>
	 .custom-button {
	    width: 26px;
		height: 35px;
	    color: #fff;
	    font-size: 10px;
	    line-height: 18px;
	    text-align: center;
	    background-color: #00FF00;
	    border-radius: 100px;
	  }
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
