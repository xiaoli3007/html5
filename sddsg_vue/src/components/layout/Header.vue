<template>
	<!-- 头部 -->
	<div id="header" class="header">
	    <div class="fix wp">
	        <!-- <div class="logo"><a href="#"></div> -->
	        <span class="menuBtn"></span>
	        <div class="nav">
	            <div class="cont">
	                <ul class="clearfix">
	                    <li class="on" v-for="(item,index) in navList" :key="index" @click="touchToNav(index)">
	                        <a class="v1"><i><img src="../../assets/images/icon_nav.png" alt=""></i> {{item}}</a>
	                    </li>
	                </ul>
	            </div>
	        </div>
	        <div class="hd-r">
	            <div class="sobox">
	                <a href="">用户登录</a>
					<span>|</span>
					<a href="">使用帮助</a>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- 头部 -->
</template>

<script>
	export default{
		name: 'v-header',
		props:{
			
		},
		data(){
			return{
				showInfo:false,
				navList:["网站首页","教材导航","经典展示","本库动态","使用排行","关于本库"]
			}
		},
		created:function(){

		},
		methods:{
			touchToNav:function(index){
				if(index == 0){
					this.$router.push("/");
				} else if (index == 1) {
					this.$router.push("/navigationView");
				} else if (index == 2) {
					this.$router.push("/classic");
				} else if (index == 3) {
					this.$router.push("/dynamic");
				} else if (index == 4) {
					this.$router.push("/ranking");
				} else if (index == 5) {
					this.$router.push("/about");
				}
				window.scrollTo(0,0)
				this.$emit("touchToNav",index)
			},
			
		}
	}
</script>

<style>
</style>
