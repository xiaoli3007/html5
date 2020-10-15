<template>
	<div class="homes">
		<div class="wp">
			<div class="logoView logoView2">
				<a href="" class="logo"><img src="../../assets/images/logo.png" alt=""></a>
				<div class="titleView">
					<img src="../../assets/images/title2.png" alt="">
				</div>
			</div>
			
			<div class="searchView">
				<div class="fix searchTab">
					<div class="item" :class="tabIndex==index?'active':''" v-for="(item,index) in tabList" :key="index" @click="touchToTab(index)">{{item}}
						<img class="icon" src="../../assets/images/down.png" alt=""></div>
				</div>
				<div class="search_cv">
					<div class="search_lv">
						<div class="inputView">
							<img src="../../assets/images/search.png" alt="">
							<el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
						</div>
						<div class="word_tj">
							热词推荐：
							<span v-for="(item,index) in searchList" :key="index">{{item}}</span>
						</div>
					</div>
					<el-button class="btn">搜索</el-button>
				</div>
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="bread_cv">
				<img class="icon" src="../../assets/images/icon_home.png" alt="">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>关于本库</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="conteViews">
				<div class="title_hv">
					<div class="line_l">
						<div class="line"></div>
						<img src="../../assets/images/icon_title.png" alt="">
					</div>
					<div class="title">关于本库</div>
					<div class="line_l">
						<img src="../../assets/images/icon_title.png" alt="">
						<div class="line"></div>
					</div>
				</div>
				<div class="conte_tv">
					<div class="title">馆藏近代全学制教材库简介</div>
					<img src="../../assets/images/03.png" alt="">
					<p>北京师范大学是一所历史悠久、底蕴深厚的百年名校。以陈宝泉、鲁迅、陈垣、张贻惠、钱玄同、黎锦熙、黄国璋、傅种孙、卫天霖、钟敬文、黄药眠、白寿彝、焦菊隐、周廷儒、汪仁、启功、陶大镛等为代表，一大批名师先贤在此弘文励教，为国家培养了无数栋梁之材，并形成了学术坚守和现实关怀兼具的良好学风。</p>
					<p>在一百多年的学术传承中，优秀的师大人撰写了大量优秀的学术著作和其他作品。将这些著作、作品加以收集、整理、保存和利用，是北师大图书馆义不容辞的责任。1989年，北京师范大学图书馆新馆馆舍（现旧馆）落成，教师文库的筹备提上日程。一方面，根据档案资料提供的我校已故和在世专家学者名录，从馆藏已编图书中遴选出400余册教师图书；另一方面，多次向全校发出征集教师出版物的通知，截止1992年初，共收到集体和个人赠书400余册。图书馆在库本阅览室专辟角屋一间，存放这些教师著作。并为其单独制作目录卡片，供读者使用。彼即京师文库之雏形。</p>
					<p>2002年，在北师大百年校庆之际，为集中展示全校学术成果，图书馆专门成立了京师文库阅览室，将十多年来努力收集的数千册教师、校友著作开架排列，供读者取阅。并撰写了文库章程、征集办法等文件，将文库收录范围明确规定为“在北京师范大学、北平女子师范大学各历史时期及辅仁大学（1925-1952）学习和工作过的教职员工和校友的各类著作（含专著、译著、编著、古籍整理成果等）”。</p>
					<p>2006年，为使我校师生读者更好地检索和利用京师文库的图书资源，我馆启动了文库图书的数字化工作，“京师文库全文库”最终于2008年10月正式与读者见面。该库收录图书全文5429种，提供分类导航，点击题名或封面可直接在线浏览电子图书全文，也可查看其对应的馆藏记录。</p>
					<p>近年来，随着京师文库收藏图书数量的持续增长，以及所收资源类型的不断拓展，“京师文库全文库”已经无法揭示库藏文献资源的全部内涵。于是，图书馆着力打造“京师文库”特色资源库，以便全面展陈多元化的库藏资源，方便读者在线快捷阅览，并加强宣传功效，扩大我校学术成果的影响力，促进学术薪火传承。经过一年多的努力，“京师文库”特色资源库于2017年12月开始试运行；2018年4月18日，正式上线。北京师范大学是一所历史悠久、底蕴深厚的百年名校。以陈宝泉、鲁迅、陈垣、张贻惠、钱玄同、黎锦熙、黄国璋、傅种孙、卫天霖、钟敬文、黄药眠、白寿彝、焦菊隐、周廷儒、汪堃仁、启功、陶大镛等为代表，一大批名师先贤在此弘文励教，为国家培养了无数栋梁之材，并形成了学术坚守和现实关怀兼具的良好学风。</p>
					<p>在一百多年的学术传承中，优秀的师大人撰写了大量优秀的学术著作和其他作品。将这些著作、作品加以收集、整理、保存和利用，是北师大图书馆义不容辞的责任。1989年，北京师范大学图书馆新馆馆舍（现旧馆）落成，教师文库的筹备提上日程。一方面，根据档案资料提供的我校已故和在世专家学者名录，从馆藏已编图书中遴选出400余册教师图书；另一方面，多次向全校发出征集教师出版物的通知，截止1992年初，共收到集体和个人赠书400余册。图书馆在库本阅览室专辟角屋一间，存放这些教师著作。并为其单独制作目录卡片，供读者使用。彼即京师文库之雏形。</p>
					<p>2002年，在北师大百年校庆之际，为集中展示全校学术成果，图书馆专门成立了京师文库阅览室，将十多年来努力收集的数千册教师、校友著作开架排列，供读者取阅。并撰写了文库章</p>                            
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabList: ["全库","教材","教参教辅","课程标准","高级搜索"],
				tabIndex: 0,
				searchList: ["小学", "蒙学新教育课本", "李彦", "广告", "训蒙新读本序言", "新最高等小", "例言", "训蒙新读本序言", "新..."],
				state:''
			}
		},
		created:function(){
			
		},
		methods:{
			loadAll() {
				return [{
						"value": "三全鲜食（北新泾店）",
						"address": "长宁区新渔路144号"
					},
					{
						"value": "Hot honey 首尔炸鸡（仙霞路）",
						"address": "上海市长宁区淞虹路661号"
					},
					{
						"value": "新旺角茶餐厅",
						"address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
					},
					{
						"value": "泷千家(天山西路店)",
						"address": "天山西路438号"
					},
				];
			},
			touchToTab: function(index) {
				this.tabIndex = index
			},
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
			
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			createStateFilter(queryString) {
				return (state) => {
					return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
			},
		}
	}
</script>

<style>
</style>
