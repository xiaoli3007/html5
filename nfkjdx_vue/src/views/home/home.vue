<template>
	<div class="homes">
		<Header></Header>
		<div class="banner">
		  <!-- Swiper -->
		  <div class="swiper-container banner_swiper">
			<div class="swiper-wrapper">
			  <div class="swiper-slide" style="background-image:url(../../assets/banner.png)">
				  <img src="../../assets/banner.png" alt="">
				  <div class="swiperConte">
					  <div class="title">图书馆</div>
					  <div class="title2">tú shū guǎn</div>
					  <div class="swiper_tv">
						  <span>图书馆，是搜集、整理、收藏图书资料以供人阅览、参考的机构，早在公元前3000年就出现了图书馆，
						  图书馆有保存人类文化遗产、开发信息资源、参与社会教育等职能。</span>
						  <span>据《在辞典中出现的“图书馆”》说，“图书馆”一词最初在日本的文献中出现是1877年的事；
						  而最早在我国文献中出现，当推《教育世界》第62期中所刊出的一篇《拟设简便图书馆说》，时为1894年。</span>
					  </div>
				  </div>
			  </div>
			  <div class="swiper-slide" style="background-image:url(../../assets/banner_1-2.png)">
				  <img src="../../assets/banner_1-2.png" alt="">
				  <div class="swiperConte">
					  <div class="title">图书馆</div>
					  <div class="title2">tú shū guǎn</div>
					  <div class="swiper_tv">
						  <span>图书馆，是搜集、整理、收藏图书资料以供人阅览、参考的机构，早在公元前3000年就出现了图书馆，
						  图书馆有保存人类文化遗产、开发信息资源、参与社会教育等职能。</span>
						  <span>据《在辞典中出现的“图书馆”》说，“图书馆”一词最初在日本的文献中出现是1877年的事；
						  而最早在我国文献中出现，当推《教育世界》第62期中所刊出的一篇《拟设简便图书馆说》，时为1894年。</span>
					  </div>
				  </div>
			  </div>
			</div>
			<!-- Add Pagination -->
			<div class="swiper-pagination swiper-pagination-white" id="swiper-spit"></div>
			<!-- Add Arrows -->
		<!-- 	<div class="swiper-button-next swiper-button-white"></div>
			<div class="swiper-button-prev swiper-button-white"></div> -->
		  </div>
		</div>
		<div class="homeConte">
			<div class="home_cv">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								数字考古
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Digital Archaeology</span>
						<!-- 	<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div> -->
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex home_row">
						<div class="el-col-6" v-for="(item,index) in 4" @click="touchDetail">
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
								读者之窗
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Readers Voice</span>
						<!-- 	<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div> -->
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex dzzc_conte">
						<div class="img_ldz">
							<img src="../../assets/icon_dz.png" alt="">
						</div>
						<div class="img_rdz">
							<div class="title">读者之窗</div>
							<div class="py">Readers Voice</div>
							<div class="ds_tt">
								<span图书馆举办各类读者活动，推广阅读与服务，促进校园文化建设。</span>
								<span>其中最具特色的三个品牌活动是：</span>
								<span>1.“思库推荐（Scholar Recommend）”，收集本校师生推荐阅读书目，推荐者为每本图书手写推荐语并粘贴于图书扉页；</span>
								<span>2.“人生如书·Living Book”活动，每期征集5位本校学生作为“Living Book”，每本“书”朗读对自己影响深刻的图书片段及分享大学经历等；</span>
								<span>3.“致毕业：我与图书馆的故事”，自本校第一届毕业生开始征集，是历届毕业生留下的图书馆记忆。</span>
							</div>
							<div class="clearFlex num_row">
								<div class="item">
									<div class="num">870709890</div>
									<div class="tt">书籍资源</div>
								</div>
								<div class="item">
									<div class="num">76540032</div>
									<div class="tt">注册用户</div>
								</div>
								<div class="item">
									<div class="num">907098</div>
									<div class="tt">日访问量</div>
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
								艺术特藏
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Readers Voice</span>
							<!-- <div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div> -->
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
			<div class="home_cv home_cv2">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								培训视频
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Trainings Videos</span>
						<!-- 	<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div> -->
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex pxsp_row">
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/pxsp_1.png" alt="">
								<div class="title">2020年网络视听文艺节目审核</div>
								<div class="time">2021-02-02  14:34:23</div>
								<div class="clearFlex px_low">
									<span class="t1">2463</span>
									<span class="t2">2463</span>
								</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/pxsp_2.png" alt="">
								<div class="title">2020年网络视听文艺节目审核</div>
								<div class="time">2021-02-02  14:34:23</div>
								<div class="clearFlex px_low">
									<span class="t1">2463</span>
									<span class="t2">2463</span>
								</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/pxsp_3.png" alt="">
								<div class="title">2020年网络视听文艺节目审核</div>
								<div class="time">2021-02-02  14:34:23</div>
								<div class="clearFlex px_low">
									<span class="t1">2463</span>
									<span class="t2">2463</span>
								</div>
							</a>
						</div>
						<div class="el-col-6">
							<a href="">
								<img src="../../assets/pxsp_4.png" alt="">
								<div class="title">2020年网络视听文艺节目审核</div>
								<div class="time">2021-02-02  14:34:23</div>
								<div class="clearFlex px_low">
									<span class="t1">2463</span>
									<span class="t2">2463</span>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="home_cv home_cv_time">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								南科刊物
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>SUSTech Periodicals</span>
						<!-- 	<div class="title_dvc">
								绘画（painting）在艺术层面上，是一个以表面作为支撑面，再在其之上加上颜色的行为，那些表面的例子有纸张、油画布（canvas）、木材、玻璃、漆器或混凝土等。在艺术用语的层面上，绘画的意义亦包含利用此艺术行为再加上图形（drawing）、构图及其他美学方法去达到表现出从事者希望表达的概念及意思。
							</div> -->
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="time_row">
						<div class="item-time" :class="timeIndex == 0?'active':''" @click="touchTime(0)">
							<div class="time_t1"><span>01月</span></div>
							<div class="time_t2">2021</div>
						</div>
						<div class="item-time" :class="timeIndex == 1?'active':''" @click="touchTime(1)">
							<div class="time_t1"><span>12月</span></div>
							<div class="time_t2">2020</div>
						</div>
						<div class="item-time" :class="timeIndex == 2?'active':''" @click="touchTime(2)">
							<div class="time_t1"><span>11月</span></div>
							<div class="time_t2">2020</div>
						</div>
						<div class="item-time" :class="timeIndex == 3?'active':''" @click="touchTime(3)">
							<div class="time_t1"><span>10月</span></div>
							<div class="time_t2">2020</div>
						</div>
						<div class="item-time" :class="timeIndex == 4?'active':''" @click="touchTime(4)">
							<div class="time_t1"><span>09月</span></div>
							<div class="time_t2">2020</div>
						</div>
						<div class="item-time" :class="timeIndex == 5?'active':''" @click="touchTime(5)">
							<div class="time_t1"><span>08月</span></div>
							<div class="time_t2">2020</div>
						</div>
					</div>
				</div>
			</div>
			<div class="home_cv">
				<div class="container">
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
			<div class="home_cv home_cv2 home_cv3">
				<div class="container">
					<div class="title_hv">
						<div class="title_cv">
							<div class="title">
								<img class="icon1" src="../../assets/title_img1.png" alt="">
								天雨流芳
								<img class="icon2" src="../../assets/title_img2.png" alt="">
							</div>
							<span>Recollection of Library Work</span>
						</div>
						<div class="more_rv">
							查看更多
						</div>
					</div>
					<div class="clearFlex dsgzy_row">
						<div class="col_6">
							<img src="../../assets/dsgzy_1.png" alt="">
						</div>
						<div class="col_6">
							<div class="dsgzy_rv">
								<div class="title">天雨流芳</div>
								<div class="py">tú shū guǎn</div>
								<div class="ds_tt">
									<span>天雨流芳收藏了图书馆和图书馆员们创作的各种类型的作品，
									包括图书、微信推文、读者手册等，也收藏了展现图书馆空间的图片，
									记载了图书馆馆舍的变迁。</span>
									<span>馆歌“天雨流芳”和由国家图书馆出版的图书“天雨流芳-南方科技大学图书馆十年”是其中两个比较具有特色的资源，</span>
									<span>反应了我馆的办馆理念和实践，“脱俗谛，求真理，涵泳兴味长；
									开智识，传薪火，天雨永流芳”。</span>
								</div>
							</div>
						</div>
					</div>
					<div class="clearFlex dsgzy_row2">
						<div class="col_4">
							<a href=""><img src="../../assets/dsgzy_2.png" alt=""></a>
						</div>
						<div class="col_4">
							<a href=""><img src="../../assets/dsgzy_3.png" alt=""></a>
						</div>
						<div class="col_4">
							<a href=""><img src="../../assets/dsgzy_4.png" alt=""></a>
						</div>
						<div class="col_4">
							<a href=""><img src="../../assets/dsgzy_5.png" alt=""></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<flexView @toDown="toDown" @toTop="toTop"></flexView>
		<Footer id="foot"></Footer>
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
			touchMore:function(){
				this.$router.push("/addStore")
			},
			touchTime:function(index){
				this.timeIndex = index
			},
			touchDetail:function(){
				this.$router.push('/detail')
			},
			toTop() {
			  console.log("点击了吧____")
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
