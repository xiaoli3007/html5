<template>
	<div class="about">
		<div>{{name}}欢迎回家</div>

		<memberleft title="333" count="11">ffsdf</memberleft>
		<demo v-for="post in tableData" v-bind:key="post.id" v-bind:post="post"></demo>
		<div :style="{ fontSize: postFontSize + 'em' }">
		<demo  v-bind:post="tableData2"  v-on:enlarge-text="onEnlargeText"></demo>
		</div>
	 
	 <!-- Alt + C -->
<input @keyup.67="clear">

	</div>

</template>
<script>
	
	import Memberleft from '@/components/Memberleft.vue'
	import {
		mapGetters
	} from 'vuex'
	import demo from '@/components/demo.vue'
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎第三方',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}],
				tableData2: {
					date: '2016-05-02',
					name: '111111111',
					address: '2222222222 1518 弄'
				},
				tableData3: '11',
				postFontSize:1
			}
		},
		computed: {
			...mapGetters([
				'name',
				'roles'
			])
		},
		components: {
			Memberleft,
			demo
		},methods: {
		  onEnlargeText: function (enlargeAmount) {
			this.postFontSize += enlargeAmount
		  },
		  clear:function(){
			  alert(1);
		  }
		}
	}
</script>
