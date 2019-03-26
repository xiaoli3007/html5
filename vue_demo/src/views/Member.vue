<template>

	<el-row>
		<el-col :span="6">
			<membermenu></membermenu>
		</el-col>
		<el-col :span="17" :offset="1">
			<el-row>
				<el-col :span="24">
					<el-breadcrumb separator-class="el-icon-arrow-right" >
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>活动管理</el-breadcrumb-item>
						<el-breadcrumb-item>活动列表{{globalLoading}}</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row>
			<el-row style="margin-top: 15px;">
				<el-col :span="24">
					
					<router-view v-loading="showLoading"></router-view>
				</el-col>
			</el-row>
		</el-col>
	</el-row>


</template>
<script>
	import Membermenu from '@/components/Membermenu.vue'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				tableData3: '11',
				postFontSize: 2
			}
		},
		computed: {
			...mapGetters([
				'name',
				'roles',
				'globalLoading',
			]),
			showLoading() {
				return this.$store.state.globalLoading
			}
		},
		components: {
			Membermenu
		},
		methods: {

		}
	}
</script>
