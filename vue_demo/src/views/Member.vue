<template>
  <div class="about">
    <div style="padding: 50px;">{{name}}欢迎回家</div>
  </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        		computed: {
        		  ...mapGetters([
        		    'name',
        		    'roles'
        		  ])
        		}
    }
</script>