<template>
	<div class="blog-post">
  <h3>{{ post.name }}</h3>
  <button v-on:click="$emit('enlarge-text', 0.1)">放大</button>
  <div v-html="post.address"></div>
</div>
</template>
<script>
	
	export default {
		 props: ['post'],
		 
	}
</script>
