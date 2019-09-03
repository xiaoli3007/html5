//app.js
App({
  onLaunch: function () {
    
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res.code);
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       }) 
    //     }
    //   }
    // }) 

  },
  globalData: {
    uid: 29,
    userid: 6, 
    openid: '',
    spid: 0,
    xtoken: 'sdsadwerer',
    userInfo: null,
    url: 'https://rmsp.youyoushizi.com/appapi/app_youyoushizi.php',
    url2: 'https://rmsp.youyoushizi.com/appapi/app_youyoushizi_xcc.php',
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    }
    ]
  },
  setUserInfo: function ( page = 'basics') {
    var that = this;
    if (that.globalData.uid == null) {//是否存在用户信息，如果不存在跳转到首页
      wx.showToast({
        title: '获取用户信息失败！',
        icon: 'none',
        duration: 1500,
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/index/index?p=' + page,
        })
      }, 1000)
    }
  },
})