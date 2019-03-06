<template>
	<el-container>
		<el-header>
			<Nav></Nav>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
		<el-footer>底部</el-footer>
	</el-container>
</template>

<script>
	// @ is an alias to /src
	import logo from '../assets/logo.png'
	import Nav from '@/components/Nav.vue'

	export default {
		data() {
			return {
				logo
			}
		},
		name: 'home',
		components: {
			Nav
		}
	}
</script>
