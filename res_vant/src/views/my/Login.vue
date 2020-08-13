<template>
  <div class="list">
	
	<van-nav-bar
	  title="登录页"
	  left-text="返回"
	   left-arrow
	   @click-left="onClickLeft"
	/>	
	
		 <div style="margin-top: 100px;"></div>
	  
	  <van-row>
	    <van-col span="22" offset="1">
	  	  <van-form @submit="onSubmit">
	  	    <van-field
	  	      v-model="username"
	  	      name="username"
	  	      label="用户名"
	  	      placeholder="用户名"
	  	      :rules="[{ required: true, message: '请填写用户名' }]"
	  	    />
	  	    <van-field
	  	      v-model="password"
	  	      type="password"
	  	      name="password"
	  	      label="密码"
	  	      placeholder="密码"
	  	      :rules="[{ required: true, message: '请填写密码' }]"
	  	    />
	  	    <div style="margin: 16px;">
	  	      <van-button round block type="info" native-type="submit">
	  	        提交
	  	      </van-button>
	  	    </div>
	  	  </van-form>
	 
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
      onSubmit(values) {
        console.log('submit', values);
		
		  
		login(values).then(response => {
		   console.log(response)
		   
		   Toast(response.message);
		 })
		 
      },
    },
};
</script>

<style scoped lang="less">
 
</style>
