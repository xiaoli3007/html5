<template>
  <div>
	
	  
	  <van-divider>节目单</van-divider>
	  <div v-for="(item2, index2) in meidia_list" :key="index2">
	  <van-row >
		  
		  <van-col span="24">
		  <h3>	{{item2.title}} </h3>
		  </van-col>
		   
	  </van-row>
	  
	  <van-row>
	  <van-col span="16">
	    	<p>格式：{{item2.fileext}}</p>
	    </van-col>
	    
	  <van-col span="8">
	  	<van-button plain hairline type="info"    @click="changesrc(index2)">查看</van-button>  </van-col>
		</van-row>
		<van-divider />
		
		</div>
		
		
  </div>
</template>
<script>
export default {
	name: 'my-three',
  data() {
    return {
      // isStart: false,
      meidia_index: 0,
     
	  
    }
  },
  watch: {
   
  },
  props: {
    meidia_list: {
      type: Array,
    },
    autoStart: {
      type: Boolean,
      default: false,
    },
    // defaultVal: {
    //   type: Number,
    //   default: 0,
    // }
  },
  mounted() {
		// 
		console.log(this.meidia_list)
		// if (this.meidia_list.length > 0){
		
		// }
		
  },
  computed: {
     
  },
  created: function() {
    console.log('created')
  },
  components: {},
  methods: {
    changesrc(index) {
				 
		// let p = this.meidia_list[index].playurl	
		this.$router.replace({
			name: 'Threed',
			query: {
				catid: this.meidia_list[index].catid,
				news_id: this.meidia_list[index].news_id,
				media_id: this.meidia_list[index].id,
				// playurl: p,
			}
		})
		
   //  	if (this.meidia_list.length > 0 && this.meidia_list[index].playurl != '') {
    
   //  		 this.meidia_list[index].playurl;
   //  		this.meidia_index = index
			
   //  	}
		
    },
    
  }
}
</script>
<style>

</style>