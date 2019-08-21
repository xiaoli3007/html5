const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  lifetimes: {
    attached: function () {

      var header = {
        'content-type': 'application/x-www-form-urlencoded',
      };
      var that = this;
      // wx.request({
      //   url: app.globalData.url2 + '?act=wx_get_userinfo&userid=' + app.globalData.userid,
      //   method: 'POST',
      //   header: header,
      //   success: function (res) {
      //     that.setData({
      //       userinfo: res.data.data,
      //     })
      //   }
      // });
      // 在组件实例进入页面节点树时执行
      // if (app.globalData.userInfo) {
      //   this.setData({
      //     userInfo: app.globalData.userInfo,
      //     hasUserInfo: true
      //   })
      // } else if (this.data.canIUse) {
      //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //   // 所以此处加入 callback 以防止这种情况
      //   app.userInfoReadyCallback = res => {
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true
      //     })
      //   }
      // } else {
      //   // 在没有 open-type=getUserInfo 版本的兼容处理
      //   wx.getUserInfo({
      //     success: res => {
      //       app.globalData.userInfo = res.userInfo
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //     }
      //   })
      // }

      // console.log(this.data.userInfo);
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    // getUserInfo: function (e) {
    //   console.log(e)
    //   app.globalData.userInfo = e.detail.userInfo
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true
    //   })
    // },
    //获取用户信息并且授权
    getUserInfo: function (e) {
      var userInfo = e.detail.userInfo;
      // userInfo.spid = app.globalData.spid;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      }) 
      wx.login({
        success: function (res) {
          if (res.code) {
            userInfo.code = res.code;
            wx.request({
              url: app.globalData.url2 + '?act=wx_login',
              method: 'post',
              // dataType  : 'json',  
              header: {
                // 'content-type': 'application/x-www-form-urlencoded', // 默认值
                'X-Token': app.globalData.xtoken
              },  
              data: {
                info: userInfo,
              }, 
              success: function (res) {
                 app.globalData.userid = res.data.items.userid;
                 app.globalData.openid = res.data.items.routine_openid;
                console.log(res);
                  
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },

  } 
})