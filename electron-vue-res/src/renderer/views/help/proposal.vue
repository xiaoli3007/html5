<template>
	<div class="app-container">


		<el-tabs v-model="activeName">
			<el-tab-pane label="建议" name="first">

				<el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">

					<el-form-item label="内容" prop="content">
						<el-input type="textarea" v-model="form.content" :rows="10"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>

			</el-tab-pane>
			<el-tab-pane label="求书" name="second">

				<el-form :model="form_qiushu" :rules="rules_qiushu" ref="rules_qiushuForm" label-width="120px">
					<el-form-item label="标题" prop="name">
						<el-input v-model="form_qiushu.name"></el-input>
					</el-form-item>

					<el-form-item label="内容" prop="content">
						<el-input type="textarea" v-model="form_qiushu.content" :rows="10"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm_qiushu('rules_qiushuForm')">提交</el-button>
					</el-form-item>
				</el-form>

			</el-tab-pane>

		</el-tabs>


	</div>
</template>

<script>
	import {
		feedback,askbook
	} from '@/api/help'
	import _g from '@/utils/global.js'

	export default {
		data() {
			return {
				activeName: 'first',
				form: {
					content: ''
				},
				rules: {
					content: [{
							required: true,
							message: '请输入',
							trigger: 'blur'
						},
						{
							min: 10,
							max: 300,
							message: '长度在 10 到 300 个字',
							trigger: 'blur'
						}
					]
				},
				form_qiushu: {
					name:'',
					content: ''
				},
				rules_qiushu: {
					name: [{
							required: true,
							message: '请输入',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在 1 到 100 个字',
							trigger: 'blur'
						}
					],
					content: [{
							required: true,
							message: '请输入',
							trigger: 'blur'
						},
						{
							min: 10,
							max: 300,
							message: '长度在 10 到 300 个字',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {

						const loading = this.$loading({
							lock: true,
							text: '提交中， 请稍等...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});

						// console.log(this.form.content)

						feedback(this.$store.state.user.userid, this.form.content).then(response => {
							// console.log(response)

							loading.close();

							if (response.code == 20000) {
								this.form.content = ''
								_g.toastMsg('success', '提交成功，感谢您的意见！', this)

							}
						})

					} else {
						// alert('提交失败!!');
						console.log('提交失败!!');
						return false;
					}
				});
			},
			
			submitForm_qiushu(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
			
						const loading = this.$loading({
							lock: true,
							text: '提交中， 请稍等...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
			
						// console.log(this.form.content)
			
						askbook(this.$store.state.user.userid, this.form_qiushu).then(response => {
							console.log(response)
			
							loading.close();
			
							if (response.code == 20000) {
								this.form_qiushu.name = ''
								this.form_qiushu.content = ''
								_g.toastMsg('success', '提交成功！', this)
							}
						})
			
					} else {
						// alert('提交失败!!');
						console.log('提交失败!!');
						return false;
					}
				});
			}
			
		}
	}
</script>

<style scoped>
	.line {
		text-align: center;
	}
</style>
