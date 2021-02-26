<template>
	<div class="list">
			<!-- <van-button @click="goto3d()" type="primary" size="large">大号按钮</van-button> -->
			
		<form action="/">
			<van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
		</form>
		<van-swipe :autoplay="3000">
			<van-swipe-item v-for="(item, index) in slideimages" :key="index">
				<img v-lazy="item.picurl" class="indeximage" />
			</van-swipe-item>
		</van-swipe>

		<div v-for="(item, index) in home_cat_list" :key="index">
			<h2>{{item.name}}</h2>
			<van-grid :column-num="2">

				<van-grid-item @click="gotoShow(item2.catid,item2.id)" v-for="(item2, index2) in item.result" :key="index2">
					<van-image :src="item2.thumb" />
					<p>{{item2.title}}</p>
				</van-grid-item>


			</van-grid>
		</div>


	</div>



</template>

<script>
	import * as Three from 'three'
	
	import {
		Toast
	} from 'vant';
	import {
		index_home
	} from '@/api/base'
	import {
		template_home
	} from '@/api/template'
	export default {

		data() {
			return {
				value: '',
				active: 'home',
				slideimages: [

				],
				home_cat_list: [

				],
			
			}
		},
		created() {
			this.fetchData()
			 
		},
		 mounted () {
		     
		    },
		methods: {
			goto3d() {
				this.$router.replace({
					name: 'Threed',
					query: {
						 
					}
				})
			},
			
			gotoShow(catid, id) {
				this.$router.replace({
					name: 'Show',
					query: {
						catid: catid,
						news_id: id
					}
				})
			},
			onSearch(val) {

				this.$router.replace({
					name: 'List',
					query: {
						keywords: val,
					}
				})

				// Toast(val);
			},
			onCancel() {
				// Toast('取消');
			},
			fetchData() {
				// this.$loading.show()  

				const getparams = {
					loading: true,
					params: {
						userid: 12345
					}
				}

				index_home(getparams).then(response => {
					console.log(response)

					this.slideimages = response[0].slideimages
					this.home_cat_list = response[1].category
				})
				
				template_home(getparams).then(response => {
					console.log(response)
				})

			},
		},
	}
</script>

<style scoped lang="less">
	.list {
		height: 100%;
		width: 100%;

	}

	.indeximage {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 240px;
		padding: 30px 60px;
		background-color: #fff;
		pointer-events: none;
	}
</style>
