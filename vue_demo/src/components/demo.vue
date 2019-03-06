<template>
	<ol>
		<li v-bind:todo="item" v-for="item in tableData3">
			{{ item.title }}
		</li>
	</ol>
</template>
<script>
	
	export default {
		data() {
			return {
				activeIndex: '1'
			};
		}
	}
</script>
