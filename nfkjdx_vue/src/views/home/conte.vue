<template>
	<div class="homeConte">
		<Header :navIndex="1"></Header>
		<div class="banner">
			<!-- Swiper -->
			  <div class="swiper-container banner_swiper">
				<div class="swiper-wrapper">
				  <div class="swiper-slide" style="background-image:url(../../assets/banner.png)">
					  <img src="../../assets/banner.png" alt="">
					  <div class="swiperConte">
						  <div class="title_cvs">
							  <div class="tt">数字考古</div>
						  </div>
						  <div class="swiper_tv swiper_tv2">
							<span>最早已知的陶瓷器是格拉维特文化小雕像，例如在现今捷克下维斯特尼采境内发现的陶器：（下图）维斯特尼采爱神。这是一个爱神维纳斯的小雕像，可以追溯到前29,000年至前25,000年（格拉维特文化），表现为一个裸露女性的形态雕像。</span>
							<span>而最古老陶制容器是中国江西仙人洞文化的陶器罐碎片，于2012年发现的。大约追溯到前20,000年至前19,000年。在之前2004年中国江西仙人洞文化中3B1层就出土的条纹陶，其烧制年代至少在13000年以上。而日本早期绳文人约在前10,500年也制造陶器罐 。</span>
							<span>绳文指的是在黏土容器及塑像上利用绳缠绕棒子所加上的记号。在前10,000年制造的陶器亦在中国出土。有迹象显示北非的陶器在距今10,000年前独立发展出来的，而南美的陶器则是在距今7,000年前。</span>
							<span>广东英德青塘遗址发现距今2万余年、华南考古发现年代最早的穿孔蚌器，而出土的距今1.7万年的陶片。</span>
						  </div>
					  </div>
				  </div>
				  <div class="swiper-slide" style="background-image:url(../../assets/banner_1-2.png)">
					  <img src="../../assets/banner_1-2.png" alt="">
					  <div class="swiperConte">
						<div class="title_cvs">
							  <div class="tt">数字考古</div>
						</div>
						<div class="swiper_tv swiper_tv2">
							<span>      南科大社科中心的考古专家与工学院计算机系的多媒体和人工智能专家合作，对考古发掘出的文物数字化，用于文化遗产的研究。如通过对深圳下角山遗址陶器坑的研究，发现这些陶器坑可能为咸头岭文化第三期（距今约6000年）史前人类的祭祀遗存。数字考古特藏收藏了这些数字化的考古资源，包括3D图像与动画，用于展示和宣传，并长期保存这些宝贵的考古资源。
</span>
						</div>
					  </div>
				  </div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination swiper-pagination-white" id="swiper-spit"></div>
				<!-- Add Arrows -->
			  </div>
		</div>
		<div class="conte_dv conte_dv_ej">
			<div class="container">
				<div class="clearFlex title_nav">
					<div class="title">已选分类：</div>
					<div class="item">古文物 <a>X</a></div>
					<div class="item">下脚山 <a>X</a></div>
					<div class="item">西周文化 <a>X</a></div>
				</div>
				<div class="clearFlex conte_row">
					<div class="conte_lv">
						<div class="item" v-for="(item,index) in navList">
							<div class="nav-item" :class="item.selected?'active':''"  @click="touchNav(index)">
								<span>{{item.name}}</span>
								<img class="icon" src="../../assets/ic_arrow_down_w.png" alt="">
							</div>
							<div class="nav-mune" v-show="item.selected">
								<div class="mune-item" v-for="(muneItem,muneIndex) in item.list" >
									<div class="clearFlex item_ej" :class="muneItem.selected?'active':''" @click="touchNav2(muneIndex)">
										<div class="name">{{muneItem.name}}</div>
										<div class="num_t1">({{muneItem.num}})</div>
									</div>
									<div class="mune_tt" :class="item_t.selected?'active':''" v-for="(item_t,index_l) in muneItem.list" v-if="muneItem.selected" @click="touchNav3(index_l)">{{item_t.name}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="conte_rv">
						<div class="search_cv">
							<div class="inputView">
								<input type="text" placeholder="请输入题名或关键词">
							</div>
							<div class="btn">检索一下</div>
						</div>
						<div class="clearFlex search_jg">
							<div class="name">热词推荐：</div>
							<div class="item">青铜</div>
							<div class="item">历史</div>
						</div>
						<div class="conte_title">
							<div class="title">搜索结果</div>
							<div class="search_end">共检索到<span>200</span>条结果</div>
						</div>
						<div class="cont_cov">
							<div class="clearFlex nav_row">
								<div class="nav_row_lv">
									<div class="name">排序时间：</div>
									<div class="item">按时间</div>
									<div class="item">按浏览量</div>
								</div>
								<div class="nav_row_rv">
									<el-pagination
									  background
									  layout="prev, pager, next"
									  :page-size="10"
									  :pager-count="5"
									  :total="100">
									</el-pagination>
								</div>
							</div>
						</div>
						<div class="listView">
							<div class="item" v-for="(item,index) in 4">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="list_rv">
									<div class="name">古铜彩双耳炉</div>
									<div class="conte_lt">古铜彩双耳炉，清乾隆，高4.9厘米，口径8.9厘米，足径7.3厘米。</div>
									<div class="gjc">关键词： 宜兴窑 金漆 砚堂 砚池 缠枝 灵芝 描金</div>
									<div class="time">2021-02-02  14:34:23</div>
								</div>
							</div>
						</div>
						<div class="clearFlex list_bv">
							<el-pagination
							  background
							  layout="prev, pager, next"
							  :total="100"
							  :page-size="10"
							  :pager-count="5"
							  class="pages">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
		<flexView @toDown="toDown" @toTop="toTop"></flexView>
		<Footer></Footer>
	</div>
</template>

<script>
	import Swiper from "swiper";
	export default{
		name:"homes",
		components:{
			Swiper
		},
		data(){
			return{
				timeIndex:0,
				index1:0,
				index2:0,
				navList:[
					{
						name:"通用对象",
						selected:false,
						list:[
							{
								name:'古文物',
								num:'198',
								selected:false,
								list:[
									{
										name:"·古币（7）",
										selected:false,
									},
									{
										name:"·青铜器（14）",
										selected:false,
									},
									{
										name:"·遗址（4）",
										selected:false,
									},
								]
							}
						]
					},
					{
						name:"历史",
						selected:false,
						list:[
							{
								name:'下脚山',
								num:'18',
								selected:false,
								list:[
									{
										name:"·文字一",
										selected:false,
									},
									{
										name:"·文字二",
										selected:false,
									},
									{
										name:"·文字三",
										selected:false,
									},
									{
										name:"·文字四",
										selected:false,
									},
								]
							},
							{
								name:'西周文化',
								num:'24',
								selected:false,
								list:[
									{
										name:"·文字一",
										selected:false,
									},
									{
										name:"·文字二",
										selected:false,
									},
									{
										name:"·文字三",
										selected:false,
									},
									{
										name:"·文字四",
										selected:false,
									},
								]
							},
							{
								name:'标题内容三',
								num:'126',
								selected:false,
								list:[
									{
										name:"·文字一",
										selected:false,
									},
									{
										name:"·文字二",
										selected:false,
									},
									{
										name:"·文字三",
										selected:false,
									},
									{
										name:"·文字四",
										selected:false,
									},
								]
							},
							{
								name:'标题内容四',
								num:'334',
								selected:false,
								list:[
									{
										name:"·文字一",
										selected:false,
									},
									{
										name:"·文字二",
										selected:false,
									},
									{
										name:"·文字三",
										selected:false,
									},
									{
										name:"·文字四",
										selected:false,
									},
								]
							}
						]
					},
					{
						name:"文物古迹",
						selected:false,
					},
					{
						name:"作者",
						selected:false,
					},
					{
						name:"出版时间",
						selected:false,
					},
					{
						name:"年份",
						selected:false,
					},
					{
						name:"出版商",
						selected:false,
					}
				],
			}
		},
		mounted:function(){
			// 轮播图 · 初始化设定
		   var swiper = new Swiper('.banner_swiper', {
			  spaceBetween: 0,
			  effect: 'fade',
			  pool:true,
			  autoplay:3000,
			  pagination: '.swiper-pagination',
			  paginationClickable: true,
			  nextButton: '.swiper-button-next',
			  prevButton: '.swiper-button-prev',
			});
			    
		},
		methods:{
			touchMore:function(){
				this.$router.push("/addStore")
			},
			touchAddStore:function(){
				let that = this
			},
			touchTime:function(index){
				this.timeIndex = index
			},
			touchNav:function(index){
				this.navList[index].selected = !this.navList[index].selected
				this.index1 = index
			},
			touchNav2:function(index){
				let list = this.navList[this.index1].list
				for(var i=0;i<list.length;i++){
					if(index == i){
						list[i].selected = !list[i].selected
					} else {
						list[i].selected = false
					}
				}
				this.index2 = index
			},
			touchNav3:function(index){
				let list = this.navList[this.index1].list[this.index2].list
				for(var i=0;i<list.length;i++){
					if(index == i){
						list[i].selected = !list[i].selected
					} else {
						list[i].selected = false
					}
				}
			},
			toTop() {
			  
			  let top = document.documentElement.scrollTop || document.body.scrollTop;
			  // 实现滚动效果 
			  const timeTop = setInterval(() => {
				document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
				if (top <= 0) {
				  clearInterval(timeTop);
				}
			  }, 10);
			},
			toDown(){
				
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	@import "home.less";
	@import "../../../node_modules/swiper/dist/css/swiper.css";
</style>
<style lang="scss">
	.el-pagination button {height: 43px;line-height: 43px; font-size: 19px;}
	.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {height: 43px !important;line-height: 43px !important;min-width: 43px !important; font-size: 19px !important; font-weight: normal; border-radius: 8px !important;background-color:transparent !important; border: 1px solid #ddd;}
	.el-pagination.is-background .el-pager li:not(.disabled).active {background-color: #2BB7B3 !important; border-color: #2BB7B3;}
	@media screen and (max-width:767px) {
		.list_bv .pages button {height: 30px;line-height: 30px; font-size: 14px;}
		.list_bv .pages.is-background .btn-next, .list_bv .el-pagination.is-background .btn-prev, .list_bv .el-pagination.is-background .el-pager li {height: 30px !important;line-height: 30px !important;min-width: 30px !important; font-size: 14px !important; font-weight: normal; border-radius: 8px !important;background-color:transparent !important; border: 1px solid #ddd;}
	}
</style>