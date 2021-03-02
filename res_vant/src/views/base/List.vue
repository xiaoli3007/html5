<template>
  <div class="list">
	  
	  	<Footer id="foot"></Footer>
		
	<van-sticky>
  <form action="/">
    <van-search
      v-model="keywords"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
  
  <van-dropdown-menu>
    <van-dropdown-item v-model="catid" @change="catchange" :options="catidlist" />
    <van-dropdown-item v-model="slistorder" @change="orderchange" :options="paixu_option2" />
  </van-dropdown-menu>
  </van-sticky>
   <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
     <van-list
       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
     >
       <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
	   
	    <van-grid :column-num="2">
	   	 <van-grid-item @click="gotoShow(item2.program.catid,item2.program.id)" v-for="(item2, index2) in list" :key="index2" >
	   	    <van-image :src="item2.thumb_url" />
	   		<p>{{item2.program.title}}</p>
	   	  </van-grid-item>
	   </van-grid> 
	   
     </van-list>
   </van-pull-refresh>
	
	
  
  </div>
  

  
</template>

<script>
	
	import {get_catlist_data ,model_data_list } from '@/api/base'
	
	import { Toast } from 'vant';
export default {
  data() {
    return {
      keywords: '',
	        slistorder: '',
	        catidlist: [
	         
	        ],
	        paixu_option2: [
	          { text: '默认排序', value: '' },
	          { text: '发布时间', value: 'inputtime' },
	          { text: '浏览量', value: 'view_num' },
			  { text: '点播量', value: 'frequency' },
			  { text: '收藏量', value: 'collect_num' },
	        ],
			
	  page: 1,
	  pagesize: 8,
	  linkageid: 0,
	  siteid:1,
	  catid: 0,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
	console.log(this.$store.state.app.yuzhong)
	this.keywords = this.$route.query.keywords
	
  	const params = {
  		// siteid: this.siteid,
  	}
  
  	get_catlist_data(params).then(response => {
  		  // this.catidlist = response.vant_cat_list
		  
		   this.catidlist = [{ text: '全部', value: 0 }].concat(response.vant_cat_list)
  		 console.log(this.catidlist);
  	})
  
  },
  methods: {
	  
	  gotoShow(catid, id) {
	  	this.$router.replace({
	  		name: 'Show',
	  		query: {
	  			catid: catid,
	  			news_id: id
	  		}
	  	})
	  },
    onLoad() {
		// this.fetchData()
      // setTimeout(() => {}, 1000);
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
		
		const getparams = {
				 loading: false,
			    params: {
				catid: this.catid,
				slistorder: this.slistorder,
			      siteid: this.siteid,
				  page: this.page,
				  pagesize: this.pagesize,
				  keywords: this.keywords,
			    }
			  }
			  var self = this 
		model_data_list(getparams).then(response => {
				// this.slideimages = response[0].slideimages
				// this.home_cat_list = response[1].category
				if(response.code == 20000){
					 
					 response.items.forEach(function (value, i) {
						self.list.push(value)
					})
					console.log(self.list)
					
					self.loading = false;
					 if(response.items.length<self.pagesize){
						  self.finished = true;
					 }else{
						 self.page+=1
					 }
				}else{
					 self.finished = true;
				}
		 }) 
        
        
        
      
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
	  this.page = 1;
      this.onLoad();
    },
	onSearch(val) {
		
		this.keywords = val
		this.refreshing = true
		this.onRefresh()
		// Toast(val);
    },
	orderchange(val) {
		// this.slistorder = val
		 this.refreshing = true
		 this.onRefresh()
		 
		  // Toast(this.slistorder);
	},catchange(val) {
		 this.refreshing = true
		 this.onRefresh()
		 
		   // Toast(this.catid);
	},
	onCancel() {
		// this.keywords = val
      // Toast('取消');
	},
	
  },
};
</script>

<style scoped lang="less">
 
</style>
