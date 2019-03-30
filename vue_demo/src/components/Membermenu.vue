<template>
	<div>
		<el-menu :default-active="mactiveIndex" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen"
		 @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

			<el-menu-item index="contentlist">
				<i class="el-icon-location"></i>
				<span slot="title">笔记列表</span>
			</el-menu-item>

			<el-menu-item index="contentadd">
				<i class="el-icon-menu"></i>
				<span slot="title">添加笔记</span>
			</el-menu-item>

		</el-menu>


	</div>

</template>
<script>
	export default {
		// props: ['mactiveIndex'],
		data() {
			return {
				mactiveIndex: ''
			};
		},
		created() {
			// this.activeIndex = this.$route.meta.menu
			this.mactiveIndex = this.$route.name
		},
		watch: {
			'$route'(to, from) {
				this.mactiveIndex = this.$route.name
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				// console.log(key, keyPath);
				this.$router.push({
					name: key
				})
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
