<template>
  <div class="list">
<van-nav-bar
	  title="详细"
	  left-text="返回"
	   left-arrow
	   @click-left="onClickLeft"
	/>	
  
    
	<div  v-if="taskin">
	<h2>{{program.title}}</h2> 
 
 <van-button type="primary">收藏</van-button>
 <van-button type="info">分享</van-button>
 
	</div>
	
  
  </div>
  

  
</template>

<script>
	
	import { Toast } from 'vant';
	import {getshow} from '@/api/base'
export default {
	
  data () {
    return {
		catid: 0,
		news_id: 0,
		program: null,
		data: null,
		taskin: false,
	}
  },
  created() {
  
  	this.catid = this.$route.query.catid
  	this.news_id = this.$route.query.news_id
  	// this.ebookid = 446654
  	// console.log(this.ebookid);
  	this.init()
  	
  },
   methods: {
      onClickLeft() {
      		  this.$router.replace({
      		  	name: 'List',
      		  	// query: {
      		  	// 	catid: catid,
      		  	// 	news_id: id
      		  	// }
      		  })
      		  
      		},
 
 init() {
 	this.fetchData()
 },
 fetchData() {
 	 
	
	const getparams = {
			 loading: false,
		    params: {
			catid: this.catid,
			news_id: this.news_id,
		    }
		  }
		  
 	getshow(getparams).then(response => {
 		// this.data = response.items
 		this.program = response.program_info
 		//this.activetablist = JSON.parse(JSON.stringify(response.datas_tab)); 
 		this.taskin = true
 	})
 	
 		
 }, 

 },
}
</script>

<style scoped lang="less">

</style>
