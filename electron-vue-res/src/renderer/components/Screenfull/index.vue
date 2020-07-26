<template>
  <div>
    <a @click="click()"><svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"  /></a>
		<!-- <el-button @click="click()">重置</el-button> -->
  </div>
</template>

<script>
	const remote = require('electron').remote
// const { BrowserWindow } = require('electron').remote
// import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
	watch:{
		 // isFullscreen(newValue, oldValue) {
			// 	console.log(newValue)
		 // }
		 'isFullscreen': {
		   deep: true,
		   handler: function(val, oldVal) {
		     // console.log(111)
		     // console.log(val)
		   }
		 }
	},
	created() {
		// let win=BrowserWindow.getFocusedWindow()
		// let win=remote.getCurrentWindow()
		// console.log(win.isFullScreen())
		// console.log(BrowserWindow)
	},
  mounted() {
		
    this.init()
  },
  methods: {
    click() {
			// console.log(remote.getCurrentWindow().isFullScreen())
			  this.isFullscreen = !remote.getCurrentWindow().isFullScreen()
				remote.getCurrentWindow().setFullScreen(this.isFullscreen)
				// this.isFullscreen = !this.isFullscreen
    },
    init() {
      
       this.isFullscreen = remote.getCurrentWindow().isFullScreen()
      
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
