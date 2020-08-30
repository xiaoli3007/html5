<template>
   
       <div>
		   <van-nav-bar
		     title="pdf"
		     left-text="返回"
		      left-arrow
		      @click-left="onClickLeft"
		   />	
		<!--   <button @click="logContent">
		   			log content
		   		</button> -->
				
       		 
       		<!-- <pdf ref="myPdfComponent"
       			src="http://192.168.1.195:80/course_def/res_url/RDovd25tcC9tZWRpYS9pc2FkbWluL21hc3Rlci80NC8yMDIwLzA4LTI5L+WPkeaWr+iSguiKrC8=@/hjhj.pdf"
       			@num-pages="pageCount = $event"
       			@page-loaded="currentPage = $event"
				
				:page="currentPage"
       		></pdf> -->
			
			<pdf ref="myPdfComponent" v-if="show"   style="" :src="pdf_url" :page="page" :rotate="rotate"  @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
			
			
			<van-pagination v-model="page" :page-count="numPages" mode="simple" @change="paginationchange" />
			
       	</div>
 
</template>

<script>
     import pdf from 'vue-pdf'
export default {
    name:'vuepdf',
   components: {
   		pdf
   	},
    data() {
        return{
             loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate: 0,
			 pdf_url : 'http://192.168.1.195:80/course_def/res_url/RDovd25tcC9tZWRpYS9pc2FkbWluL21hc3Rlci80NC8yMDIwLzA4LTI5L+WPkeaWr+iSguiKrC8=@/hjhj.pdf',
             catid:0,
             news_id:0,
			 show: true,
        }
    },
	created() {
		this.catid = this.$route.query.catid
		this.news_id = this.$route.query.news_id
		this.pdf_url = this.$route.query.playurl 
	},
    mounted(){
    },

    methods :{
       error: function(err) {
       
       			console.log(err);
       		},
		paginationchange(e) {
        		   
        		console.log(e)  
        },
        onClickLeft() {
        		  this.$router.replace({
        		  	name: 'Show',
        		  	query: {
        		  		catid: this.catid,
        		  		news_id: this.news_id
        		  	}
        		  })
        		  
        		},
        logContent() {
        
        			this.$refs.myPdfComponent.pdf.forEachPage(function(page) {
        
        				return page.getTextContent()
        				.then(function(content) {
        
        					var text = content.items.map(item => item.str);
        					console.log(text);
        				})
        			});
        		}
     
       

    }
}


</script>

<style scoped lang='scss'>

</style>