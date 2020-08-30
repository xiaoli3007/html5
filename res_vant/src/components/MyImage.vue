<template>
  <div>
	
	  
	  <van-divider>节目单</van-divider>
	   
	  <van-row>
	  <van-col span="24">
		  
	    	 <!-- <img v-for="(item, index2) in meidia_list" :key="index2" v-lazy="item.videourl" /> -->
			 <div v-for="(item, index2) in meidia_list" :key="index2">
			 <van-image
			 @click="changesrc(index2)"
			    fit="contain"
			   lazy-load
			   :src="item.videourl"
			 />
			 </div>
			 
	    </van-col>
	   
		</van-row>
		<van-divider />
		
		
		
		
  </div>
</template>
<script>
	import { ImagePreview } from 'vant';
	
export default {
	name: 'my-image',
  data() {
    return {
      // isStart: false,
      meidia_index: 0,
	   imagelist: [],
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
		 
		let temp = []
		this.meidia_list.forEach(function(value,index){
			 // console.log(value)
			temp.push(value.videourl)
		 });
		this.imagelist = temp
  },
  computed: {
     
  },
  created: function() {
    console.log('created')
  },
  components: {},
  methods: {
    changesrc(index) {
				// console.log(index)
			ImagePreview({
			  images: this.imagelist,
			  closeable: true,
			  startPosition: index,
			});
    },
    
  }
}
</script>
<style>

</style>