<template>
	<div class="list">

		<van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft" />

		<div style="margin-top: 10px;"></div>

		<van-row>
			<van-col span="22" offset="1">

				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->

					<van-grid :column-num="2">
						<van-grid-item @click="gotoShow(item2.program.catid,item2.program.id)" v-for="(item2, index2) in list" :key="index2">
							<van-image :src="item2.program.thumb_url" />
							<p>{{item2.program.title}}</p>
						</van-grid-item>
					</van-grid>

				</van-list>
			</van-col>

		</van-row>





	</div>



</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		Toast
	} from 'vant';
	import {
		my_favorite_list
	} from '@/api/user'

	export default {
		data() {
			return {

				page: 1,
				pagesize: 8,
				linkageid: 0,
				siteid: 1,
				catid: 0,
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
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
				// this.fetchData()
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
			onLoad() {

				const getparams = {
					loading: false,
					params: {
						page: this.page,
						pagesize: this.pagesize,
						userid: this.$store.state.user.userid,
					}
				}

				my_favorite_list(getparams).then(response => {
					// this.data = response.items
					// this.program = response.program_info
					// this.taskin = true
					var self = this
					if (response.code == 20000) {

						response.items.forEach(function(value, i) {
							self.list.push(value)
						})
						console.log(self.list)

						self.loading = false;
						if (response.items.length < self.pagesize) {
							self.finished = true;
						} else {
							self.page += 1
						}
					} else {
						self.finished = true;
					}

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
