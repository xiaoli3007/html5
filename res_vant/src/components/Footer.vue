<template>
  <div>
    <div class="footer ft">
      <div class="footer_inner" v-html="footerhtml">
      </div>
    </div>
    <!-- 底部占位 -->
    <!-- <div class="footer_margin ft"></div> -->
  </div>
</template>

<script>
	import {
		template_foot
	} from '@/api/template'
	
export default {
  data(){
    return{
	  footerhtml:"",
      footerList: [
        
      ],
	  getUrl:""
    }
  },
  created:function(){
	  this.getUrl = this.$route.path
  	// console.log("显示当前地址___",this.$route.path)
	this.fetchData()
  },
  methods: {
    fetchData() {
		
		const getparams = {
			loading: false,
			params: {
				siteid: 1
			}
		}
		
		template_foot(getparams).then(response => {
			// console.log(response.foot_html)
			this.footerhtml = response.foot_html
			// console.log(this.footerhtml)
			let global_fanyi_json = response.global_fanyi_json
			this.$store.dispatch('showGlobal_fanyi_object',global_fanyi_json).then(() => {
			  //location.reload() // 
			})
			
			
		})
		
	}
  }

}
</script>

<style lang="scss" >

  .footer {
    width: 100%;
    background-color: #001A1C;
    // position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
	padding-top: 32px;
	padding-bottom: 20px;
    .footer_inner {
      width: 100%;
      // height: 50px;
      // display: flex;
      // justify-content: space-around;
      
    }
  }

  .footer_margin {
    // height: 50px;
    box-sizing: content-box;
  }
  .footer_hv {text-align: center; font-size: 16px; color:#fff; width: 100%;}
 .footer_hv a {display: inline-block; padding: 0 12px; color:#fff;}
  .footer_hv2 {text-align: center; font-size: 16px; color:#fff; width: 100%; margin-top: 5px;}
  .footer_hv2 span {display: inline-block; padding: 0 12px; color:#fff;}
  .footer_hv3  {font-size: 16px; color: #fff; text-align: center; margin-top: 20px;}
  .footer_hv3 a {font-size: 21px; color:#fff;}
  @media screen and (max-width:1440px) {
	  .footer  {padding-top: 24px; padding-bottom: 15px;}
	  .footer_hv a {font-size: 12px;}
	  .footer_hv2 {font-size: 12px;}
	  .footer_hv3 {font-size: 12px;margin-top: 15px;}
	  .footer_hv3 a  {font-size: 16px;}
  }
</style>