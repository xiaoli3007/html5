<template>
	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="index">首页</el-menu-item>
		<el-menu-item index="about">关于我们</el-menu-item>
		<el-menu-item index="member">个人中心</el-menu-item>
		<el-menu-item index="3" disabled>消息中心</el-menu-item>
		<el-menu-item index="login" v-if="!name">
			登录  
		</el-menu-item>
		 <el-menu-item index=""  v-if="name">
			<button v-on:click="logout">{{name}} 退出</button>
		</el-menu-item> 
	</el-menu>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				activeIndex: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				// console.log(key, keyPath);
				// this.$router.push({ path: '/' })
				//if(key!=''){
					this.$router.push({ name: key })
				//}
				
				// this.$router.push(key)
			},
			submit() {
			    // this.USER_SIGNOUT()
				this.$router.replace({ path: '/login' })
			},
			logout() {
			  this.$store.dispatch('LogOut').then(() => {
			    location.reload() // 为了重新实例化vue-router对象 避免bug
			  })
			}
		},
		computed: {
		  ...mapGetters([
		    'name',
		    'roles'
		  ])
		}
	}
</script>
