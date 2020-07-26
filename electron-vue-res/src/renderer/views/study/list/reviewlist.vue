<template>
  <div class="app-container">
		
		
<el-form ref="form" :model="form" label-width="150px">
  
 
  <el-form-item label="复习分类">
		
	<el-radio v-model="form.type" label="1" border size="medium">识字</el-radio>
    <!-- <el-radio v-model="form.radio2" label="2" border size="medium">成语</el-radio> -->

 </el-form-item>
 
  

 
 
  <el-form-item label="抽取数目">
     <el-slider v-model="form.nums" :min="10" :max="50" show-input></el-slider>
  </el-form-item>
	
  <el-form-item>
    <el-button type="primary" @click="onSubmit">开始复习</el-button>
    <!-- <el-button>取消</el-button> -->
  </el-form-item>
</el-form>

  </div>
</template>

<script>
 
 
		import _g from '@/utils/global.js'	
		
  export default {
    data() {
      return {
        form: {
					type:'1',
          nums: 20
        }
      }
    },
		created() {
		 
			
		},
    methods: {
			  
      onSubmit() {
				
				this.$router.replace({
					name: 'Review',
					query: {
						type: this.form.type,
						nums: this.form.nums,
					}
				})
				
				// const loading = this.$loading({
				// 										  lock: true,
				// 										  text: '提交中， 请稍等...',
				// 										  spinner: 'el-icon-loading',
				// 										  background: 'rgba(0, 0, 0, 0.7)'
				// 										});
				// 										
    //     // console.log(this.form);
			 // 
				// loading.close();
				// _g.toastMsg('success', '成功！',this)
				
      }
    }
  }
</script>