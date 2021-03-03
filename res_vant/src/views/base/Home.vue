<template>
	<div class="list">
<div class="content"  v-for="(muneItemaa,indexs) in div_list" :key="'afsf'+indexs">
				<div class="title">
					{{muneItemaa.name}}--{{indexs}}
				</div>
			
			</div>
			
		<template  v-for="(muneItem,indexs) in div_list" >
			<div class="content" :key="'ss'+indexs">
				<div class="title">
					{{muneItem.name}}--{{indexs}}
				</div>
				<div class="clearFlex home_row">
					<div class="el-col-6">
						<a href="">
							<div class="title">乾隆款古铜彩描金圆盒</div>
							<div class="time">2021-02-02 14:34:23</div>
						</a>
					</div>
				</div>
			</div>
		</template>
		

		<van-button type="success">{{appGlobalText.text_look}}</van-button>
		<van-button type="success">{{appGlobalText.text_test}}</van-button>

		<van-button @click="goto3d()" type="primary" size="large">转化语种</van-button>
		<van-button @click="goto3d2()" type="primary" size="large">当前语种</van-button>

		<Footer id="foot"></Footer>

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
		template_home,
		template_category
	} from '@/api/template'
	export default {

		data() {
			return {
				value: '',
				appGlobalText: this.en_text(this.$appGlobalText),
				active: 'home',
				slideimages: [

				],
				home_cat_list: [

				],
				div_list: [

				],

			}
		},
		created() {
			this.fetchData()

		},
		mounted() {

			// let yuzhong = this.$store.state.app.yuzhong

			// console.log(this.$store.state.app.global_fanyi_object)
			// if(yuzhong=='en'){

			// 	this.appGlobalText = this.en_text(this.appGlobalText)
			// }
		},
		methods: {
			goto3d2() {

				console.log(this.$store.state.app.yuzhong)
				console.log(this.$store.state.app.global_fanyi_object)

			},
			goto3d() {


				let yuzhong = this.$store.state.app.yuzhong == 'zn' ? 'en' : 'zn'
				console.log(yuzhong)
				this.$store.dispatch('showYuzhong', yuzhong).then(() => {
					location.reload() // 
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
					// console.log(response)

					this.slideimages = response[0].slideimages
					this.home_cat_list = response[1].category
				})

				template_home(getparams).then(response => {
					 console.log(response)
				})

				const getparams2 = {
					loading: false,
					params: {
						catid: 33
					}
				}

				template_category(getparams2).then(response => {

					this.div_list = response.items

					console.log(this.div_list)
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
