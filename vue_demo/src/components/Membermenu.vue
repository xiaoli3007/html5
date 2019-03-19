<template>
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      
	   <el-menu-item index="contentlist">
	    <i class="el-icon-location"></i>
	    <span slot="title">笔记列表</span>
	  </el-menu-item>
	  
      <el-menu-item index="contentadd">
        <i class="el-icon-menu"></i>
        <span slot="title">添加笔记</span>
      </el-menu-item>
      
    </el-menu>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
