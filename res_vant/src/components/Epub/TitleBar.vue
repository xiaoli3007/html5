<template>
 <transition name="slide-down">
        <div class="title-wrapper" v-show="isTitleAndMenuShow">
			
			
			
                <div class="left" @click="onClickLeft">
                    <span class="icon-back icon"></span>
                </div>
                <div class="right">
					<!-- <van-icon name="star-o" /> -->
                    <!-- <div class="icon-wrapper">
                        <span class="icon-cart icon"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-person icon"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-more icon"></span>
                    </div> --> 
                </div> 
            </div>
    </transition>
</template>

<script>
export default {
    name:'TitleBar',
    props:{
        isTitleAndMenuShow:{
            tpye:Boolean,
            default:false
        },
		catid: {
            tpye:Number,
            default:0
        },
		news_id: {
            tpye:Number,
            default:0
        },
    }, methods: {
	 onClickLeft() {
		  this.$router.replace({
		  	name: 'Show',
		  	query: {
		  		catid: this.catid,
		  		news_id: this.news_id
		  	}
		  })
		  
		},
		}

}
</script>

<style lang="scss" scoped>

@import '@/assets/epub/css/global.scss';
 .title-wrapper{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(48);
        background-color: white;
        z-index: 101;
        display: flex;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0, .15);
        .left{
            flex: 0 0 px2rem(60);
            @include center;
        }
        .right{
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper{
                flex:0 0 px2rem(40)
            }
        }

    }

</style>