<template>
	<div>
		{{ title }}
		
		<button v-on:click="count++">
			You clicked me {{ count }} times.
		</button>
		
		<span style="color: #2299DD;"><slot></slot></span>
	</div>
 

</template>
<script>
	export default {
		props: ['title','count'],
// 		data: function() {
// 			return {
// 				count: 1
// 			}
// 		},
	}
</script>
