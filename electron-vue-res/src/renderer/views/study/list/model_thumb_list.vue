<template>
  <div class="app-container">
	  
 <el-form :inline="true"  class="demo-form-inline">
	    <el-form-item style="margin-bottom: 0;">
	  	<el-input v-model="keywords" placeholder="标题"></el-input>
	    </el-form-item>
		<el-form-item style="margin-bottom: 0;">
		<el-input v-model="search_author" placeholder="作者"></el-input>
		</el-form-item>
		
		<el-form-item style="margin-bottom: 0;">
		<el-input v-model="search_translator" placeholder="译者"></el-input>
		</el-form-item>
	 
	    <el-form-item style="margin-bottom: 0;">
	  	<el-button type="primary" @click="search()">查询</el-button>
	    </el-form-item>
	  </el-form>
	  <div class="booklist">
	  <el-row :gutter="20" v-loading.body="listLoading" element-loading-text="Loading" >
	  	<el-col :span="4" v-for="(singe, index) in list" :key="index">
	  		<div class="grid-content bg-purple" >
	  			<el-row>
	  				<el-col :span="20" :offset="2" justify="center" align="center" style="margin-bottom:0;">
	  					<el-image style="width: 120px;cursor: pointer; " :src="singe.thumb_zm" fit="fill" @click.native="gotoBookShow(singe.id)"></el-image>
	  				</el-col>
	  			</el-row>
	  			<el-row style="margin-top: 0;">
	  				<el-col :span="20" :offset="2" justify="center" align="center" style="margin-bottom:0;">
	  					<p >
						<el-link @click.native="gotoBookShow(singe.id)">{{singe.title}}</el-link>
						 </p>
						<p v-if="singe.author!=''"><el-tag  style="cursor: pointer;"  @click.native="searchauthor(singe.author)">作者:{{singe.author}}</el-tag></p>
						<p v-if="singe.translator!=''"><el-tag  style="cursor: pointer;" type="warning" @click.native="searchtranslator(singe.translator)">译者:{{singe.translator}}</el-tag></p>
	  				</el-col>
	  			</el-row>
			<!-- 	<el-row>
					<el-col :span="20" :offset="2" justify="center" align="center">
						  <el-button type="warning" size="medium" v-if="scope.row.shizi_taskid===0" v-on:click="read(2,scope.row.id,'ebook',0)">识字</el-button>
						 <el-button type="warning" size="medium" v-if="scope.row.shizi_taskid!=0" v-on:click="readtask(scope.row.shizi_taskid)" plain>识字</el-button> 
						 
						 
						  <el-button type="success" size="medium"  v-on:click="gotoBookShow(scope.row.id)">详情</el-button>  
					</el-col>
				</el-row> -->
		</div>
	  	</el-col>
	  
	  </el-row>
	   </div>
<!--    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
    
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
  
    </el-table> -->
	
	
	<div class="block pages">
					<el-pagination
					@current-change="handleCurrentChange"
					background
					layout="prev, pager, next"
					:page-size="pagesize"
					:current-page="currentPage"
					:total="dataCount">
					</el-pagination>
				</div>
				
				
  </div>
</template>

<script>
import { getList} from '@/api/table'
import _g from '@/utils/global.js'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
	  loading:false,
	  dataCount: null,
	  currentPage: null,
	  keywords: '',
	  multipleSelection: [],
	  pagesize: 18,
	  search_author:'',
	  search_translator:''
	  
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.init()
		
  },
  methods: {
	  
	  gotoBookShow(a) {
	  	this.$router.replace({
	  		name: 'BookShow',
	  		query: { ebookid: a}
	  	})
	  },
		 readtask(a) {
			 // console.log(a);
			this.$router.replace({ name: 'Read' , query:{  taskid: a }})
		},
		 read(b,c,d,e) {
			this.$router.replace({ name: 'Read' , query:{ type: b,relation_id: c, relation_type: d, taskid: e}})
		},
		
		searchauthor(a) {
					
		  this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_author: a, page: 1 }})
		},
		searchtranslator(a) {
					
		  this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_translator: a, page: 1 }})
		},
	  search() {
			
	    this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_author: this.search_author,search_translator: this.search_translator, page: 1 }})
	  },
	   handleCurrentChange(page) {
	    this.$router.push({ path: this.$route.path, query: { keywords: this.keywords,search_author: this.search_author, page: page }})
	  },
    fetchData() {
	    _g.openGlobalLoading()
      this.listLoading = true
			const params = {
					
					search_author: this.search_author,
					search_translator: this.search_translator,
					keywords: this.keywords,
					page: this.currentPage,
					pagesize: this.pagesize,
					userid: this.$store.state.user.userid,
			}
      getList(params).then(response => {
		     _g.closeGlobalLoading()
        this.list = response.items
		    this.dataCount = parseInt(response.dataCount)
        this.listLoading = false
					
					// var temp = this.list
					// _(temp).forEach(function(value,key) {
					// 	// console.log(value.word1);
					// 		 var s = []
					// 		_(value.wcell_list).forEach(function(value2,key2) {
					// 			s.push(value2.word)
					// 		});
					// 		  s=_.join(s, ',')
					// 		// console.log(typeof temp);
					// 		// console.log(temp[key].name);
					// 		// this.list['sss']=s  
					// 		_.set(temp, key+'.s', s);
					// });
					// this.list = temp
					// console.log(this.list);
      })
	    this.listLoading = false
    },
	 getCurrentPage() {
	  let data = this.$route.query
	  if (data) {
	    if (data.page) {
	      this.currentPage = parseInt(data.page)
	    } else {
	      this.currentPage = 1
	    }
	  }
	},
	getKeywords() {
	  let data = this.$route.query
	  if (data) {
	    if (data.keywords) {
	      this.keywords = data.keywords
	    } else {
	      this.keywords = ''
	    }
	  }
	},
	getsearch_author() {
	  let data = this.$route.query
	  if (data) {
	    if (data.search_author) {
	      this.search_author = data.search_author
	    } else {
	      this.search_author = ''
	    }
	  }
	}, 
	getsearch_translator() {
	  let data = this.$route.query
	  if (data) {
	    if (data.search_translator) {
	      this.search_translator = data.search_translator
	    } else {
	      this.search_translator = ''
	    }
	  }
	}, 
	init() {
	  this.getKeywords()
	  this.getsearch_author()
	  this.getsearch_translator()
	  this.getCurrentPage()
	  this.fetchData()
	},
	
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
	.booklist{
	p {
		margin: 10px 0 0 0; font-size: 12px; 
		  // line-height: 1.2;
	}
	.el-row {
		margin: 10px 0 0;
		padding: 0 15px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
		margin-bottom: 10px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #eee; border: 1px solid #ccc;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px; 
		// min-height: 260px; max-height: 290px;  
		 overflow: hidden;
		 height: 290px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	}
</style>
