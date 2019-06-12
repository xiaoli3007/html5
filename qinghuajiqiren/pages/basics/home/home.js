const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    InputBottom: 50,
    msgdata: '',
    toView: '',
    scrollTop: 100,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msgList: [{
      speaker: 'server',
        contentType: 'text',
      content: '您好，我是清华大学图书馆智能机器人小图，我可以陪你聊天，还有一些特殊功能：'
      }
    ]
    

  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
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
  },
  methods: {
    bindKeyInput: function(e) {
      this.setData({
        msgdata: e.detail.value
      })
    },
    sendmsg: function(e) {
      // console.log(e)
      console.log(this.data.msgdata) 
      var tempdatamsglist = this.data.msgList
      tempdatamsglist.push({
        speaker: 'self',
        contentType: 'text',
        content: this.data.msgdata
      }) 

      

      this.setData({
        msgList: tempdatamsglist,
        toView: 'msg-' + (this.data.msgList.length - 1),
      })

      var that = this
      wx.request({
        url: app.globalData.url + '/Response', //仅为示例，并非真实的接口地址
        data: {
          text: this.data.msgdata,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          if (res.data.message == 'success') {
            console.log(res.data.data.text)

            tempdatamsglist.push({
              speaker: 'server',
              contentType: 'text',
              content: res.data.data.text
            })
            that.setData({
              msgList: tempdatamsglist,
              msgdata: '',
              toView: 'msg-' + (tempdatamsglist.length - 1),
            })

          }
        }
      })

    },
    InputFocus(e) {
      console.log(e.detail.height)
      this.setData({
        // InputBottom: e.detail.height
      })
    },
    InputBlur(e) {
      this.setData({
        InputBottom: 50
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
    }

  }

})