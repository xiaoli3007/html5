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
			<el-button @click="resetForm('ruleForm2')">重置</el-button>
		</el-form-item>
	</el-form>
</template>
<script>

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
				loadingtext:"请求中。。。"
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.fullscreenLoading = true
						// console.log(this.ruleForm2);
						this.$store.dispatch('Login', this.ruleForm2).then(() => {
							this.fullscreenLoading = false
						  this.$router.replace({ path: 'member/' })
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
