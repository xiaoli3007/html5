<template>
    <div class="menu-bar">
        <transition name="slide-up">
            <div class="menu-wrapper" v-show="isTitleAndMenuShow" :class="{'hide-box-shadow': isSettingFontSizeShow || !isTitleAndMenuShow}">
                <div class="icon-wrapper" @click="showNav">
                    <span class="icon-LC_icon_menu_line icon"></span>
                </div>
                <div class="icon-wrapper" @click="showSetting(2)">
                    <span class="icon-progress icon"></span>
                </div>
                <div class="icon-wrapper" @click="showSetting(1)">
                    <span class="icon-brightness icon"></span>
                </div>
                <div class="icon-wrapper" @click="showSetting(0)">
                    <span class="icon-a icon">A</span>
                </div>
            </div>
        </transition>
        <transition name="slide-up">
            <div class="setting-wrapper" v-show="isSettingFontSizeShow">
            <div class="setting-font-size" v-if="showTang === 0">
                <div class="preview" :style="{'fontSize':minFontSize}">A</div>
                <div class="select">
                    <div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
                        <div class="line"></div>
                        <div class="point-wrapper">
                            <div class="point" v-show="defaulFontSize === item.fontSize">
                                <div class="small-point"></div>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="preview" :style="{'fontSize':maxFontSzie}">A</div>
            </div>
            <div class="setting-theme" v-else-if="showTang === 1">
                <div class="setting-theme-item" v-for="(item,index) in themesList" :key="index" @click="setTheme(index)">
                    <div class="preview" :style="{background : item.style.body.background}" :class="{'no-border': item.style.body.background !== '#fff'}"></div>
                    <div class="text" :class="{'selected': index === defaulTheme }">{{item.desc}}</div>
                </div>
            </div>
            <div class="setting-progress" v-else-if="showTang === 2">
                <div class="progress-wrapper">
                    <input class="progress" 
                    type="range" 
                    max="100" 
                    min="0" 
                    step="0.1"
                    @change="onProgressChange($event.target.value)"
                    @input="onProgressInput($event.target.value)"
                    :value="progress"
                    :disabled="!bookAvailable"
                    :style="{backgroundSize: progress+'%'+''+'100%'}"
                    ref="progress"
                    >
                </div>
                <div class="text-wrapper">
                    <span>{{bookAvailable ? progress + '%': '加载中...'}}</span>
                </div>
            </div>
            </div>
        </transition>
        <transition name="nav-up">
        <div class="nav-wrapper" v-show="isShowNav">
            <div class="nav-list">
                <div class="nav">
                    <div class="nav-title">
                        <div class="nav-inner-title">
                            <span class="title">目录</span>
                        </div>
                    </div>
                    <div class="nav-content">
                        <div class="nav-item" v-for="(item,index) in navigationList" :key="index" @click="jumpTo(item.href)">
                            <div class="nav-inner-item">
                                <span class="content">{{item.label}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-right" @click="closeNav"></div>
        </div>
        </transition>
    </div>
   
</template>

<script>
export default {
    name:"MenuBar",
    props:{
        isTitleAndMenuShow:{
            type:Boolean,
            default:false
        },
        fontSizeList:{
            type:Array,
            default(){
                return []
            }
        },
        defaulFontSize:{
            type:Number,
        },
        themesList:{
            type:Array
        },
        defaulTheme:{
            type:Number
        },
        bookAvailable:{
            type:Boolean
        },
        isShowNav:{
            type:Boolean,
            default(){
                return false
            }
        },
        navigationList:{
            type:Array
        },
        progress:{
            type:String,
            default(){
                return 0
            }
        }
    },
    computed:{
        //获取最大字体值
        maxFontSzie(){
            return this.fontSizeList[this.fontSizeList.length-1].fontSize + 'px'
        },
        //获取最小字体值
        minFontSize(){
            return this.fontSizeList[0].fontSize + 'px'
        },
       
    },
    data(){
        return{
            isSettingFontSizeShow:false,
            showTang:0,
            currentProgress:0
            
        }
    },
    methods:{
        clickIfSetting(){
            this.$emit('clickSetting')
        },
        showSetting(tag){
            this.isSettingFontSizeShow = true
            this.showTang = tag
            // this.isSettingFontSizeShow = ! this.isSettingFontSizeShow
        },
        hideSetting(){
            this.isSettingFontSizeShow = false
        },

        setFontSize(fontSize){
            this.$emit('setFontSize',fontSize)
        },
        setTheme(index){
            this.$emit('setTheme',index)
        },
        //拖到进度条时触发的事件
        onProgressInput(progress){
            this.$emit('onProgressInput',progress)
        },
        onProgressChange(progress){
            this.$emit('onProgressChange',progress)
        },
        showNav(){
            this.$emit('showNav')
        },
        closeNav(){
            this.$emit('closeNav')
        },
        jumpTo(href){
            this.$emit('jumpTo',href)
        }


    }

}
</script>

<style scoped lang="scss">
@import '@/assets/epub/css/global.scss';
.menu-bar{
    .menu-wrapper{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: px2rem(48);
        background-color: white;
        z-index: 101;
        display: flex;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0, .15);
        &.hide-box-shadow{
            box-shadow: none;
        }

        .icon-wrapper{
            flex: 1;
            @include center;
        }

    }

    .setting-wrapper{
        z-index: 100;
        position: absolute;
        bottom: px2rem(48);
        left: 0;
        width: 100%;
        height: px2rem(60);
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        .setting-font-size{
            display: flex;
            height: 100%;
            .preview{
                flex:0 0 px2rem(50);
                @include center;
            }
            .select{
                display: flex;
                flex: 1;
                align-items: center;
                .select-wrapper{
                    &:last-child{
                        .line{
                            &:last-child{
                                // border-top: none;
                                display: none;
                            }
                        }
                    }
                    &:first-child{
                        .line{
                            &:first-child{
                                // border-top: none;
                                display: none;
                            }
                        }
                    }
                    @include center;
                    flex: 1;
                    display: flex;
                    .line{
                        flex: 1;
                        height: 0;
                        border-top: px2rem(1) solid #ccc;
                    }
                    .point-wrapper{
                        position: relative;
                        flex: 0 0 0;
                        width: 0;
                        height: px2rem(7);
                        border-left: px2rem(1) solid #ccc;
                        .point{
                            position: absolute;
                            top: 0;
                            left: 0;
                            transform: translate(-50%,-25%);
                            width: px2rem(20);
                            height: px2rem(20);
                            border-radius: 50%;
                            background: white;
                            border: px2rem(1) solid #ccc ;
                            box-shadow: 0 px2rem(4) px2rem(4) rgba( 0, 0, 0, .15);
                            @include center;
                            .small-point{
                                width: px2rem(5);
                                height: px2rem(5);
                                border-radius: 50%;
                                background: black;
                            }
                        }
                    }
                }
            }
            
            

        }

        .setting-theme{
            height: 100%;
            display: flex;
            .setting-theme-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: px2rem(5);
                box-sizing: border-box;
                .preview{
                    flex: 1;
                    border: px2rem(1) solid #ccc;
                    box-sizing: border-box;
                    &.no-border{
                        border: none;
                    }
                }
                .text{
                    flex: 0 0 px2rem(30);
                    font-size: px2rem(12);
                    color: #ccc;
                    @include center;
                    &.selected{
                        color: #333;
                    }

                }

            }
        }

        .setting-progress{
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            font-size: px2rem(15);
            .progress-wrapper{
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 px2rem(30);
                box-sizing: border-box;
                .progress{
                width: 100%;
                -webkit-appearance: none;
                height: px2rem(2);
                background: -webkit-linear-gradient(#999,#999) no-repeat , #ddd;
                background-size: 0 100%;
                &:focus{
                    outline: none;
                }
                &::-webkit-slider-thumb{
                    -webkit-appearance: none;
                    height: px2rem(20);
                    width: px2rem(20);
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 px2rem(4) px2rem(4) 0 rgba( 0, 0, 0, .15);
                    border: px2rem(1) solid #ddd;
                }
            }
            }
            
        }

    }

    .nav-wrapper{
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        display: flex;
        .nav-list{
            background: white;
            flex:1.5;
            height: 100%;
            width: 100%;
            position: relative;
            .nav{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: scroll;
            
                .nav-title{
                    height: px2rem(40);
                    width: 100%;
                    padding: 0 px2rem(15);
                    box-sizing: border-box;
                    .nav-inner-title{
                        width: 100%;
                        height: 100%;
                        @include center;
                        border-bottom: px2rem(1) solid #eee;
                        .title{
                        font-size: px2rem(20);
                        }
                    }
                    
                }
                .nav-content{
                    position: absolute;
                    width: 100%;
                   
                    .nav-item{
                        width: 100%;
                        height: px2rem(40);
                        padding: 0 px2rem(15);
                        box-sizing: border-box;
                        .nav-inner-item{
                            width: 100%;
                            height: 100%;
                            border-bottom: px2rem(1) solid #eee;
                            text-align: left;
                            .content{
                                font-size: px2rem(15);
                                
                            }
                    }
                    }
                    
                    
                }
                
            }
        }

        .nav-right{
            height: 100%;
            flex:1;
            background: rgba( 0, 0, 0, .1);
            }
    }

    

}

</style>