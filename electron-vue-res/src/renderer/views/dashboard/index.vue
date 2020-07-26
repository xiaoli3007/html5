<template>
	<div class="dashboard-editor-container">
		
		<panel-group :counttodata="counttodata" v-if="taskin"/>
		
		<el-row style="margin-bottom:32px;" v-if="taskin">
		  <line-chart :chart-data="lineChartData"/>
		</el-row>
		
		<el-row v-if="taskin">
		 <div class="chart-wrapper">
		   <bar-chart :chart-data="barChartData" />
		 </div>
		</el-row>
		
	<!-- 	<el-row :gutter="32">
		  <el-col :xs="24" :sm="24" :lg="8">
		    <div class="chart-wrapper">
		      <raddar-chart/>
		    </div>
		  </el-col>
		  <el-col :xs="24" :sm="24" :lg="8">
		    <div class="chart-wrapper">
		      <pie-chart/>
		    </div>
		  </el-col>
		  <el-col :xs="24" :sm="24" :lg="8">
		    <div class="chart-wrapper">
		      <bar-chart/>
		    </div>
		  </el-col>
		</el-row> -->
		
	</div>

</template>

<script>
	
	import { index_count} from '@/api/table'
	import _g from '@/utils/global.js'
	
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'
	import RaddarChart from './components/RaddarChart'
	import PieChart from './components/PieChart'
	import BarChart from './components/BarChart'
	
	const lineChartData = {
	  newVisitis: {
	    expectedData: [100, 120, 161, 134, 105, 160, 165],
	    actualData: [120, 82, 91, 154, 162, 140, 145]
	  }
	}
	
	const barChartData = {
	  newVisitis: {
	    expectedData: [100, 120, 161, 134, 105, 160, 165],
	    actualData: [120, 82, 91, 154, 162, 140, 145]
	  }
	}
	
	import {
		mapGetters
	} from 'vuex'

	const localStorage = require('../../../main/localStorage').default

	export default {
		 components: {
		  PanelGroup,
		  LineChart,
		  RaddarChart,
		  PieChart,
		  BarChart,
		},
		data () {
		  return {
		    voice: localStorage.getItem('voice'),
			lineChartData: lineChartData.newVisitis,
			barChartData: barChartData.newVisitis,
			counttodata:null,
			taskin:false,
		  }
		},
		created() {
			// console.log(this.voice)
			this.fetchData()
		},
		name: 'dashboard',
		computed: {
			...mapGetters([
				'name',
				'roles'
			])
		},
		methods: {
		  handleSetLineChartData(type) {
		    this.lineChartData = lineChartData[type]
		  }
		  ,
		  fetchData() {
		      _g.openGlobalLoading()
		    // this.listLoading = true
		  		const params = {
		  				
		  				userid: this.$store.state.user.userid,
		  		}
		    index_count(params).then(response => {
		  	     _g.closeGlobalLoading()
		        this.counttodata = response.countto
		        this.lineChartData = response.linetime
		        this.barChartData = response.bra
		        // this.listLoading = false
				this.taskin = true
		    })
		      // this.listLoading = false
		  },
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
	
	.dashboard-editor-container {
	  padding: 32px;
	  // background-color: rgb(240, 242, 245);
	  .chart-wrapper {
	    background: #fff;
	    padding: 16px 16px 0;
	    margin-bottom: 32px;
	  }
	}
</style>
