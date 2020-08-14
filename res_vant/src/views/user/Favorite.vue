<template>
  <div class="list">
	
	<van-nav-bar
	  title="我的收藏"
	  left-text="返回"
	   left-arrow
	   @click-left="onClickLeft"
	/>	
	
		 <div style="margin-top: 100px;"></div>
	  
	  <van-row>
	    <van-col span="22" offset="1">
	  	   
	 111111111111111
	  </van-col>
	    
	  </van-row>
	  
	

	
  
  </div>
  

  
</template>

<script>
	
	import { Toast } from 'vant';
	import {login} from '@/api/login'
	
export default {
   data() {
      return {
        username: '',
        password: '',
      };
    },
	
	created() {
	
		 
		 //console.log(this.ebookid);
		 
		
	},
    methods: {
	 onClickLeft() {
		  this.$router.replace({
		  	name: 'My',
		  	// query: {
		  	// 	catid: catid,
		  	// 	news_id: id
		  	// }
		  })
		  
		},
       
    },
};
</script>

<style scoped lang="less">
 
</style>
