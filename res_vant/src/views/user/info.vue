<template>
	<div class="list">

		<van-nav-bar title="我的资料" left-text="返回" left-arrow @click-left="onClickLeft" />

		<van-form validate-first @failed="onFailed" @submit="onSubmit">

		
			
			<template  v-for="(muneItem,indexs) in form_base" >
			<van-field v-if="muneItem.formtype=='text'" :label="muneItem.name" v-model="member_info[muneItem.field]" name="validator" placeholder="请输入" :key="indexs" />
			
			<van-field name="radio"  v-if="muneItem.formtype=='radio'" :label="muneItem.name" :key="indexs">
				<template #input>
					<van-radio-group v-model="member_info[muneItem.field]" direction="horizontal">
						<van-radio :name="item.value"  v-for="(item, sindex) in muneItem.dataarray" :key="sindex">{{item.name}}</van-radio>
						 
					</van-radio-group>
				</template>
			</van-field>
			
			
			</template>

			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>

	</div>



</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		Toast
	} from 'vant';
	import {
		get_member_model_field,
		edit_member_modelinfo
	} from '@/api/user'

	export default {
		data() {
			return {
				siteid: 1,
				value2: '',
				radio: '1',
				member_info: {},
				form_base: [],
			};
		},
		computed: {
			...mapGetters([
				'userid'
			])
		},
		created() {
			console.log(this.userid)
			console.log(this.$store.state.user.userid);
			this.init()
		},
		methods: {

			// 校验函数返回 true 表示校验通过，false 表示不通过
			validator(val) {
				return /1\d{10}/.test(val);
			},
			// 异步校验函数返回 Promise
			asyncValidator(val) {
				return new Promise((resolve) => {
					Toast.loading('验证中...');

					setTimeout(() => {
						Toast.clear();
						resolve(/\d{6}/.test(val));
					}, 1000);
				});
			},
			onFailed(errorInfo) {
				console.log('failed', errorInfo);
			},

			onSubmit(values) {
				console.log('submit', values);

				let resparams = JSON.stringify(this.member_info)
				console.log(resparams)
				 // return
				const params = {
					resparams: resparams,
					userid: this.$store.state.user.userid
				}
				// console.log(this.form.content)

				edit_member_modelinfo(params).then(response => {
					console.log(response)

					if (response.code == 20000) {

						Toast('OK');
						// this.$router.replace({
						// 	name: 'My',
						// 	query: {

						// 	}
						// })
					} else {
						Toast('失败');
					}
				})


			},
			init() {

				const getparams = {
					loading: false,
					params: {

						userid: this.$store.state.user.userid,
					}
				}

				get_member_model_field(getparams).then(response => {
					// this.data = response.items
					// this.taskin = true
					console.log(response)
					var self = this
					if (response.code == 20000) {

						this.member_info = response.items['member_info']
						this.form_base = response.items['form_base']

					}

				})


			},
			onClickLeft() {
				this.$router.replace({
					name: 'My',
				})

			},

		},
	};
</script>

<style scoped lang="less">

</style>
