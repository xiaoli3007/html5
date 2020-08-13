<template>
  <div>
  <div style="margin-top: 20px;"></div>
	<van-row>
	  
	  <van-col span="8" offset="8"><van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" round/></van-col>
	  
	  </van-row>
	  <van-row>
	  <van-col span="24" ><van-button size="large" type="info" to="login" >登录</van-button></van-col>
	  
	</van-row>
 
  <div style="margin-top: 20px;"></div>
  
	<van-cell-group>
	  <van-cell title="我的收藏" value=""  icon="location-o" />
	  <van-cell title="我的点播" value=""  icon="location-o"  />
	</van-cell-group>
	
  
  </div>
  

  
</template>

<script>
	
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
  methods: {
    onLoad() {
     
    },
    
  },
};
</script>

<style scoped lang="less">
 
</style>
