<template>
  <div id="app" class="bodyView">
	<v-header @touchToNav="touchToNav"></v-header>
	<router-view></router-view>
	<v-footer></v-footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import vheader from './components/layout/Header.vue';
import vfooter from './components/layout/Footer.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
	"v-header":vheader,
	"v-footer":vfooter,
  },
  data(){
  	return{
		 
  	}
  },
  mounted:function(){
  	
  },
  methods:{
	  touchToNav:function(index){
		// 点击头部
		this.handleScroll()
	  },
	  handleScroll:function(){
		  console.log("1111")
		let top = document.documentElement.scrollTop || document.body.scrollTop;
		// 实现滚动效果 
		const timeTop = setInterval(() => {
			document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
			if (top <= 0) {
			  clearInterval(timeTop);
			}
		}, 300);
	  }
  }
}
</script>
<!-- lang="scss" -->
<style scoped="scoped">
	@import url("assets/font/font.css");
	html , body {
		font-family: "微软繁宋体";
	}
	.bodyView {
		min-height: 100%;
		padding-top: 34px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.container {
		min-height: 600px;
	}
</style>
