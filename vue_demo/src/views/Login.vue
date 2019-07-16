<template>
	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

		<el-form-item label="账号" prop="username">
			<el-input v-model="ruleForm2.username"></el-input>
		</el-form-item>

		<el-form-item label="密码" prop="password">
			<el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm2')"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
			<el-button @click="resetForm('ruleForm2')">重置{{aaa}}</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import supermemo2 from 'supermemo2'
	export default {
		data() {
			var checkUsername = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'));
				} else {
					if (value == '') {
						callback(new Error('账号不能为空！'));
					} else {
						callback();
					}
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};

			return {
				ruleForm2: {
					username: '',
					password: '',
				},
				rules2: {
					username: [{
						validator: checkUsername,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				},
				fullscreenLoading: false,
				loadingtext:"请求中。。。",
				aaa:process.env.VUE_APP_BASE_API
			};
		},
		created() {
			// console.log(this.tableData3)
			let quality =4  // 表示审核质量的介于0和5之间的数字。0是最差的，5是最好的。.
			let lastSchedule= 5 // 上次审阅空间的持续时间
			let lastFactor =1 // 用于计算上一个计划的因素。
			let ret = supermemo2(quality, lastSchedule, lastFactor)
			console.log(ret)
			// {
			//     schedule: Number, // 下一个评论空间。
			//     factor: Number, // 在下一轮计算中应该使用的因素。
			//     isRepeatAgain: Boolean // 如果是真的，应重新检查项目，直到质量不低于4。
			// }
			// console.log(process.env.VUE_APP_BASE_API)
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.fullscreenLoading = true
						// console.log(this.ruleForm2);
						this.$store.dispatch('Login', this.ruleForm2).then(() => {
							this.fullscreenLoading = false
						  this.$router.replace({ name: 'contentlist' })
						}).catch(() => {
						  this.fullscreenLoading = false
						})
						// this.$router.push('member')
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
