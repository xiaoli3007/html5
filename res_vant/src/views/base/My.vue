<template>
  <div>
  <div style="margin-top: 20px;"></div>
	<van-row>
	  
	  <van-col span="8" offset="8">
		<!--  <van-image  v-if="!avatar" width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" round/> -->
		  
		  <van-icon size="150" v-if="!avatar" name="user-o" />
		  
		   <van-image  v-if="avatar" width="100" height="100" :src="avatar" round/>
		   
		  </van-col>
	  
	  </van-row>
	  
	  <van-row>
	  <van-col span="24" >
		  
		 
		<van-button v-if="!username" size="large" type="info" to="login" >登录</van-button>
		<p v-if="username">您好！ {{username}}</p>
		
	</van-col>
	  
	</van-row>
 
  <div style="margin-top: 20px;"></div>
  
	<van-cell-group>
		 <van-cell title="我的资料" value="" to="/user/info" icon="star-o" />
	  <van-cell title="我的收藏" value="" to="/user/favorite" icon="star-o" />
	   <van-cell title="我的浏览" value="" to="/user/look" icon="orders-o"  /> 
	   <van-cell title="我的点播" value="" to="/user/frequency" icon="play-circle-o"  /> 
	 
	   
	</van-cell-group>
	 <div style="margin-top: 20px;"></div>
	<van-button v-if="username" @click="logout" type="warning" block>退出</van-button>
	
  
  </div>
  

  
</template>

<script>
	import { mapGetters } from 'vuex'
	import { Toast } from 'vant';
export default {
  data() {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  computed: {
    ...mapGetters([
      'avatar',
  	  'username'
    ])
  },
  created() {
  
  	 
  	  console.log(this.username);
  	 
  	
  },
  methods: {
    onLoad() {
     
    },
	
	logout() {
	  this.$store.dispatch('LogOut').then(() => {
	     // location.reload() // 为了重新实例化vue-router对象 避免bug
		
		//this.$router.push({ path: '/my' })
	  })
	}
    
  },
};
</script>

<style scoped lang="less">
 
</style>
