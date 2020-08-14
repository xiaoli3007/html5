<template>
  <div class="list">
  <van-nav-bar
    :title="$route.meta.title"
    left-text=""
    right-text=""
  />	
  
   <app-main></app-main>
	<van-tabbar :placeholder="true" v-model="active" @change="onChange" route>
    <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item name="list" icon="search" to="/list">列表页</van-tabbar-item>
    <van-tabbar-item name="my" icon="friends-o" to="/my">我的</van-tabbar-item>
    <!-- <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item> -->
  </van-tabbar>
  
  </div>
  

  
</template>

<script>
 import { Notify } from 'vant';
 import AppMain from '../components/AppMain.vue'
export default {
	name: 'layout',
	components: {
     AppMain
	},
  data () {
    return {
      active: 'home',
    }
  },
   methods: {
    onChange(index) {
      // Notify({ type: 'primary', message: index });
    },
    },
}
</script>

<style scoped lang="less">

</style>
