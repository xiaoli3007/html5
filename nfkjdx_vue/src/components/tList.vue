<template>
  <div class="list" ref="wrapper">
    <div>
      <!-- 当前城市 -->
     <div class="area" v-if="showAddress">
        <!-- <div class="title border-topbottom">当前</div> -->
        <div class="button-list button-list0">
          <div class="button-wrapper">
            <div class="button new_wz">北京</div>
			<div class="dingwei">当前定位城市</div>
          </div>
        </div>
      </div>
      <!-- 热门城市 -->
     <div class="area" v-if="hostCity">
        <div class="title border-topbottom ontitle">热门</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="(item) in hotCities" :key="item.id"> 
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- 城市列表 -->
      <div class="area" v-for="(item,key) in cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="innerItem in item" :key="innerItem.id">
            <div class="button">{{innerItem.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <transition name="fade">
      <div class="toast" v-show="showToast">
          <span class="letter">{{this.letter}}</span>
      </div>
    </transition>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import eventBus from '../model/eventBus.js'
export default {
  name: 'tList',
  props: {
    cities: Object,
    hotCities: Array,
	showAddress:{
		type: [Boolean, String],
		default: false
	},
	hostCity:{
		type: [Boolean, String],
		default: false
	},
  },
  data() {
    return {
      letter: '',
      showToast: false
    }
  },
  watch: {
    letter() {
      if(this.letter) {
        const elment = this.$refs[this.letter][0]
        this.scroll.scrollToElement(elment)
        this.changeToast()
      }
    }
  },
  methods: {
    changeToast () {
      this.showToast = true
      if(this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(()=>{
        this.showToast = false
      },500)
    }
  },
  mounted() {
    eventBus.$on('change', (letter) => {
      this.letter = letter
    })
    this.scroll = new Bscroll(this.$refs.wrapper,{
      click: true
    })
  },
  created(){
	  console.log("测试一下");
	  console.log(this.hotCities)
	  console.log(this.cities)
  }
}
</script>
<style lang="scss" scoped>
.list
  {
	  position:absolute;
	  overflow:hidden;
	  top: 0px;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  .title
	    {
			line-height:27px;
			padding-left:10px;
			background:#eee;
		}
		.ontitle {
			background-color: #fff;
			position: relative;
			&::before {
				display: block;
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 2px;
				height: 15px;
				background-color: red;
			}
		}
	  .button-list
	    {
			padding: 0px 20px 0px 10px;
			overflow: hidden;
			background-color: #fff;
			.button-wrapper
			  {
				  // float: left;
				  display: flex;
				  justify-content: center;
				  align-items: center;
				  width: 100%;
				  .button
				    {
						// margin: 5px 0;
						padding: 5px 0;
						font-size: 14px;
						// border: 1px solid #ccc;
						border-radius: 0px;
						text-align: center ;
						flex: 1;
						text-align: left;
						border-bottom:1px solid #eee;
						line-height: 34px;
					}
					.dingwei {
						width: 100px;
						text-align: right;
						margin-right: 10px;
					}
				&:last-child{
					.button {
						border-bottom:none;
					}
				}
			  }
			  
		}
	.button-list0 {
		padding: 0 10px;
		margin: 0;
		background-color: transparent;
		.button-wrapper {
			line-height: 40px;
			.button {
				padding: 0;;
				margin: 0;
				font-size: 14px;
				border-bottom: none;
				padding-left: 20px;
				background: url(../assets/address.png) left center no-repeat;
				background-size: 16px auto;
			}
		}
	}
  }
  .toast
    {
		position: fixed;
		top: 50%;
		left: 50%;
		transform :translate(-50%,-50%);
		z-index :10;
		width :50px;
		height :50px;
		background: #ed4e5e;
		border-radius: 50%;
		text-align: center;
		transition: all 0.5s;
		&.fade-enter
		    {
				opacity: 0;
			}
		&.fade-leave,&.fade-enter-active
		    {
				opacity: 1;
			}
		&.fade-leave-active
		    {
				opacity: 0;
			}
		.letter
		  {
			  line-height: 50px;
			  font-size: 16px;
			  font-weight: 700;
			  color: #eee;
		  }
	}
	
</style>


