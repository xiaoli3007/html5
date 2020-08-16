<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" >
		  <template v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
		</template>
		
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
	import _ from 'lodash'
	
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
	  // console.log(this.$route)
	  
	  let tempmath =[]
	  _(matched).forEach(function(value, key) {
		  // console.log(value)
		  if(value.meta.title!=''){
			  _.set(tempmath, key, value); 
		  }
	  });
	  
	   tempmath = _.compact(tempmath)
	   
	   // console.log(tempmath)
	  
      const first = tempmath[0]
      if (first && first.name !== 'dashboard') {
        tempmath = [{ path: '/dashboard', meta: { title: '主页' }}].concat(tempmath)
      }
	   // console.log(matched)
      this.levelList = tempmath
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
