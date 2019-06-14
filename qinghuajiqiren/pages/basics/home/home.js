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
    InputBottom: 0,
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
    }]


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
        content: this.data.msgdata,
        time: util.timestampToString(),
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
              content: res.data.data.text,
              time: util.timestampToString(),
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
      // console.log(e.detail.height)
      this.setData({
        InputBottom: e.detail.height
      })
    },
    InputBlur(e) {
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
      wx.navigateTo({
        url: '/pages/basics/atlas/atlas',
      })
    }

  }

})