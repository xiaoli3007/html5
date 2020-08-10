<template>
	<div class="app-container">


		<el-form ref="form" :model="form" label-width="200px">


			<!-- <el-form-item label="软件版本" v-if="v" >

				<el-button>当前版本：{{version}} &nbsp; 
				
				<span v-if="version_info.version == version" >(已经是最新版本)</span>
				</el-button>
				
				<el-button v-if="version_info.version !== version"  @click="go(version_info.url)" class="c-hand">最新版本： {{version_info.version}}&nbsp;下载更新</el-button>

			</el-form-item> -->

  
			<!--<el-form-item label="调试窗口">
				<el-button type="primary" @click="openDev">打开 / 关闭 调试窗口</el-button>
				 <el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button> 
			</el-form-item>-->
			<!-- <el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
				<el-table >
					<el-table-column property="date" label="日期" width="150"></el-table-column>
					<el-table-column property="name" label="姓名" width="200"></el-table-column>
					<el-table-column property="address" label="地址"></el-table-column>
				</el-table>
			</el-drawer> -->

			 <el-form-item label="站点">
				<el-radio-group v-model="form.siteid">
					<!-- <template   ></template> -->
					<el-radio  v-for="(item, index) in siteidlist" :label="item.siteid" border>{{item.name}}</el-radio>
					
				</el-radio-group>
			</el-form-item> 
			<!-- <el-form-item label="听写间隔时间(秒)">
				<el-slider v-model="form.autoplay_time" :min="3" :max="20" show-input></el-slider>
			</el-form-item>

			<el-form-item label="自动听写重复播报次数">
				<el-slider v-model="form.autoplay_repeat" :min="1" :max="5" show-input></el-slider>
			</el-form-item> -->
			
			<!-- <el-form-item label="识字多音释义框默认是否显示">
				<el-switch
				    v-model="form.shiyi_isshow"
				    active-color="#13ce66"
				    inactive-color="#ff4949"
				    active-value="1"
				    inactive-value="2">
				  </el-switch>
			</el-form-item> -->

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
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		setting,setting_info
	} from '@/api/help'
	
	export default {
		data() {
			return {
				version_info:null,
				setting_info:null,
				table: false,
				v: true,
				version:CURRENT_VERSION,
				form: {
					// siteid: getsiteid() ? parseInt(getsiteid()) : 1,
					siteid: getsiteid() ? getsiteid() : "1",
				},
				siteidlist:[],
			}
		},
		created() {
			this.fetchData()
			 console.log(this.form);
				
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
				setsiteid(this.form.siteid)
				 _g.toastMsg('success', '保存成功！', this)
				// setting(this.$store.state.user.userid, this.form.siteid).then(
				// 	response => {
				// 		loading.close();
				// 		console.log(response)
				// 		_g.toastMsg('success', '保存成功！', this)
				// 	})
				 loading.close();


			},
			fetchData() {
			    _g.openGlobalLoading()
				
					const params = {
						userid: this.$store.state.user.userid,
					}
			  setting_info(params).then(response => {
				     _g.closeGlobalLoading()
					 // this.version_info = response.version_info
					 this.siteidlist = response.siteidlist
					 // console.log(this.version_info )
					 console.log(this.siteidlist )
					 // if(this.siteidlist){
						//  this.form.siteid  = parseInt(this.setting_info.siteid)
						//  setsiteid(parseInt(this.setting_info.siteid))
					 // }
					 this.v = true
			  })
			    // this.listLoading = false
			},
		}
	}
</script>
