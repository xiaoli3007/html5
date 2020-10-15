<template>
    <div class="navi-bar">
        <div class="cubeic-back" @click="goBack">
            <div class="left_nt">{{leftText}}</div>
        </div>
        <div class="title">{{ msg }}</div>
        <div class="cubeic-icon" :class="rightNav" @click="rightClick">{{rightText}}</div>
    </div>
</template>

<script lang="js">
    // import {Component, Prop, Vue, Emit} from 'vue-property-decorator';

    // @Component({})
    // export default class HelloWorld extends Vue {
    //     @Prop() private msg!: string;
    //     @Prop() private rightText!: string;
    //     @Prop() private leftText!: string;
    //     @Prop() private rightNav!: string;
    //     @Prop() private needBack!: boolean;

    //     @Emit("rightClick")
    //     rightClick() {

    //     }

    //     @Emit("goBack")
    //     goBack() {
    //         if (this.needBack == null || this.needBack)
    //             this.$router.back();//返回上一层
    //     }
    // }

	export default{
		props: {
			msg:String,
			rightText:String,
			leftText:String,
			rightNav:String,
			needBack: {
				type: [Boolean, String],
				default: true
			},
		},
		data(){
			return{

			}
		},
		methods:{
			rightClick:function(){
				this.$emit("rightClick","")
			},
			goBack:function(){
				if (this.needBack == null || this.needBack){
					this.$router.back()
					this.$emit("goBack","")
				}
			}
		}
	}
	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    // h3 {
    // 	margin: 40px 0 0;
    // }
    // ul {
    // 	list-style-type: none;
    // 	padding: 0;
    // }
    // li {
    // 	display: inline-block;
    // 	margin: 0 10px;
    // }
    // a {
    // 	color: #42b983;
    // }
    .cubeic-back {
        color: white;
        font-size: 0.553333rem;
        // line-height: 1.333333rem;
        // height: 1.333333rem;
		line-height: 44px;
		height: 44px;
        padding-left: 12px;
        margin-left: 12px;
        width: 30px;
        background-size: 10px auto;
		position: relative;
		z-index: 999;
		float: left;
    }

    .cubeic-back .left_nt {
        position: absolute;
        left: 100%;
        display: block;
        top: 0;
        line-height: 1.333333rem;
        font-size: 0.5rem;
        color: #fff;
        z-index: 99;
        width: 1.6rem;
    }

    .cubeic-back:before {
        content: '';
    }

    .cubeic-icon {
        color: white;
        font-size: 14px;
        height: 44px;
        display: flex;
        line-height: 44px;
        align-items: center;
        justify-content: center;
        width: 30px;
		margin-right: 12px;
		float: right;
		position: relative;
		z-index: 999;
    }

    .title {
        width: 100%;
        color: white;
        font-size: 16px;
        height: 44px;
        display: flex;
        line-height: 44px;
        align-items: center;
        justify-content: center;
        // margin-left: 0.4rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
    }

    .navi-bar {
        background: #04C1AB ;
        // display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
		padding-top: var(--status-bar-height);
        height: 44px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 9999;
    }
	.navi-bar::after {
		display: block;
		content: '';
		clear: both;
	}
	.cubeic-icon.navRight {
		background-size: 20px auto;
	}
</style>
