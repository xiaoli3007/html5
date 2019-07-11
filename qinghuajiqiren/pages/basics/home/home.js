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
    person_name:'李白',
    person_desc:'李白 (701-762), 男, 文人, [為官者：文], 工於文, 書法家, 詩人, 籍贯：唐朝-河南道-兖州-任城, 行第：李十二, 规范名：李白, 字：太白, 曾任：翰林供奉(742), 王东巡幕中(759), 詩作為Y所稱道：陆游, 九世祖;太高曾祖：李皓',
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
      name: '陆游',
      relationType: '詩作為Y所稱道',
      uri: 'http://data.library.sh.cn/entity/person/hz8kvfmism0v0wz8',  
    }, {
        name: '李皓',
        relationType: '九世祖;太高曾祖',
        uri: 'http://data.library.sh.cn/entity/person/2oah45t4ulk6sgac',
      }],
    canvasList:[]

 
  },
  lifetimes: {
    attached: function() {

       
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