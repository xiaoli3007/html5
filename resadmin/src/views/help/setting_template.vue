<template>
	<div class="app-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="基本设置" name="first">基本设置</el-tab-pane>
			<el-tab-pane label="邮箱设置" name="second">邮箱设置</el-tab-pane>
			<el-tab-pane label="模板设置" name="third">模板设置</el-tab-pane>
			<el-tab-pane label="播放器设置" name="fourth">播放器设置</el-tab-pane>
			<el-tab-pane label="评论设置" name="fourth">评论设置</el-tab-pane>
			<el-tab-pane label="搜索设置" name="fourth">搜索设置</el-tab-pane>
			
		</el-tabs>

		<el-form ref="form" :model="form" label-width="200px">

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
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		setting,
		setting_info
	} from '@/api/help'

	export default {
		data() {
			return {
				version_info: null,
				setting_info: null,
				table: false,
				v: true,
				form: {
					// siteid: getsiteid() ? parseInt(getsiteid()) : 1,
					siteid: getsiteid() ? getsiteid() : "1",
				},
				siteidlist: [],
				activeName: 'second'
			}
		},
		created() {
			this.fetchData()
			console.log(this.form);

		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
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
					console.log(this.siteidlist)

					this.v = true
				})
				// this.listLoading = false
			},
		}
	}
</script>
