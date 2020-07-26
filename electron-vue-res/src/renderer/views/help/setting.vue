<template>
	<div class="app-container">


		<el-form ref="form" :model="form" label-width="200px">


			<el-form-item label="软件版本" v-if="v" >

				<el-button>当前版本：{{version}} &nbsp; 
				
				<span v-if="version_info.version == version" >(已经是最新版本)</span>
				</el-button>
				
				<el-button v-if="version_info.version !== version"  @click="go(version_info.url)" class="c-hand">最新版本： {{version_info.version}}&nbsp;下载更新</el-button>

			</el-form-item>

  
			<!--<el-form-item label="调试窗口">
				<el-button type="primary" @click="openDev">打开 / 关闭 调试窗口</el-button>
				 <el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button> 
			</el-form-item>-->
			<el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
				<el-table >
					<el-table-column property="date" label="日期" width="150"></el-table-column>
					<el-table-column property="name" label="姓名" width="200"></el-table-column>
					<el-table-column property="address" label="地址"></el-table-column>
				</el-table>
			</el-drawer>

			<el-form-item label="播放声音">
				<el-radio-group v-model="form.voicetype">
					<el-radio :label="2">女声</el-radio>
					<el-radio :label="1">男声</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="听写间隔时间(秒)">
				<el-slider v-model="form.autoplay_time" :min="3" :max="20" show-input></el-slider>
			</el-form-item>

			<el-form-item label="自动听写重复播报次数">
				<el-slider v-model="form.autoplay_repeat" :min="1" :max="5" show-input></el-slider>
			</el-form-item>
			
			<el-form-item label="识字多音释义框默认是否显示">
				<el-switch
				    v-model="form.shiyi_isshow"
				    active-color="#13ce66"
				    inactive-color="#ff4949"
				    active-value="1"
				    inactive-value="2">
				  </el-switch>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<!-- <el-button>取消</el-button> -->
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	const CURRENT_VERSION = '1.0.0'
	const {
		shell,
		getCurrentWebContents
	} = require('electron').remote

	import {
		setVoicetype,
		setAutoplay_time,
		getVoicetype,
		getAutoplay_time,
		getAutoplay_repeat,
		setAutoplay_repeat,
		setshiyi_isshow,
		getshiyi_isshow
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		setting
	} from '@/api/help'
	
	import { setting_info} from '@/api/table'
	
	export default {
		data() {
			return {
				version_info:null,
				setting_info:null,
				table: false,
				v: false,
				version:CURRENT_VERSION,
				form: {
					
					voicetype: getVoicetype() ? parseInt(getVoicetype()) : 2,
					autoplay_time: getAutoplay_time() ? parseInt(getAutoplay_time()) : 5,
					autoplay_repeat: getAutoplay_repeat() ? parseInt(getAutoplay_repeat()) : 1,
					shiyi_isshow: getshiyi_isshow() ? getshiyi_isshow() : '1'
				}
			}
		},
		created() {
			this.fetchData()
			// console.log(getshiyi_isshow());
			// console.log(this.form.shiyi_isshow);
			// console.log(getAutoplay_time());
			// console.log(getAutoplay_repeat());
				
		},
		methods: {
			go(url) {
				shell.openExternal(url)
			},
			openDev() {
				getCurrentWebContents().toggleDevTools()
			},
			onSubmit() {
				const loading = this.$loading({
					lock: true,
					text: '提交中， 请稍等...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});

				console.log(this.form);
				setVoicetype(this.form.voicetype)
				setAutoplay_time(this.form.autoplay_time)
				setAutoplay_repeat(this.form.autoplay_repeat)
				setshiyi_isshow(this.form.shiyi_isshow)

				setting(this.$store.state.user.userid, this.form.voicetype, this.form.autoplay_time, this.form.autoplay_repeat,this.form.shiyi_isshow).then(
					response => {
						loading.close();
						console.log(response)
						_g.toastMsg('success', '保存成功！', this)
					})
				// loading.close();


			},
			fetchData() {
			    _g.openGlobalLoading()
			  // this.listLoading = true
					const params = {
							
							userid: this.$store.state.user.userid,
					}
			  setting_info(params).then(response => {
				     _g.closeGlobalLoading()
					 this.version_info = response.version_info
					 this.setting_info = response.setting_info
					 console.log(this.version_info )
					 console.log(this.setting_info )
					 if(this.setting_info){
						 this.form.voicetype  = parseInt(this.setting_info.voicetype)
						 this.form.autoplay_time  = parseInt(this.setting_info.autoplay_time)
						 this.form.autoplay_repeat  = parseInt(this.setting_info.autoplay_repeat)
						 this.form.shiyi_isshow  = this.setting_info.shiyi_isshow
						 
						 setVoicetype(parseInt(this.setting_info.voicetype))
						 setAutoplay_time(parseInt(this.setting_info.autoplay_time))
						 setAutoplay_repeat(parseInt(this.setting_info.autoplay_repeat))
						 setshiyi_isshow(this.setting_info.shiyi_isshow)
					 }
					
					 
					 this.v = true
			  })
			    // this.listLoading = false
			},
		}
	}
</script>
