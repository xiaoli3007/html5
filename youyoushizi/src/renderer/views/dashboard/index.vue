<template>
<div>
	<el-row :gutter="20">
		<el-col :span="12">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>进行中的任务</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 11" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>初次完成的任务</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 11" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
		</el-col>

	</el-row>

	<el-row :gutter="20">
		<el-col :span="12">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>已经完成任务</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 11" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
		</el-col>
		<el-col :span="12">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>建议复习的任务</span>
					<el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
				</div>
				<div v-for="o in 11" :key="o" class="text item">
					{{'列表内容 ' + o }}
				</div>
			</el-card>
		</el-col>

	</el-row>
</div>

</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'dashboard',
		computed: {
			...mapGetters([
				'name',
				'roles'
			])
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard {
		&-container {
			margin: 30px;
		}

		&-text {
			font-size: 30px;
			line-height: 46px;
		}
	}
	
	 .el-row {
    margin-top: 20px;
		padding: 0 15px;
  }
</style>
