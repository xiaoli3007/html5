<template>
  <div>
    <a @click="click()"><svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"  /></a>
		<!-- <el-button @click="click()">重置</el-button> -->
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
	watch:{

		 'isFullscreen': {
		   deep: true,
		   handler: function(val, oldVal) {
		     console.log(val)
		   }
		 }
	},
	created() {

	},
  mounted() {
		
    this.init()
  },
  methods: {
    click() {
			// console.log(1111)
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      }
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
