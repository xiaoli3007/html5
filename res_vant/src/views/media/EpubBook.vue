<template>
  <div class="ebook">
        <title-bar :catid="catid"  :news_id="news_id" :isTitleAndMenuShow="isTitleAndMenuShow"/>
        <div class="read-wrapper">
            <div id='read'></div>
            <div class="mask" v-show="isShowMask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="showTitleAndMenu"></div>
                <div class="right" @click="nextPage"></div>
        </div>
        <menu-bar :isTitleAndMenuShow="isTitleAndMenuShow"
        :fontSizeList="fontSizeList"
        :defaulFontSize="defaulFontSize"
        @setFontSize="setFontSize"
        :themesList="themesList"
        :defaulTheme="defaulTheme"
        @setTheme="setTheme"
        :bookAvailable="bookAvailable"
        @onProgressChange='onProgressChange'
        @showNav='showNav'
        :isShowNav='isShowNav'
        :navigationList='navigationList'
        @closeNav='closeNav'
        @jumpTo='jumpTo'
        :progress='currentprogress'
        @onProgressInput='onProgressInput'
        ref="menuBar"
        />
      </div>
  </div>
</template>

<script>
    import Epub from 'epubjs'

    import TitleBar from '@/components/Epub/TitleBar'
    import MenuBar from '@/components/Epub/MenuBar'

    // const DOWNLOAD_URL = '/static/三体.epub'
    const DOWNLOAD_URL = 'http://192.168.1.195:80/course_def/res_url/RDovd25tcC9tZWRpYS9pc2FkbWluL21hc3Rlci80NC8yMDIwLzA4LTI5L+WPkeaWr+iSguiKrC8=@/wanmei.epub'
export default {
    name:'EpubBook',
    components:{
        TitleBar,
        MenuBar
    },
    data() {
        return{
             isTitleAndMenuShow:false,
             fontSizeList:[
                 {fontSize:12},
                 {fontSize:14},
                 {fontSize:16},
                 {fontSize:18},
                 {fontSize:20},
                 {fontSize:22},
                 {fontSize:24},
             ],
             defaulFontSize:16,
             themesList:[
                {
                    name:'default',
                    desc:'默认',
                    style:{
                        body:{
                            'color':'#000' ,'background':'#fff'
                        }

                        
                    }
                },
                {
                    name:'eye',
                    desc:'护眼',
                    style:{
                        body:{
                            'color':'#000' ,'background':'#ceeaba'
                        }

                        
                    }
                },
                {
                    name:'night',
                    desc:'黑夜',
                    style:{
                        body:{
                            'color':'#fff' ,'background':'#000'
                        }

                        
                    }
                },
                {
                    name:'gold',
                    desc:'淡黄',
                    style:{
                        body:{
                            'color':'#000' ,'background':'rgb(241,236,226)'
                        }

                        
                    }
                }
             ],
             defaulTheme:0,
             //图书是否是可用状态
             bookAvailable:false,
             isShowNav:false,
             navigationList:[],
             isShowMask:true,
             currentprogress:'0',
			 epub_url : '',
             catid:0,
             news_id:0,
        }
    },
	created() {
		this.catid = this.$route.query.catid
		this.news_id = this.$route.query.news_id
		this.epub_url = this.$route.query.playurl 
	},
    mounted(){
        this.showEpub()
    },

    methods :{
        //电子书的解析和渲染
        showEpub(){
            //生产Book
            this.book = new Epub(this.epub_url)
            //生成Rendition 第一个参数为dom id ，渲染的结果会挂载这个元素上
            this.rendition=this.book.renderTo('read',{
                width:window.innerWidth,
                height:window.innerHeight
            })
            //通过Renditon.display渲染电子书
            this.rendition.display()
            //获取theme对象
            this.themes = this.rendition.themes
            //设置默认字体
            this.setFontSize(this.defaulFontSize)
            //注册主题
            //this.themes.register(name,styles)
            //this.themes.select(name)
            this.registerTheme()
            this.setTheme(this.defaulTheme)
            //Location对象，默认不生产
            //通过epub钩子函数生成Location定位符
            this.book.ready.then(() =>{
                this.navigationList = this.book.navigation.toc
                // console.log(this.navigationList);
                return this.book.locations.generate()
            }).then(() =>{
                //通过this.book.locations.generate()生成定位符
                this.locations = this.book.locations
                // console.log(this.locations);
                // this.onProgressChange(20)
                this.bookAvailable = true
            })
        },
        currentLocation(){
            const currentLocation = this.rendition.currentLocation()
            const currentprogress = this.book.locations.percentageFromCfi(currentLocation.start.cfi)
            this.currentprogress = (currentprogress * 100).toFixed(1)
        },
        prevPage(){
            this.currentLocation()
            this.rendition.prev()
        },
        nextPage(){
            this.currentLocation()
            this.rendition.next()
        },

        showTitleAndMenu(){
            this.isTitleAndMenuShow = !this.isTitleAndMenuShow
            if(this.isTitleAndMenuShow == false){
                this.$refs.menuBar.hideSetting()
            }
        },
        setFontSize(fontSize){
            this.defaulFontSize = fontSize
            if(this.themes){
                this.themes.fontSize(fontSize + 'px') 
            }
        },
        registerTheme(){
            this.themesList.forEach(theme =>{
                this.themes.register(theme.name,theme.style)
            })
        },
        setTheme(index){
            this.themes.select(this.themesList[index].name)
            this.defaulTheme = index
        },
        //0-100的数值 cfiFromPercentage方法把传入的百分比转化为定位符中的位置
        onProgressChange(progress){
            console.log(progress);
            this.currentprogress = progress
            const percentage = progress / 100
            const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
            //获取当前百分比
            
            //console.log(location);
            //输出epubcfi(/6/12[id165000052814]!/4,/104/1:10,/110/1:34)
            //然后通过dispaly(可以返回具体位置)
            this.rendition.display(location)
        },
        onProgressInput(progress){
            this.currentprogress = progress
        },
        //根据链接跳转到指定位置
        hideTitleAndMenu(){
            //隐藏标题栏和菜单栏
            this.isTitleAndMenuShow=false
            //隐藏菜单栏弹出的设置栏
            this.$refs.menuBar.hideSetting()
            //隐藏目录??

        },
        jumpTo(href){
            this.currentLocation()
            this.rendition.display(href)
            this.closeNav()
            // this.hideTitleAndMenu()
        },
        showNav(){
            this.isShowMask =false
            this.hideTitleAndMenu()
            this.isShowNav = true
        },
        closeNav(){
            this.isShowNav = false
            this.isShowMask = true
        }

    }
}


</script>

<style scoped lang='scss'>
@import '@/assets/epub/css/global.scss';
.ebook{
    position: relative;
    .read-wrapper{
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            width: 100%;
            height: 100%;
            z-index: 100;
            .left{
                flex: 0 0 px2rem(100);
            }
            .center{
                flex: 1;
                
            }
            .right{
                flex: 0 0 px2rem(100);

            }
        }
    }
}
</style>