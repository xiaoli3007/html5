<template>
	<div class="homeConte">
		<Header :navIndex="3"></Header>
		<div class="banner">
			<!-- Swiper -->
			  <div class="swiper-container banner_swiper">
				<div class="swiper-wrapper">
				  <div class="swiper-slide" style="background-image:url(../../assets/banner.png)">
					  <img src="../../assets/banner.png" alt="">
					  <div class="swiperConte">
						  <div class="title_cvs">
							  <div class="tt">艺术特藏</div>
						  </div>
						  <div class="swiper_tv swiper_tv2">
							<span>      南科大数字 特藏收藏了数字化的艺术品，如名人字画，青铜器，雕塑等。其中多是由作者赠送给我馆和我校的艺术作品，包括为图书馆书写的牌匾、题字等。</span>
						  </div>
					  </div>
				  </div>
				  <div class="swiper-slide" style="background-image:url(../../assets/banner_1-2.png)">
					  <img src="../../assets/banner_1-2.png" alt="">
					  <div class="swiperConte">
						<div class="title_cvs">
							  <div class="tt">艺术特藏</div>
						</div>
						<div class="swiper_tv swiper_tv2">
							<span>      南科大数字 特藏收藏了数字化的艺术品，如名人字画，青铜器，雕塑等。其中多是由作者赠送给我馆和我校的艺术作品，包括为图书馆书写的牌匾、题字等。</span>
						</div>
					  </div>
				  </div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination swiper-pagination-white" id="swiper-spit"></div>
			  </div>
		</div>
		<div class="homeConte">
			<div class="home_cv">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								绘画集锦
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Calligraphy</span>
							<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div>
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex home_row">
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="home_cv home_cv2">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								书法荟萃
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Regular</span>
							<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div>
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex ystc_row">
						<div class="col_3" v-for="(item,index) in 6">
							<div class="col_cv">
								<img class="img" src="../../assets/ystc_1.png" alt="">
								<div class="title">今俗语窑器谓之磁器者，盖磁州窑最多，故相延名之</div>
								<div class="low_cv">
									<img src="../../assets/ystc_pay.png" alt="">
									<a href="">点击查看</a>
									<img src="../../assets/ystc_add.png" alt="">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="home_cv">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								青铜器
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Calligraphy</span>
							<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div>
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex home_row">
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/szkg_1.png" alt="">
								<div class="title">乾隆款古铜彩描金圆盒</div>
								<div class="time">2021-02-02  14:34:23</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="home_cv home_cv2">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								雕塑作品
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Calligraphy</span>
							<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div>
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex nkkw_row">
						<div class="col_4">
							<div class="nkkw_col">
								<img src="../../assets/nkkw_1.png" alt="">
								<div class="title">2020年研究数据内刊（一）</div>
								<div class="time">2021-02-02  14:34:23</div>
							</div>
						</div>
						<div class="col_4">
							<div class="nkkw_col">
								<img src="../../assets/nkkw_2.png" alt="">
								<div class="title">2020年研究数据内刊（一）</div>
								<div class="time">2021-02-02  14:34:23</div>
							</div>
						</div>
						<div class="col_4">
							<div class="nkkw_col">
								<img src="../../assets/nkkw_3.png" alt="">
								<div class="title">2020年研究数据内刊（一）</div>
								<div class="time">2021-02-02  14:34:23</div>
							</div>
						</div>
						<div class="col_4">
							<div class="nkkw_col">
								<img src="../../assets/nkkw_4.png" alt="">
								<div class="title">2020年研究数据内刊（一）</div>
								<div class="time">2021-02-02  14:34:23</div>
							</div>
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
				timeIndex:0
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
