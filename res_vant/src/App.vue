<template>
  <div id="app">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App'

}
document.addEventListener('DOMContentLoaded',()=>{
  const html =document.querySelector('html')
  let fontSize =  window.innerWidth / 10 
  fontSize = fontSize > 50 ? 50 :fontSize
  html.style.fontSize = fontSize + 'px'

})
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100% !important;
  height: 100%;
  font-size: 16px;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
}
</style>
