<template>
  <div class="dashboard-container">
		反反复复ff烦烦烦
		<router-link to="/aaa">Go to Bar</router-link>
		
		
		 <div><h2>你好 我是 0.55555555555555</h2>
		 
		 <button type="primary" @click="openDev">打开 / 关闭 调试窗口</button>
		 
		        <button @click="updateApp" style="width:100px;height: 40px;">更新</button>
		    </div>
			
			<el-button type="text" @click="upshow = true">点击打开 Dialog</el-button>
			<el-dialog
			  title="更新应用"
			  :close-on-click-modal="false"
			  :close-on-press-escape="false"
			  :show-close="false"
			  :visible.sync="upshow"
			  width="30%"
			  center>
			  <el-row>
			    <el-col :span="24" ><el-progress :text-inside="true" :stroke-width="26"  :percentage="percent"  v-if="upshow"></el-progress></el-col>
			  </el-row>
			  <el-row>
			    <el-col :span="24" >  
				<p style="margin:20px auto;">
				<el-button  @click="chongqi" v-if="show">点击重启更新</el-button></p>
				</el-col>
			  </el-row>
			  
			
			</el-dialog>
			
  </div>
</template>

<script>
// export default {
//   name: 'dashboard'
// }

import Update from '@/components/update'
const {
  shell,
  getCurrentWebContents
} = require('electron').remote
export default {
  name: 'dashboard',
  components: {Update},
  data () {
    return {
		upshow: false,
      percent: 0,
      show: false
    }
  },

  mounted () {
    // 更新进度
    this.$electron.ipcRenderer.on('downloadProgress', (event, data) => {
      console.log(data)
      this.percent = (data.percent).toFixed(2)
      if (data.percent >= 100) {
        this.show = true;
      }
    })

    /**
             * 主进程返回的检测状态
             */
    this.$electron.ipcRenderer.on('message', (event, data) => {
      switch (data.status) {
        case -1:
          // this.$Message.error(data.msg);
						  console.log(data.msg)
          break
        case 0:
          // this.$Message.loading(data.msg);
          console.log(data.msg)
          break
        case 1:
          this.upshow = true
          break
      }
    })
  },
  methods: {
    openDev () {
      getCurrentWebContents().toggleDevTools()
    },
    updateApp () {
      this.$electron.ipcRenderer.send('checkForUpdate', 'asdad')
    },
	chongqi(){
		this.$electron.ipcRenderer.send('isUpdateNow', 'isUpdateNow')
	}
  }
}
</script>

