<template>
  <div class="list">

  <form action="/">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" class="indeximage" />
    </van-swipe-item>
  </van-swipe>
    
	<van-grid :column-num="3">
     <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
	</van-grid>
	
	
  
  </div>
  

  
</template>

<script>
	
	import { Toast } from 'vant';
	
export default {
	
  data () {
    return {
 value: '',
 active: 'home',
  images: [
         'https://img.yzcdn.cn/vant/apple-1.jpg',
         'https://img.yzcdn.cn/vant/apple-2.jpg',
       ],
    
    }
  },
   methods: {
      
  onSearch(val) {
        Toast(val);
   },
  onCancel() {
        Toast('取消');
  },
    },
}
</script>

<style scoped lang="less">
.list {
  height: 100%;
  width: 100%;

}
.indeximage  {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 240px;
    padding: 30px 60px;
    background-color: #fff;
    pointer-events: none;
}
</style>
