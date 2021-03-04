<template>
	<div class="homeConte">
		<Header :navIndex="1"></Header>
		<div class="conte_dv detail_dv_cv">
			<div class="container">
				<div class="clearFlex page_nav">
					<a href="">首页</a>
					<span>》</span>
					<a href="">数字考古</a>
					<span>》</span>
					<a href="">下脚山遗址陶器</a>
					<span>》</span>
					<a href="">灰陶盉</a>
				</div>
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
						<div class="clearFlex banner_img">
							<div class="detail_blv" ref="swiper">
								<div class="swiper-container swiper_rv0">
									<div class="swiper-wrapper">
									  <div class="swiper-slide">
											<img src="../../assets/banner_xq.png" alt="">
									  </div>
									  <div class="swiper-slide">
											<img src="../../assets/banner_xq2.png" alt="">
									  </div>
									  <div class="swiper-slide">
											<img src="../../assets/banner_xq.png" alt="">
									  </div>
									  <div class="swiper-slide">
											<img src="../../assets/banner_xq2.png" alt="">
									  </div>
									</div>
								</div>
							</div>
							<div class="detail_brv">
								<div class="banner_de_xq">
									<div class="banner_de_cv">
										<div class="swiper-container swiper_rv">
											<div class="swiper-wrapper">
											  <div class="swiper-slide">
												    <img src="../../assets/banner_xt.png" alt="">
											  </div>
											  <div class="swiper-slide">
												    <img src="../../assets/banner_xt2.png" alt="">
											  </div>
											  <div class="swiper-slide">
													<img src="../../assets/banner_xt.png" alt="">
											  </div>
											  <div class="swiper-slide">
													<img src="../../assets/banner_xt2.png" alt="">
											  </div>
											</div>
																	
										</div>
										<!-- 		Add Pagination Add Arrows -->
										<div class="swiper-pagination swiper_pag" id="swiper-spit"></div>
										<div class="swiper-button-next swiper-btn-next"></div>
										<div class="swiper-button-prev swiper-btn-prev"></div>
									</div>
									
								</div>
								
							</div>
						</div>
						<div class="title_dtv">
							<div class="name"><span>【</span>灰陶盉<span>】</span></div>
							<span class="mc">名称</span>
							<div class="sc_cv" :class="selectSc?'active':''" @click="touchSc">{{selectSc?'已收藏':'未收藏'}}</div>
						</div>
						<div class="clearFlex tt_row mt30">
							<div class="col_6">
								<div class="name">制作者</div>
								<div class="tt">王风兰</div>
							</div>
							<div class="col_6">
								<div class="name">考古文化类型</div>
								<div class="tt">南科大类型屋背岭文化</div>
							</div>
						</div>
						<div class="clearFlex tt_row">
							<div class="col_6">
								<div class="name">年代</div>
								<div class="tt">1887年11月14日</div>
							</div>
							<div class="col_6">
								<div class="name">资源类型</div>
								<div class="tt">3D图像</div>
							</div>
						</div>
						<div class="clearFlex tt_row mt30">
							<div class="col_6">
								<div class="name">发掘地点</div>
								<div class="tt">河南省大河市大江区湾溪村</div>
							</div>
							<div class="col_6">
								<div class="name">格式</div>
								<div class="tt">OBJ</div>
							</div>
						</div>
						<div class="clearFlex tt_row">
							<div class="col_6">
								<div class="name">发掘时间</div>
								<div class="tt">1987年04月03日</div>
							</div>
							<div class="col_6">
								<div class="name">碎片数量</div>
								<div class="tt">21</div>
							</div>
						</div>
						<div class="clearFlex tt_row mt30">
							<div class="col_6">
								<div class="name">3D图像制作者</div>
								<div class="tt">孙水蓝</div>
							</div>
							<div class="col_6">
								<div class="name">权限</div>
								<div class="tt">知识产权</div>
							</div>
						</div>
						<div class="clearFlex tt_row">
							<div class="col_6">
								<div class="name">3D图像制作时间</div>
								<div class="tt">1987年04月03日</div>
							</div>
							<div class="col_6">
								<div class="name">碎片数量</div>
								<div class="tt">2017年09月23日</div>
							</div>
						</div>
						<div class="title_dtv">
							<div class="name"><span>【</span>简要描述<span>】</span></div>
						</div>
						<div class="detail_jj">
							<span>灰陶盉，商，高12.3厘米，口径8.2厘米，足距4.8厘米。</span>
							<span>盉（hé音禾）直口微外撇，肩部一侧置管状流，对应一侧为牺首形柄。圜底，下承以三足。肩、腹部分别饰二、四道弦纹。</span>
							<span>此件灰陶盉为商代遗物，其造型规整，胎质较细腻，肩、腹部装饰简单的弦纹。整个器物显得造型古朴，装饰简练。</span>
							<span>盉是古代的盛酒器，或说是古人调和酒、水的器具，在商代的陶器和青铜器中都可见到。盉的基本造型是深腹，圆口，前有流，后有柄。</span>
							<span>灰陶的形成是因为陶器在弱还原气氛中烧造，陶土中的氧化铁不能被充分氧化，因而呈现出氧化亚铁的颜色。灰陶于新石器时代中期已经出现，商代有较大发展，产量很大。</span>
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
				selectSc:false,
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
				heightCss:0
			}
		},
		mounted:function(){
			// 轮播图 · 初始化设定
		   
			
			var swiper2 = new Swiper('.detail_brv .swiper_rv', {
			  spaceBetween: 0,
			  // effect: 'fade',
			  loop: true,
			  autoplay:3000,
			  slidesPerView: 'auto',
			  // bailoopedSlides:8,
			  direction: 'vertical',
			  pagination: '.swiper_pag',
			  paginationClickable: true,
			  watchSlidesVisibility: true, //防止不可点击
			  nextButton: '.swiper-button-next',
			  prevButton: '.swiper-button-prev',
			  slideToClickedSlide: true,
			  onClick:function(swiper){
			  	console.log("点击那个___",swiper.activeIndex)
			  },
			});
			
			var swipers = new Swiper('.detail_blv .swiper_rv0', {
			    spaceBetween: 0,
			    // effect: 'fade',
			    loop:true,
			    slidesPerView: "auto",
			    paginationClickable: true,
			    preventsDefault:false,   //干掉默认阻止的事件
				slideToClickedSlide:true,
				thumbs:{
					swiper:swiper2
				},
				onClick:function(swiper){
			  	console.log("点击那个___",swiper.realIndex)
			  },
			});
				var whdef = 100/1920;
				var wh = window.innerHeight
				var ww = window.innerWidth
				this.sbowWinde(ww,swipers)
			window.onresize = () => {
			    return (() => {
				  let screenWidth = document.body.clientWidth
				  this.sbowWinde(screenWidth,swipers)
			    })()
			}
			
			
			swipers.params.control =  swiper2
			swiper2.params.control =  swipers
		},
		methods:{
			// 判断移动端还是pc端
			// _isMobile方法
			_isMobile(){
			  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
			  return flag;
			},
			sbowWinde:function(ww,swiper){
				let  spaceBetween = 0
				let direction = "vertical"
				let slidesPerView = "auto"
			},
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
			touchSc:function(){
				this.selectSc = !this.selectSc
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
<style>
	.banner_de_cv .swiper_pag .swiper-pagination-bullet {background-color: #fff !important;border: 1px solid #5C687C !important; margin: 5px;}
	.banner_de_cv .swiper_pag  .swiper-pagination-bullet-active {background-color: #2BB7B3 !important; border-color: #2BB7B3 !important;; width: 12px; height: 12px; border-radius: 6px; margin: 5px 3px;}
</style>