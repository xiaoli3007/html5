//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.windowHeight = e.windowHeight;
      }
    })

    // 获取用户信息 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // console.log(res)
          // wx.setStorage({
          //   key: "usertoken",
          //   data: 'fc0a7ab52ca15ab5ae066e381cef904f6524e70c'
          // }) 



          // wx.getStorage({
          //   key: 'usertoken',
          //   success(res) {
          //      console.log(res.data)
          //     var t = res.data
          //     if (t){
          //       //通过token获取用户
          //       wx.request({
          //         url: that.globalData.url2 + '?act=session_get_userinfo',
          //         method: 'POST',
          //         header: {
          //           'content-type': 'application/x-www-form-urlencoded', // 默认值
          //           'X-Token': that.globalData.xtoken
          //         },
          //         data: {
          //           token: t,
          //         },
          //         success: function (res) {
                    
          //           if (res.data.code === 20000) {
          //             // console.log(res);
          //                that.globalData.uid = res.data.items.wx_id;
          //              that.globalData.userid = res.data.items.userid;
          //             that.globalData.username = res.data.items.username;
          //             that.globalData.avatar = res.data.items.avatar;
          //             that.globalData.realname = res.data.items.realname;
          //             // that.globalData.openid = res.data.items.routine_openid;
          //             // that.globalData.userInfo = res.data.items;
                      

          //           } else {
          //             // wx.showToast({
          //             //   title: res.data.message,
          //             //   icon: 'none',
          //             //   duration: 1500,
          //             // })
          //             wx.removeStorage({
          //               key: 'usertoken',
          //               success(res) {
          //                 console.log('删除过期token1') 
          //               }
          //             })
        
          //           }

          //         },
          //         complete(res) {

          //         }
          //       })
          //     } 
          //   },
          //   fail(failres) {
          //     console.log(failres)
          //   }
          // })



          // wx.getUserInfo({
          //   success: res => {
          //     console.log(res);
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // }) 
        }
      }
    }) 

  },
  globalData: {
    uid: null,
    userid: null, 
    username: null, 
    realname: null,
    avatar: null, 
    openid: '',
    spid: 0,
    xtoken: 'sdsadwerer',
    jiamikey: 'FAWG2ed3e19c4689',
    userInfo: null,
    // url: 'https://rmsp.youyoushizi.com/appapi/app_youyoushizi.php',
    // url2: 'https://rmsp.youyoushizi.com/appapi/app_youyoushizi_xcc.php',
    url: 'https://shizi.gfusoft.com/appapi/app_youyoushizi.php',
    url2: 'https://shizi.gfusoft.com/appapi/app_youyoushizi_xcc.php',
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
        wx.reLaunch({
          url: '/pages/index/index?p=' + page,
        })
      }, 1000)
    } 
  },
})