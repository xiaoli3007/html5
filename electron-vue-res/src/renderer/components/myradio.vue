<template>
	<div style="display: inline;" class="myradio">
		<!-- <el-button v-for="(item,index) in classArr" :key="index" @click="result(index)" :type="resultNum === index?'success':''">{{item.name}}</el-button>
 -->
		<ul style="display: inline;">
			<li v-for="(item,index) in listdata" :key="index" @click="result(index)" :class="resultNum === index || v_v=== item.value?'active':''">
				{{item.name}}
			</li>
		</ul>


	</div>
</template>

<script>
	export default {
		name: 'my-radio',
		props: {
			v_model_value: {
				type: String,
				default: ''
			},
			listdata: {
				type: Array,
			},

		},
		model: {

			prop: 'v_model_value',

			event: 'someEvent' //不知道怎么用

		},
		data() {
			return {
				// classArr: [{
				// 	name: "认识",
				// 	value: "1"
				// }, {
				// 	name: "不认识",
				// 	value: "2"
				// }],
				num: "",
			}
		},
		created() {
			// console.log('ddd')
			// console.log(this.v_model_value)
			// console.log(this.listdata)
			// this.num = this.v_model_value
		},
		methods: {
			result(index) {
				this.num = index;
				// console.log(this.v_model_value)
				// this.v_model_value = this.classArr[index].value
				// this.$emit("passtoparentradio", this.v_model_value)
				this.$emit("passtoparentradio", this.listdata[index].value)
			}
		},
		watch: {
			value(newValue, oldValue) {
				console.log(newValue)
			}
		},
		computed: {
			resultNum() {
				return this.num;
			}
			,
			v_v() {
				if(this.num===''){
					return this.v_model_value;
				}else{
					return ''
				}
			}
		}
	}
</script>

<style lang="scss">
.myradio{
	
	ul{margin: 0;padding: 0;}
	li {
		list-style: none;
		margin: 0 5px 0 0;
		padding: 12px 10px 0 10px;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		height: 40px;
		color: #606266;
		font-weight: 500;
		line-height: 1;
		cursor: pointer;
		white-space: nowrap;
		outline: 0;
		font-size: 14px;
		position: relative;
		display: inline-block;

		&:hover {
			cursor: pointer;
			border-color: #409EFF;
			color: #409EFF;
		}
	}

	.active {
		// background-color: #67C23A;
		border-color: #409EFF;
		color: #409EFF;
	}
}		
</style>
