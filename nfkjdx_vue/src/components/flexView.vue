<template>
	<div class="flex_cv">
		<div class="item" @click="toTop"><img src="../assets/xf_up.png" alt=""></div>
		<div class="item" @click="toDown"><img src="../assets/xf_down.png" alt=""></div>
		<div class="item" @click="touchLanguage">
			<img class="yy1" v-if="!language" src="../assets/xf_en.png" alt="">
			<img class="yy2" v-if="language" src="../assets/icon_zw.png" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				language:false
			}
		},
		methods:{
			toTop:function(){
				this.$emit('toTop','')
			},
			toDown:function(){
				this.$emit('toDown','')
			},
			touchLanguage:function(){
				this.language = !this.language
			}
		}
	}
</script>

<style>
	.flex_cv {position: fixed; right: 0; top: 40%; z-index: 999;}
	.flex_cv .item {width: 64px; background-color: #2BB7B3; height: 64px; display: flex; justify-content: center; align-items: center;align-items: center; position: relative;}
	.flex_cv .item img {width: 32px;}
	.flex_cv .item::after {display: block; content: ''; position: absolute; left: 10%; bottom: 0;width: 80%; height: 1px; background-color: #fff;}
	.flex_cv .item:last-child::after {display: none;}
	
	.flex_cv .item:hover {background-color: #439193;}
	
	@media screen and (max-width:767px) {
		.flex_cv .item {width: 50px; height: 50px;}
		.flex_cv .item img {width: 20px;}
	}
</style>
