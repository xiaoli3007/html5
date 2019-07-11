const app = getApp()
var util = require('../../../utils/util.js')
Component({

  
  properties: {
    aaa: { // 属性名
      type: Number,
      value: 0
    }
  },

  options: {
    addGlobalClass: true,
  },
  data: {
    loading_top: false,
    InputBottom: 0,
    person_name:'白居易',
    person_desc: '白居易 (772-846), 男, 文人, 僧人, [為官者：文], 工於文, 書法家, 詩人, 籍贯：唐朝-河东道-太原-太谷, 字：乐天, 行第：白二十二, 规范名：白居易, 諡號：文, 未詳：醉吟先生, 未詳：白文公, 未詳：白傅, 室名、別號：香山居士, 曾任：府戸曹参军(0), 府尹(0), 翰林学士(807), 翰林学士(0), 翰林学士(0), 秘书监(827), 秘书省校书郎(803), 司门员外郎(820), 太子宾客(0), 太子宾客分司东都(829), 太子少傅(0), 太子左庶子分司东都(824), 太子左赞善大夫(0), 县尉(0), 刑部尚书(0), 刑部尚书(0), 刑部侍郎(930), 右仆射(0), 知制诰(820), 中书舍人(821), 州刺史(0), 州刺史(822), 州刺史(0), 州刺史(835), 州刺史(830), 州刺史(825), 州刺史(822), 州刺史(818), 主客郎中(0), 左拾遗(0), 司马(0), 為Y作墓誌銘：郑太郡, 文風為Y所效法：李宗易, 女兒：白金銮, 為Y作墓誌銘：皇甫镛, 相唱和：关盼盼, 姻親：皇甫曙, 子：白景受, 祖父：白锽, 父：白季庚, 父：白季庚, 墓誌銘由Y所作：李商隐, 從兄弟;堂兄弟：白敏中, 弟：白行简, 為Y作墓誌銘：元稹"',
    Inputdisabled: false,
    useheight: 0,
    scrollheight: 300,
    msgdata: '',
    toView: '',
    scrollTop: 100,
    userInfo: {},
    hasUserInfo: false,
    msgList: [{
      speaker: 'server',
      contentType: 'text',
      content: '您好，我是清华大学图书馆智能机器人小图，我可以陪你聊天，还有一些特殊功能',
      time: util.timestampToString(),
    }],
    relList: [{
      "name": "郑太郡",
      "relationType": "為Y作墓誌銘",
      "uri": "http://data.library.sh.cn/entity/person/yq66vpyttor3aktl"
    },
      {
        "name": "李宗易",
        "relationType": "文風為Y所效法",
        "uri": "http://data.library.sh.cn/entity/person/1eo922b4k2avwyqc"
      },
      {
        "name": "白金銮",
        "relationType": "女兒",
        "uri": "http://data.library.sh.cn/entity/person/7iua3blpb7u584mb"
      },
      {
        "name": "皇甫镛",
        "relationType": "為Y作墓誌銘",
        "uri": "http://data.library.sh.cn/entity/person/7j9cy2ne9yuq7k14"
      },
      {
        "name": "关盼盼",
        "relationType": "相唱和",
        "uri": "http://data.library.sh.cn/entity/person/r393vc52fbc9vrmg"
      }],
    canvasList: [{
      name: '白居易', rel: [{
        "name": "郑太郡",
        "relationType": "為Y作墓誌銘",
        "uri": "http://data.library.sh.cn/entity/person/yq66vpyttor3aktl"
      },
        {
          "name": "李宗易",
          "relationType": "文風為Y所效法",
          "uri": "http://data.library.sh.cn/entity/person/1eo922b4k2avwyqc"
        },
        {
          "name": "白金銮",
          "relationType": "女兒",
          "uri": "http://data.library.sh.cn/entity/person/7iua3blpb7u584mb"
        },
        {
          "name": "皇甫镛",
          "relationType": "為Y作墓誌銘",
          "uri": "http://data.library.sh.cn/entity/person/7j9cy2ne9yuq7k14"
        },
        {
          "name": "关盼盼",
          "relationType": "相唱和",
          "uri": "http://data.library.sh.cn/entity/person/r393vc52fbc9vrmg"
        }]}]

 
  },
  lifetimes: {
    attached: function() {

      //wx.clearStorage()
      // 在组件实例进入页面节点树时执行
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }

      // console.log(this.data.userInfo);
      //滚动到底部消息
      this.setData({
        toView: 'msg-' + (this.data.msgList.length - 1),
      })

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready: function () {
      // 在组件实例被从页面节点树移除时执行
      const query = wx.createSelectorQuery().in(this)
      var that = this 
      //useheight
     

      query.select('#top_main').boundingClientRect(function (res) {
        // 这个组件内 #the-id 节点的上边界坐标
        // console.log(res.height)
        that.setData({
          useheight:  res.height
        })
      }).exec()

      query.select('#foot').boundingClientRect(function (res) {
        console.log(app.globalData.windowHeight)  // 这个组件内 #the-id 节点的上边界坐标

        that.setData({
          scrollheight: app.globalData.windowHeight-(that.data.useheight + res.height)-15
        })
        console.log(that.data.scrollheight) 
      }).exec()

      // console.log(111) 

    },
  },
  methods: {
    bindKeyInput: function(e) {
      this.setData({
        msgdata: e.detail.value
      })
    },
    sendmsg: function(e) {
      // console.log(e)
      console.log(this.data.canvasList)
      if (this.data.msgdata==''){

        return false;

      }
      var tempdatamsglist = this.data.msgList

      var tempmsgdata = this.data.msgdata

      var temp_canvars_list = this.data.canvasList

      this.setData({
        msgdata: '',
        loading_top: true,
      })

      tempdatamsglist.push({
        speaker: 'self',
        contentType: 'text',
        content: tempmsgdata,
        time: util.timestampToString(),
      })

      this.setData({
        msgList: tempdatamsglist,
        toView: 'msg-' + (this.data.msgList.length - 1),
      })

      this.setData({
        Inputdisabled: !this.data.Inputdisabled
      })
      var that = this
      wx.request({
        url: app.globalData.url + '/Response', //仅为示例，并非真实的接口地址
        data: {
          text: tempmsgdata,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          if (res.data.message == 'success') {
            // console.log(res.data)
          //  console.log(res.data.data.person[0])

            var tempdatapersondesc = ''
            var tempdatapersonname = ''
            var tempdatapersonrel = []
            if (res.data.data.person[0] ){
               tempdatapersondesc = res.data.data.person[0].desc
               tempdatapersonname = res.data.data.person[0].name
               tempdatapersonrel = res.data.data.person[0].rel

                
                temp_canvars_list.push({
                  name: tempdatapersonname,
                  rel: tempdatapersonrel,
                 })
            } 
            console.log(temp_canvars_list)
            tempdatamsglist.push({
              speaker: 'server',
              contentType: 'text',
              content: res.data.data.text,
              time: util.timestampToString(),
            })
            that.setData({
              msgList: tempdatamsglist,
              toView: 'msg-' + (tempdatamsglist.length - 1),
              person_desc: tempdatapersondesc,
              person_name: tempdatapersonname,
              relList: tempdatapersonrel,
              canvasList: temp_canvars_list,
            })
   
          }
        } ,
        complete(res) {
          console.log(res.statusCode)
          if (res.statusCode==500){
            that.setData({
              
              person_desc: '',
              person_name: '',
              relList: [],
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
            })

          }else{
            
            that.setData({
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
            })

          }
         
          
        }
      })

    },
    btnsendmsg: function (e) {
      console.log(e.currentTarget.dataset.val)
      console.log(this.data.msgdata)
      if (e.currentTarget.dataset.val == '') {
        return false;
      }
      this.setData({
        msgdata: e.currentTarget.dataset.val,
      })
      if (this.data.msgdata == '') {
        return false;
      }
      var tempdatamsglist = this.data.msgList
      var tempmsgdata = this.data.msgdata

      var temp_canvars_list = this.data.canvasList

      this.setData({
        msgdata: '',
        loading_top: true,
      })
      tempdatamsglist.push({
        speaker: 'self',
        contentType: 'text',
        content: tempmsgdata,
        time: util.timestampToString(),
      })

      this.setData({
        msgList: tempdatamsglist,
        toView: 'msg-' + (this.data.msgList.length - 1),
      })

      this.setData({
        Inputdisabled: !this.data.Inputdisabled
      })
      var that = this
      wx.request({
        url: app.globalData.url + '/Response', //仅为示例，并非真实的接口地址
        data: {
          text: tempmsgdata,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          if (res.data.message == 'success') {
            console.log(res.data)
            
            var tempdatapersondesc = ''
            var tempdatapersonname = ''
            var tempdatapersonrel = []
            if (res.data.data.person[0]) {
              tempdatapersondesc = res.data.data.person[0].desc
              tempdatapersonname = res.data.data.person[0].name
              tempdatapersonrel = res.data.data.person[0].rel
              temp_canvars_list.push({
                name: tempdatapersonname,
                rel: tempdatapersonrel,
              })
            } 

            tempdatamsglist.push({
              speaker: 'server',
              contentType: 'text',
              content: res.data.data.text,
              time: util.timestampToString(),
            })
            that.setData({
              msgList: tempdatamsglist,
              toView: 'msg-' + (tempdatamsglist.length - 1),
              person_desc: tempdatapersondesc,
              person_name: tempdatapersonname,
              relList: tempdatapersonrel,
              canvasList: temp_canvars_list,
            })

          }
        },
        complete(res) {

          if (res.statusCode == 500) {
            that.setData({

              person_desc: '',
              person_name: '',
              relList: [],
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
            })

          } else {

            that.setData({
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
            })

          }
          
        }
      })

    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    InputFocus(e) {
      // console.log(e.detail.height)
      this.setData({
        InputBottom: e.detail.height
      })
    },
    InputBlur(e) {
      // console.log(222)
      this.setData({
        InputBottom: 0
      })
    },
    upper: function(e) {
      // console.log(e)
    },
    lower: function(e) {
      // console.log(e)
    },
    scroll: function(e) {
      // console.log(e)
    },
    //  tap (e) {
    //   for (var i = 0; i < order.length; ++i) {
    //     if (order[i] === this.data.toView) {
    //       this.setData({
    //         toView: order[i + 1]
    //       })
    //       break
    //     }
    //   }
    // },
    tapMove(e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },


    gotoPage1: function (e) {

      
      var tmp_set_canvasList = []

      if (this.data.canvasList.length>0){
        if (this.data.canvasList.length > 2) {

          tmp_set_canvasList = this.data.canvasList.slice(-3, this.data.canvasList.length)
        }else{
          tmp_set_canvasList = this.data.canvasList
        }
        console.log(tmp_set_canvasList)
        wx.setStorage({
          key: "canvasList",
          data: tmp_set_canvasList
        })
      }
 
      wx.navigateTo({
        url: '/pages/basics/atlas/atlas',
      })
    }

  }

})