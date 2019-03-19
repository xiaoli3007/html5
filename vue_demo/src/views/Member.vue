<template>

	<el-row>
		<el-col :span="6">
			<membermenu></membermenu>
		</el-col>
		<el-col :span="18">
			 <el-row>
				  <el-col :span="24">
				 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
				 </el-col>
				 
				 <el-col :span="24">
			<router-view></router-view>
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
				'roles'
			])
		},
		components: {
			Membermenu
		},
		methods: {

		}
	}
</script>
