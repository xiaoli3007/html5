<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
			<svg-icon  icon-class="shijian" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">学习时长(分钟)</div>
          <count-to :start-val="0" :end-val="parseInt(counttodata.all_learntime_f)" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-message">
			<svg-icon  icon-class="ting" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">听写任务</div>
          <count-to :start-val="0" :end-val="parseInt(counttodata.task_tingxie_nums)" :duration="3000" class="card-panel-num"/>
        </div>
      </div> 
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-money">
			<svg-icon  icon-class="shizi" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">识字任务</div>
          <count-to :start-val="0" :end-val="parseInt(counttodata.task_shizi_nums)" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-shopping">
			<svg-icon  icon-class="tongji" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">识字量</div>
          <count-to :start-val="0" :end-val="parseInt(counttodata.shizi_nums)" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
	
<!-- 	<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	  <div class="card-panel" >
	    <div class="card-panel-icon-wrapper icon-shopping">
			<svg-icon  icon-class="tongji" class-name="card-panel-icon"></svg-icon>
	    </div>
	    <div class="card-panel-description">
	      <div class="card-panel-text">掌握成语</div>
	      <count-to :start-val="0" :end-val="parseInt(counttodata.shizi_chengyu_nums)" :duration="3600" class="card-panel-num"/>
	    </div>
	  </div>
	</el-col> -->
	
	
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
	
	data() {
	  return {
	    shijian: 'shijian',
	  }
	},
	props: {
	  counttodata: {
	    type: Object,
	    default: null,
	  }
	  
	},
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  // margin-top: 18px;
  .card-panel-col{
    margin-bottom: 10px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
   
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
