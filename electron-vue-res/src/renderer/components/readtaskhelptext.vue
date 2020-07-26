<template>
<div>
	<el-alert title="识字模式" type="success" :closable="false" description="1. 点击右侧 '字' '词' '句' 或 点击相应读音时， 显示对应字,词语,例句 ">
	</el-alert>
	
	<el-alert title="" type="success" :closable="false" description="2. 选择不认识，则会被加入到错字本 ">
	</el-alert>
	<el-alert title="" type="success" :closable="false" description=" 3. 在跳转过程中，每个字的检查结果保留">
	</el-alert>
	
	<el-alert title="键盘快捷键" type="warning" :closable="false" description="↑ ↓:切换字词句 ">
	</el-alert>
	
	<el-alert title="" type="warning" :closable="false" description="←:上一个字 ">
	</el-alert>
	
	<el-alert title="" type="warning" :closable="false" description="→:下一个字 ">
	</el-alert>
	<el-alert title="" type="warning" :closable="false" description="Home:转到第一个字 ">
	</el-alert>
	
	<el-alert title="" type="warning" :closable="false" description="End: 转到最后一个字">
	</el-alert>
	<el-alert title="" type="warning" :closable="false" description="空格: 字发音">
	</el-alert>
	<el-alert title="" type="warning" :closable="false" description="T: 词语发音">
	</el-alert>
	<el-alert title="" type="warning" :closable="false" description="S: 句子发音">
	</el-alert>
	
	<el-alert title="" type="warning" :closable="false" description="F1: 全屏幕">
	</el-alert>
	</div>
</template>

<script>

  export default {
    name: 'readtaskhelptext',
    components: {  },
    methods: {
      
    }
  }
</script>

<style>
  
</style>
