<template>
  <div class="app-container">
	  
	  <el-row>
	    <el-col :span="12">
			
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>欢迎您！</span>
			    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			  </div>
			  <div class="text item">
			   用户名：{{name}}
			  </div>
					<div class="text item">
					 姓名：{{name}}
					</div>
					<div class="text item">
					 上次登录IP：{{name}}
					</div>
					<div class="text item">
					 上次登录时间：{{name}}
					</div>
			</el-card>
		</el-col>
	    <el-col :span="12">
			
			<el-calendar v-model="value">
			</el-calendar>
		</el-col>
	  </el-row>
	  
	
	  

  
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
export default {
  watch: {
    
  },
	computed: {
	  ...mapGetters([
	    'sidebar',
	    'avatar',
		'name'
	  ])
	},
  methods: {
    
  },

  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>

