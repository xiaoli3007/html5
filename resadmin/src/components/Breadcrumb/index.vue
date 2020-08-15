<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" >
		  <template v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}1</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}2</router-link>
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
	  console.log(this.$route)
	  
	  _(matched).forEach(function(value, key) {
		  console.log(value)
		  // _.set(list_select_linkage, key, value2);
	  });
	  
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '主页' }}].concat(matched)
      }
	   console.log(matched)
      this.levelList = matched
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
