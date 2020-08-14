<template>
	<div></div>
</template>
<script>
	
	import router from '@/router'
	
export default {
  created() {
    if (this.$route.query.name) {
      router.replace({ name: this.$route.query.name })
			// console.log('111')
    } else {
      console.log('refresh fail')
    }
  }
}
</script>