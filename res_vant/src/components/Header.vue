<template>
	<div class="header">
		<div class="clearFlex container">
		 
			<div class="navView" v-show="showNav" ref="menu">
				<div class="nav" :class="navIndex == index?'active':''" v-for="(item,index) in navList" :key="index">
					<a class="navLine" @click="touchNav(item.path)">{{item.name}}</a>
					<div class="muen_cv" v-if="item.mune.length > 0">
						<div class="item-mune" v-for="(muneItem,muneIndex) in item.mune" :key="muneIndex">
							<a href="##" @click="touchNav(muneItem.path)">{{muneItem.name}}</a>
						</div>
					</div>
				</div>
			</div>

		</div>


	</div>
</template>

<script>
	export default {
		props: {
			navIndex: {
				type: Number,
				default: 0,

			}
		},
		data() {
			return {
				navList: [{
						name: "首页",
						path: '/',
						mune: []
					},
					{
						name: "数字考古",
						path: '/szkg',
						mune: [{
								name: '下脚山遗址陶器',
								path: "/conte"
							},
							{
								name: '赣州通天岩题壁',
								path: ""
							},
							{
								name: '甲骨文',
								path: ""
							}
						]
					},
					{
						name: "读者之窗",
						path: '',
						mune: []
					},
					{
						name: "艺术特藏",
						path: '/ystc',
						mune: [{
								name: '绘画集锦',
								path: "/conte2"
							},
							{
								name: '书法荟萃',
								path: ""
							},
							{
								name: '青铜器',
								path: ""
							},
							{
								name: '青铜器',
								path: "雕塑作品"
							}
						]
					},
					{
						name: "培训视频",
						path: '',
						mune: []
					},
					{
						name: "南科刊物",
						path: '',
						mune: []
					},
					{
						name: "天雨流芳",
						path: '',
						mune: []
					},
				],
				showMune: false,
				creenWidth: document.body.clientWidth,
				showNav: true
			}
		},
		methods: {
			touchMune: function() {
				this.showMune = !this.showMune
				if (this.showMune) {
					this.$refs.menu.style.display = 'block'
				} else {
					this.$refs.menu.style.display = 'none'
				}
				// this.showNav = this.showMune
			},
			touchNav: function(path) {
				this.$router.push(path)
			}
		}
	}
</script>

<style>
	
</style>
