<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
    html, body {
        height: 100%;
        box-sizing: border-box;
		margin: auto;
		overflow-x: hidden;
		 // margin-top: calc(var(--status-bar-height) + 44px);
    }
	body {
		// margin-top: 44px;
		// padding-top: 44px !important;
		background-color: #f5f5f5 !important;
	}
    img {
        max-width: 100%;
		height: auto;
    }

    div, a, button, span, input {
        box-sizing: border-box;
    }
	a , a:hover , a:focus {
		text-decoration: none;
	}
	ul,li {
		margin: auto;
		padding: 0;
		display: block;
	}
    input ,input:focus, input:hover {
        outline: none !important;
        box-shadow: none;
		border: none;
    }

    #app {
        // font-family:'Avenir', Helvetica, Arial, sans-serif;
        font-family: Microsoft Yahei;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        // text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        font-size: 14px;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .clearFlex:after {
        display: block;
        content: '';
        clear: both;
    }

    div {
        align-items: center;
        -webkit-align-items: center;
    }
	.container {
		width: 1600px;
		margin: auto;
	}
	@media screen and (max-width:1600px) {
		.container {
			width: 1400px;padding: 0 15px; box-sizing: border-box;
		}
	}
	@media screen and (max-width:1400px) {
		.container {
			width: 1200px;
		}
	}
	@media screen and (max-width:1200px) {
		.container {
			width: 100%; 
		}
	}
</style>
