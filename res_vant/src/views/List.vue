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
   <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
     <van-list
       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
     >
       <van-cell v-for="item in list" :key="item" :title="item" />
     </van-list>
   </van-pull-refresh>
	
	
  
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
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 60) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
	onSearch(val) {
		Toast(val);
    },
	onCancel() {
      Toast('取消');
	},
  },
};
</script>

<style scoped lang="less">
 
</style>
