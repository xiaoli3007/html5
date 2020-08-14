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
	import { mapGetters } from 'vuex'
	import { Toast } from 'vant';
	import {my_favorite_list} from '@/api/user'
	
export default {
   data() {
      return {
        username: '',
        password: '',
      };
    },
	computed: {
	  ...mapGetters([
		  'userid'
	  ])
	},
	created() {
		 console.log(this.userid)
		console.log(this.$store.state.user.userid);
		 this.init()
	},
    methods: {
		init() {
			this.fetchData()
		},
		fetchData() {
		 	
			const getparams = {
					 loading: false,
				    params: {
					userid: this.$store.state.user.userid,
				    }
				  }
				  
			my_favorite_list(getparams).then(response => {
				// this.data = response.items
				// this.program = response.program_info
				// this.taskin = true
			})
			
				
		}, 
	 onClickLeft() {
		  this.$router.replace({
		  	name: 'My',
		  })
		  
		},
       
    },
};
</script>

<style scoped lang="less">
 
</style>
