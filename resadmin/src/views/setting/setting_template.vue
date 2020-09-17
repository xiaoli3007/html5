<template>
	<div class="app-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="基本设置" name="first">基本设置</el-tab-pane>
			<el-tab-pane label="用户设置" name="first2">用户设置</el-tab-pane>
			<el-tab-pane label="邮箱设置" name="email">邮箱设置</el-tab-pane>
			<el-tab-pane label="模板设置" name="template">模板设置</el-tab-pane>
			<el-tab-pane label="播放器设置" name="play">播放器设置</el-tab-pane>
			<el-tab-pane label="评论设置" name="pl">评论设置</el-tab-pane>
			<el-tab-pane label="搜索设置" name="search">搜索设置</el-tab-pane>
			
		</el-tabs>

		<!-- <el-form ref="form" :model="form" label-width="200px">

			
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			
			</el-form-item>
		</el-form> -->

	</div>
</template>

<script>
	import {
		getsiteid,
		setsiteid,
	} from '@/utils/auth'
	import _g from '@/utils/global.js'
	import {
		site_info,site_list
	} from '@/api/setting'

	export default {
		data() {
			return {
				version_info: null,
				setting_info: null,
				table: false,
				v: true,
				 form:{},
				siteidlist: [],
				activeName: 'first'
			}
		},
		created() {
			this.fetchData()
			 

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
_g.closeGlobalLoading()
				const params = {
					userid: this.$store.state.user.userid,
				}
				// setting_info(params).then(response => {
				// 	_g.closeGlobalLoading()
				// 	// this.version_info = response.version_info
				// 	this.siteidlist = response.siteidlist
				// 	// console.log(this.version_info )
				// 	console.log(this.siteidlist)

				// 	this.v = true
				// })
				// this.listLoading = false
			},
		}
	}
</script>
