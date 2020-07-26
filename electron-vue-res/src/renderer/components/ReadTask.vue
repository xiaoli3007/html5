<template>
	<div>
		<el-row>
			<el-col :span="20" :offset="2" justify="center" align="center">
				<div class="" style="margin-top: 15px;">
					<el-tag type="info"> {{words.name}}</el-tag>
					<el-tag type="info">
						<mytime :autoStart="true" :sendSync="true" ref="mytimea" v-on:getDataFromChild="getDataFromChild"></mytime>
					</el-tag>
					<!-- <el-tag type="info"> <mytime :autoStart="false" :sendSync="false" ref="mytimea2"></mytime> </el-tag> -->
					<el-tag type="info" @click.native="help_sy"> 调试按钮</el-tag>
					<el-tag type="info" v-if="type===1" >
						<el-switch
						  @change="s_autoplay"
						  v-model="rautoplay"
						  active-text="自动"
						  inactive-text="手动">
						</el-switch></el-tag>
					<el-tag type="success"> {{swiper_index}}/{{swiper_length}} </el-tag>
					<el-tag type="info" class="backbutton" @click.native="dialogTableVisible = true">使用帮助</el-tag>
					<el-tag type="info">
						<screenfull style="display: inline;" />
					</el-tag>
					<el-tag type="warning" @click.native="gotoback" class="backbutton" v-if="review!=1">退出</el-tag>
					<el-tag type="warning" @click.native="gotoReview" class="backbutton" v-if="review===1">退出</el-tag>
				</div>
			</el-col>
		</el-row>

		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="(slide, index) in words.word1" :key="index">
				<el-row style="min-height: 650px;">
					<el-col :span="20" :offset="2" justify="center" align="center">

						<div class="tasktext" v-if="type===1">
							<svg-icon icon-class="erji2"></svg-icon>
						</div>
						<el-tabs v-model="TabsValue[index]" tab-position="right" style=" margin-top: 15px;" v-if="type===2">
							<el-tab-pane label="字" name='0'>
								<div style="" class="zi_main">
									
									<div class="tasktext_ci" v-if="type===2 && slide.sw.length>1">
										<p style=" ">
										 {{slide.sw}} 
										<!-- 踏破铁鞋无觅处，得来全不费功夫 -->
										</p>
									
									</div>
									
										<div class="tasktext" v-if="type===2 && slide.sw.length===1">
											{{slide.sw}} 
										</div>
									 <transition name="el-zoom-in-center">
									<div class="zi_info" style=""  v-if="slide.wcell_type!='25' && zi_info">
										<p><span>笔顺： 
										<el-image style="width: 50px; height: 50px" :src="slide.word_show_detail.bihua_img" fit="fill">
											  
										</el-image></span>
										<span>{{slide.word_show_detail.bishun}} </span>
										</p>
										<p><span>笔画：{{slide.word_show_detail.bihuaw}} </span> <span>部首：{{slide.word_show_detail.bushou}}</span><span>字形：{{slide.word_show_detail.zixing}}</span></p>
										
										<div v-for="(item, indexssy)  in slide.word_show_detail.mean_list" :key="indexssy" v-if="indexssy<1">
											 
											<p><span>拼音：<m-audio  v-if="item.mp3!=''" 
											:show-duration="false" :text="item.pinyin" :src="item.mp3" 
											:block="false" ></m-audio> </span>
											<!-- <span>注音：{{item.zhuyin}} </span> -->
											</p>
											<p>释义：
											<span v-for="(shiyi, indexsy) in item.submean_list" :key="indexsy">
												{{shiyi}}
											</span>
											</p>
											<el-button style="float: right;  margin-bottom: 5px;" 
											v-if="slide.word_show_detail.mean_list.length>1" @click="showshiyi(index)" size="mini" round>更多音节释义</el-button>
										</div>
										
										<el-alert
										    title="按E关闭或开启此框"
										    type="warning"
										    :closable="false">
										  </el-alert>
									</div>
									<div class="zi_info_chengyu" style=""  v-if="slide.wcell_type=='25' && zi_info">
										<p>注音：<span>{{slide.word_show_detail.zhuyin}}</span></p>
										<p>出处：<span>{{slide.word_show_detail.chuchu}}</span></p>
										<p>释义：<span>{{slide.word_show_detail.shiyi}}</span></p>
										<p v-if="slide.word_show_detail.shili!=''">实例：<span>{{slide.word_show_detail.shili}}</span></p>
										<el-alert
										    title="按E关闭或开启此框"
										    type="warning"
										    :closable="false">
										  </el-alert>
									</div>
									</transition>
									
								</div>
							
								
							<!-- 	 -->
						 
							</el-tab-pane>
							<el-tab-pane label="词" name='1'>
								
								<div style="" class="zi_main">
								<div class="tasktext_ci" v-if="type===2" 
								style=" ">
									<p style=" "><span v-html="slide.dw"></span>  </p>
								</div>
									
									<transition name="el-zoom-in-center">
										<div class="zi_info_chengyu" style=""  v-if="zi_info">
											<p>拼音：<span>{{slide.dword_show_detail.pinyin}}</span></p>
											<p>释义：<span>{{slide.dword_show_detail.shiyi}}</span></p>
											<el-alert
												title="按E关闭或开启此框"
												type="warning"
												:closable="false">
											  </el-alert>
										</div>
									</transition>
									</div>
							</el-tab-pane>
							<el-tab-pane label="句" name='2'>
								<div class="tasktext_ju" v-if="type===2">
								
								<p style=" "> <span v-html="slide.lw"></span></p></div>
							</el-tab-pane>
						</el-tabs>
					</el-col>
				</el-row>

				<el-row v-if="type===2 && review!=1">
					<el-col :span="20" :offset="2" justify="center" align="center">
						<!-- <el-radio ref='elradio' v-model="task_result.word1[index]" label="1" @change="know(this,index,'1')" border>认识</el-radio>
						<el-radio v-model="task_result.word1[index]" label="2" @change="know(this,index,'2')" border>不认识</el-radio> -->

						<myradio :listdata="RadioclassArr" v-on:passtoparentradio="passtoparentradio" v-model="task_result[index].status"></myradio>
					</el-col>
				</el-row>
				
				<el-row v-if="type===2 && review===1">
					<el-col :span="20" :offset="2" justify="center" align="center">
						<el-tag type="warning"> 出自：{{slide.chuchu}}</el-tag>
			
					</el-col>
				</el-row>
					
				<el-row v-if="type===2 && review===1">
					<el-col :span="20" :offset="2" justify="center" align="center">
						<el-tag type="info"> 下次复习时间</el-tag>

						<myradio :listdata="RadiofuxiArr[index]" v-on:passtoparentradio="passtoparentradio2" v-model="task_result[index].fx_time"></myradio>
						<!-- <el-radio v-model="task_result.fx_time[index]" label="600" border>10分钟</el-radio>
						<el-radio v-model="task_result.fx_time[index]" label="3600" border>1小时</el-radio>
						<el-radio v-model="task_result.fx_time[index]" label="86400" border>1天</el-radio>
						<el-radio v-model="task_result.fx_time[index]" label="345600" border>4天</el-radio> -->
					</el-col>
				</el-row>


				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">



						<el-tooltip content="键盘:Home" placement="bottom" effect="light">
							<el-button size="small" @click.native="swiper_slideTo(0)" round>首字</el-button>
						</el-tooltip>
						<el-tooltip content="字音(键盘:空格)" placement="bottom" effect="light">
							<m-audio :show-duration="false" text="字" :src="slide.local_sw_sound" :block="false" ref="myaudio_zi" tabvalue="0"
							 v-on:passtoparenttabvlue="passtoparenttabvlue" v-on:passtoparent_ennd="passtoparent_ennd"></m-audio>
						</el-tooltip>
						<el-tooltip content="词音(键盘:T)" placement="bottom" effect="light">
							<m-audio :show-duration="false" text="词语" :src="slide.local_dw_sound" :block="false" ref="myaudio_ci" tabvalue="1"
							 v-on:passtoparenttabvlue="passtoparenttabvlue"></m-audio>
						</el-tooltip>
						<el-tooltip content="句音(键盘:S)" placement="bottom" effect="light">
							<m-audio :show-duration="false" text="例句" :src="slide.local_lw_sound" :block="false" ref="myaudio_ju" tabvalue="2"
							 v-on:passtoparenttabvlue="passtoparenttabvlue"></m-audio>
						</el-tooltip>
						
						<el-tooltip content="释义(键盘:E)" placement="bottom" effect="light">
							 <el-button size="small" @click="zi_info = !zi_info" round>释义</el-button>
						</el-tooltip>
						<el-tooltip content="键盘:End" placement="bottom" effect="light">
							<el-button size="small" @click.native="swiper_slideTo(1)" round>尾字</el-button>
						</el-tooltip>
						<!-- <myaudio :show-duration="false" text="字" :block="false" :src="slide.local_sw_sound" ref="myaudio_ju"></myaudio> -->
					</el-col>
				</el-row>


				<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						<el-button type="primary" v-if="index===words.word1.length-1 && type===1 && review!=1" @click="gotojc()">听写检查</el-button>
						<el-button type="primary" v-if="index===words.word1.length-1 && type===2 && review!=1" @click="gotoback()">认字完成</el-button>
						<el-button type="primary" v-if="index===words.word1.length-1 && type===2 && review===1" @click="gotoReview()">复习完成</el-button>
					</el-col>
				</el-row>

			</swiper-slide>

			<!-- Optional controls -->
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
			<!--<div class="swiper-scrollbar" slot="scrollbar"></div> -->
		</swiper>


	 	<el-dialog title="使用帮助" :visible.sync="dialogTableVisible">
			<readtaskhelptext></readtaskhelptext>
		</el-dialog> 
		<!-- <el-drawer  direction="ttb" size="100%" title="使用帮助" :visible.sync="dialogTableVisible">
				<readtaskhelptext></readtaskhelptext>
		</el-drawer> -->
		
		<el-drawer v-for="(dslide, dindex) in words.word1" :key="dindex" title="多音字释义详细" :visible.sync="shiyi_show_list[dindex]" direction="rtl" size="50%">
				<el-row :gutter="20">
				  <el-col :span="24">
					  <div class="zi_info_shiyi">
							<div v-for="(item, indexssy)  in dslide.word_show_detail.mean_list" :key="indexssy" >
								 
								<p><span>拼音：<m-audio  v-if="item.mp3!=''" 
								:show-duration="false" :text="item.pinyin" :src="item.mp3" 
								:block="false" ></m-audio> </span>
								<span>注音：{{item.zhuyin}} </span>
								</p>
								<p>释义：
								<span v-for="(shiyi, indexsy) in item.submean_list" :key="indexsy">
									{{shiyi}}
								</span>
								</p>
								 <el-divider></el-divider>
							</div>
							
					  </div>
				</el-col>
				 
				</el-row>
		</el-drawer>
		
		
	</div>
</template>

<script>
	// import wavv from '@/assets/voice/26/73/2673734f025fa484228e34212569c44a.wav'
	
	import { getAutoplay_time,getAutoplay_repeat,getshiyi_isshow} from '@/utils/auth'
		
	const remote = require('electron').remote
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'

	import Screenfull from '@/components/Screenfull'
	import mytime from '@/components/mytime'
	import myradio from '@/components/myradio'
	import readtaskhelptext from '@/components/readtaskhelptext'
	import { taskin , taskindata ,taskinwcell ,taskinwcell_super , taskintime} from '@/api/task'
	
	export default {
		name: 'read-task',
		props: {
			words: {
				type: Object
			},
			// rautoplay: {
			// 	type: Boolean,
			// 	default: false
			// },
			type: {
				type: Number,
				default: 1
			},
			review: {
				type: Number,
				default: 0
			},
			// audiolist:[]
		},
		data() {
			const self = this
			return {
				// wavv,
				// data_rautoplay: this.rautoplay,
				// radioaaa: '',
				// shiyi_isshow: getshiyi_isshow()=='1' ? true : false,
				table:false,
				shiyi_show_list: [],
				zi_info:getshiyi_isshow()=='' ? true : getshiyi_isshow()=='1' ? true : false,
				rautoplay:true,
				TabsValue: [],
				TabsValue2: '0',
				RadioclassArr: [{
					name: "认识",
					value: "1"
				}, {
					name: "不认识",
					value: "2"
				}],
				RadiofuxiArr: [],
				dialogTableVisible: false,
				task_result: {
					taskid: this.words.taskid,
					name: this.words.name,
					status: [],
					fx_time: [],
				},
				task_result_status: [],
			 
				resource: '',
				isplaynow: false,
				thistype: this.words,
				swiper_index: 1,
				swiper_length: 0,
				xx_time: 0,
				swiperOption: {
					// some swiper options/callbacks
					// 所有的参数同 swiper 官方 api 参数
					// ...
					// effect : 'flip',

					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						// type: 'fraction'
						type: 'progressbar'
					},
					simulateTouch: false, //禁止鼠标模拟
					// autoplay: self.rautoplay ? {
					// 	delay: 5000,
					// 	stopOnLastSlide: true,
					// 	disableOnInteraction: true,
					// 	waitForTransition: true,
					// } : false,
					autoplay:  {
						delay: getAutoplay_time()?parseInt(getAutoplay_time())*1000:5000,
						stopOnLastSlide: true,
						disableOnInteraction: true,
					} ,
					keyboard: { //键盘打开
						enabled: true,
						onlyInViewport: true,
					},
					on: {
						autoplayStart:function(){
						 
						 // console.log('开启自动切换')
					  },
						init: function() {
							//Swiper初始化了
							// console.log(self.rautoplay);	
							setTimeout(() => {
								// 								console.log('当前的slide序号是' + this.activeIndex);
								// 								console.log('当前的slide序号是' + this.realIndex);
								if (self.rautoplay) {
									self.$refs.myaudio_zi[this.realIndex].play()
								}
							}, 1000)
						},
						keyPress: function(event) {
							// console.log('你按了键盘' + event)
							if (event == 32) {
								//空格控制语音
								// console.log(this.audiolist)
								self.$refs.myaudio_zi[this.realIndex].play()
								// this.audiolist[this.realIndex].play()
								// this.audio=new Audio()
								// this.audio.src=require('@/assets/'+this.wordsdata.word1[this.realIndex].sw_sound)
								// this.audio.src='http://1252014125.vod2.myqcloud.com/46740e39vodcq1252014125/1db79a9a5285890783173288539/ZOaFuTmGs30A.mp3'
								// this.audio.play()
								// console.log(this.wordsdata.word1[this.realIndex].sw_sound);
								// console.log(this.realIndex);
								if (self.type == 2) {
									self.$set(self.TabsValue, this.realIndex, "0")
								}

							} else if (event == 84) { // 按键T 读词

								self.$refs.myaudio_ci[this.realIndex].play()

								if (self.type == 2) {
									self.$set(self.TabsValue, this.realIndex, "1")
								}

							} else if (event == 83) { // 按键S 读句子

								self.$refs.myaudio_ju[this.realIndex].play()

								if (self.type == 2) {
									self.$set(self.TabsValue, this.realIndex, "2")
								}

							} else if (event == 36) { //home 按键

								this.slideTo(0, 1000, false)

							} else if (event == 35) { //end 按键

								this.slideTo(this.slides.length, 1000, false)

							} else if (event == 38) { //上 按键

								if (parseInt(self.TabsValue[this.realIndex]) > 0) {
									// console.log(333)
									let t = parseInt(self.TabsValue[this.realIndex]) - 1
									self.$set(self.TabsValue, this.realIndex, t.toString())
								}
								// console.log(self.TabsValue[this.realIndex])	

							} else if (event == 40) { //下 按键

								// self.TabsValue[0]='2'
								// self.TabsValue2 = '2'
								if (parseInt(self.TabsValue[this.realIndex]) < 2) {
									// console.log(333)
									let t = parseInt(self.TabsValue[this.realIndex]) + 1
									self.$set(self.TabsValue, this.realIndex, t.toString())
								}
								// console.log(self.TabsValue[this.realIndex])	
							} else if (event == 112) { //F1 按键

								remote.getCurrentWindow().setFullScreen(!remote.getCurrentWindow().isFullScreen())
							}else if (event == 69) { //E 按键  字的释义
								
								self.zi_info = !self.zi_info
							}
						},
						slideChange: function() {
							// console.log('改变了')
							// remote.getCurrentWindow().focus()
							// console.log(remote.getCurrentWindow().isFocused())
							// console.log(this.realIndex);
							self.swiper_index = this.realIndex + 1
							setTimeout(() => {
								if (self.rautoplay) {
									self.$refs.myaudio_zi[this.realIndex].play()
								}
							}, 1000)
						}
					},
				}
			}
		},
		created() {
			console.log(this.words); 
			let temp = this.words.word1
			let task_word_data_items = this.words.task_word_data_items
			const selfmain = this
			//语音文件加载==========================================================
			_(temp).forEach(function(value, key) {
				// console.log(value);
				// let a = new Audio()
				// a.src = value.sw_sound
				// let b = new Audio()
				// b.src = value.sw_sound
				// let c = new Audio()
				// c.src = value.sw_sound
				// this.audiolist.push(a)
				// _.set(temp, key + "[sw_audio]", a);
				// _.set(temp, key + "[dw_audio]", b);
				// _.set(temp, key + "[lw_audio]", c);
				// _.set(temp, key + "[local_sw_sound]", require('@/assets/' + value.sw_sound));
				
				_.set(temp, key + "[local_sw_sound]", value.sw_sound);
				_.set(temp, key + "[local_dw_sound]", value.dw_sound);
				_.set(temp, key + "[local_lw_sound]", value.lw_sound);
				
				_.set(selfmain.TabsValue, key, "0");
				_.set(selfmain.shiyi_show_list, key, false);
				
				// _.set(selfmain.RadiofuxiArr, key, [{
				// 	name: "6天",
				// 	value: "6",
				// 	quality:2
				// }, {
				// 	name: "14天",
				// 	value: "14",
				// 	quality:3
				// }, {
				// 	name: "15天",
				// 	value: "15",
				// 	quality:4
				// }, {
				// 	name: "16天",
				// 	value: "16",
				// 	quality:5
				// }]);
				_.set(selfmain.RadiofuxiArr, key, value.review_select_days);
				
			});
			// console.log(selfmain.RadiofuxiArr);
			//字的状态加载==========================================================
			_(task_word_data_items).forEach(function(value, key) {
				
				
				// _.set(selfmain.task_result_status,  key, "1");
				_.set(selfmain.task_result, key+"[id]", value.id);
				_.set(selfmain.task_result, key+"[wcellid]", value.wcellid);
				_.set(selfmain.task_result, key+"[status]", value.status);
				_.set(selfmain.task_result, key+"[fx_time]", '');
				
			});
			// this.task_result = Object.assign({},this.task_result)
			// console.log(this.task_result);
			
		},
		components: {
			Screenfull,
			mytime,
			myradio,
			readtaskhelptext
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		mounted() {
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			// console.log(this.words);
			
			if(this.words.survey){
				// console.log(this.words.survey.progress_wcellid);
				
				let temp_progress_wcellid = this.words.survey.progress_wcellid ;
				
				let temp_goto_index = 0 ;
				//找到上次进行到哪个key
				if(temp_progress_wcellid){
					this.words.word1.forEach(function(value,i){
					　　//console.log('forEach遍历:'+i+'--'+value.wcellid);
						if(value.wcellid===temp_progress_wcellid){
						 	 temp_goto_index = i + 1;
							 // console.log(temp_goto_index);
						 }
						// console.log(this.words.survey.progress_wcellid);
						
					})
				}
				// console.log(temp_goto_index);
				
				if(temp_goto_index>0){
					this.goto_index(temp_goto_index)
				}
			}
			
			this.swiper.wordsdata = this.words
			// this.audiolist = new Audio() swiper_length
			// console.log(this.swiper)
			this.swiper_index = this.swiper.realIndex + 1
			this.swiper_length = this.swiper.slides.length
			// this.swiper.audiolist = temp
			
			this.swiper.autoplay.stop()  
			this.rautoplay = false 
		},
		methods: {
			showshiyi(index){
				this.$set(this.shiyi_show_list, index, true)
			},
			 goto_index(temp_goto_index) {
				this.$confirm('是否继续上次任务进度?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					
					this.swiper.slideTo(temp_goto_index, 1000, false)
				 //  this.$message({
					// type: 'success',
					// message: '成功!'
				 //  });
				}).catch(() => {
				 //  this.$message({
					// type: 'info',
					// message: '已取消'
				 //  });          
				});
			  }
			,
			gotoback() {
				this.timelog()
				this.$router.replace({
					name: 'Task'
				})
			},
			gotoReview() {
				this.timelog()
				this.$router.replace({
					name: 'Reviewlist'
				})
			},
			gotojc() {
				this.timelog()
				this.$router.replace({
					name: 'ReadCheck',
					query: { words: this.words}
				})
			},
			timelog(){
				console.log("xx_time"+this.$refs.mytimea.all_second);
				//发送请求记录当前字的 学习时间
				taskintime(this.words.taskid,this.$store.state.user.userid,this.$refs.mytimea.all_second,this.review).then(response => {
						// console.log(response)
				})
			},
			swiper_slideTo(data) {
				// console.log(this.words);
				if (data === 0) {
					this.swiper.slideTo(0, 1000, false)
				} else {
					this.swiper.slideTo(this.swiper.slides.length - 1, 1000, false)
				}
			},
			know(that, index, knowtype) {

				// console.log("字type" + knowtype);
				// console.log(this.task_result)
				// this.swiper.slideTo(this.swiper.realIndex + 1, 500, false)
				// remote.getCurrentWindow().show()
				// console.log(remote.getCurrentWindow().isFocused())
				// this.swiper.$wrapperEl[0].focus()
				// console.log(this.swiper.$wrapperEl[0])
			},
			passtoparenttabvlue(index) {
				 //console.log("11索引" + index);
				if (this.type == 2) {
					this.$set(this.TabsValue, this.swiper.realIndex, index)
				}
			},
			passtoparent_ennd(isend) {
				// console.log("当前的播放音频是否结束" );
				// console.log(isend);
			},
			s_autoplay(){
				 // console.log(this.rautoplay);
				 // setTimeout(() => {
				 // 	// 								console.log('当前的slide序号是' + this.activeIndex);
				 // 	// 								console.log('当前的slide序号是' + this.realIndex);
				 // 	 
				 // 	 if(this.rautoplay){
				 // 		this.$refs.myaudio_zi[this.swiper.realIndex].play()
				 // 		this.swiper.autoplay.start() 
				 // 	}else{
				 // 		this.swiper.autoplay.stop()  
				 // 	}
				 // 	 
				 // }, 1000)
				 const selfmains = this
				 // this.$refs.myaudio_zi[this.swiper.realIndex].playtimes(5)
				 let autotime=getAutoplay_time()?parseInt(getAutoplay_time())*1000:5000
				 let times = getAutoplay_repeat()?parseInt(getAutoplay_repeat()):1
				 let jg_times = 2000*times
				 // console.log( autotime);
				 
				 var f = function(a,l){
					
				 	// return a;
				 	if(a===l){
						selfmains.rautoplay = false
				 		console.log('end2');
				 		return
				 	}else{
				 		
				 		let t = Math.ceil(selfmains.$refs.myaudio_zi[a].durationtime*1000)*times+jg_times+500
				 		let tp =t>autotime?t:autotime
				 		// console.log( a);
				 		// console.log( tp);
				 		selfmains.$refs.myaudio_zi[a].playtimes(times)
				 		a++
				 		setTimeout(() => {
							 if(!selfmains.rautoplay){
								console.log('end1');
								return
							}
				 			console.log( a);
				 			selfmains.swiper.slideTo(a, 500, false)
				 			f(a,l);
				 		}, tp)
				 	}
				 	
				 }
				 f(this.swiper.realIndex,this.$refs.myaudio_zi.length)
				 
				
			},
			help_sy() {
					
				// for(let i=this.swiper.realIndex;i<this.$refs.myaudio_zi.length;i++){
				// 	let t = Math.ceil(this.$refs.myaudio_zi[i].durationtime*100)*times+jg_times
				// 	let tp =t>autotime?t:autotime
				// 	// console.log( i );
				// 	// setTimeout(() => {
				// 	// 	console.log( i);
				// 	// }, tp)
				// }
				
				
				
				
				// console.log(typeof this.task_result);
				// 
				// var str = JSON.stringify(this.task_result);
				// 
				// taskindata(15,str).then(response => {
				// 		console.log(response.data)
				// })
			},  
			getDataFromChild(data) {
				this.xx_time = data
				// console.log("getDataFromChild"+this.xx_time);
				
				// console.log(this.$refs.mytimea.all_second)
			},
			passtoparentradio(data) {
				// console.log("passtoparentradio---" + data);
				this.task_result[this.swiper.realIndex].status = data
				// this.$set(this.task_result[this.swiper.realIndex].status, this.swiper.realIndex, data)
				
				//发送请求记录当前字的 学习状态 计算难度因子
				taskinwcell(this.words.taskid,this.$store.state.user.userid,this.words.word1[this.swiper.realIndex].wcellid,data).then(response => {
						// console.log(response)
				})
				
				this.swiper.slideTo(this.swiper.realIndex + 1 < this.swiper.slides.length ? this.swiper.realIndex + 1 : this.swiper
					.slides.length, 1000, false)
			},
			passtoparentradio2(data) {
				console.log("passtoparentradio2---" + data);
				// console.log(typeof data.toString());
				//console.log(this.RadiofuxiArr[this.swiper.realIndex]);
				let temp_fact =null 
				this.RadiofuxiArr[this.swiper.realIndex].forEach(function(value,i){
				　　console.log('forEach遍历:'+i+'--'+value);
					if(value.value===data){
						
						temp_fact= value
					}

				})
				
				console.log(temp_fact);
				
				taskinwcell_super(this.$store.state.user.userid,this.words.word1[this.swiper.realIndex].task_wcell_id,temp_fact.value,temp_fact.quality,temp_fact.factor).then(response => {
						// console.log(response)
				})
				this.task_result[this.swiper.realIndex].fx_time = data.toString()
				this.swiper.slideTo(this.swiper.realIndex + 1 < this.swiper.slides.length ? this.swiper.realIndex + 1 : this.swiper
					.slides.length, 1000, false)
			}

		}
	}
</script>

<style>
	.tasktext,
	.tasktext_ci,
	.tasktext_ju {
		/* width: 500px; height: 300px; */
		font-size: 500px;
		/* text-align: center; */
		margin-top: 1rem;
		user-select: none;
	}

	.tasktext_ci {
		display: flex;min-height: 650px;flex-direction: row;justify-content: center;
		font-size: 200px;text-align: left;

	}

	.tasktext_ju {
		display: flex;min-height: 650px;flex-direction: row;justify-content: center;
		font-size: 80px;
		text-align: left;

	}
	.tasktext_ci p,.tasktext_ju p{
		margin: 0;align-self: center;
	}
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.backbutton {
		cursor: pointer;
	}
	
	.zi_main{ 
		display: flex;flex-direction: row;justify-content: center;
	}
	.tasktext{ 
		/* margin-left: 150px; */
	}
	.zi_info_chengyu{
		align-self: flex-end; text-align: left;    margin-bottom: 10px; max-width:350px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px;position: absolute;  
		color: #606266;
		    line-height: 1.4;
		right: 0;
	}
	.zi_info{  /*display: none; */
		align-self: center; text-align: left; margin-left: 30px;    margin-bottom: 15px; max-width:300px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px;position: absolute; margin-right: 15px;
		color: #606266;
		    line-height: 1.4;
		right: 0;
	}
	.zi_info p span{
		margin-right: 15px;  
	}
	
	.zi_info_p{  /*display: none; */
		 text-align: left; 
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding: 10px;font-size: 12px;
	}
	.zi_info_p  span{
		margin-right: 15px;  
	}
	.zi_info_shiyi{
		padding: 0 20px;
		color: #606266; font-size: 18px;
	   line-height: 1.8;
	}
</style>
