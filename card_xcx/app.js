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
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //          // 已经授权，可以直接调用 getUserInfo 获取头像昵称

    //          wx.login({
    //           success (res) {
    //             if (res.code) {

    //               wx.getUserInfo({
    //                 success: function(res2) {
    //                   console.log(res2)
    //                   wx.request({
    //                     url: 'https://card.gfusoft.com/appapi/app_youyoushizi_card.php' + '?act=wx_login',
    //                     method: 'post',
    //                     // dataType  : 'json',  
    //                     header: {
    //                       // 'content-type': 'application/x-www-form-urlencoded', // 默认值
    //                       'X-Token': 'aa'
    //                     },   
    //                     data: {
    //                       codes: res.code,
    //                        jiami: res2,
    //                     }, 
    //                     success: function (res3) {
                           
    //                     }
    //                   })
        
    //                 }
    //               }) 
                 
    //             } else {
    //               console.log('登录失败！' + res.errMsg)
    //             }
    //           }
    //         })

          
    //     } 
    //   }
    // }) 

  }, 
  globalData: {
    uid: 29,
    userid: 6, 
    username: null, 
    realname: null,
    avatar: null, 
    isvip: 0, 
    openid: '', 
    spid: 0,
    xtoken: 'sdsadwerer',
    jiamikey: 'FAWG2ed3e19c4689',
    jiamiUrlkey: 'SDGSDGdsgsd43633',
    userInfo: null,
      //  url: 'https://rmsp.youyoushizi.com/appapi/app_youyoushizi.php',
      //  url2: 'https://rmsp.youyoushizi.com/appapi/app_youyoushizi_xcc.php',
    //  url: 'https://card.gfusoft.com/appapi/app_youyoushizi.php',
     url2: 'https://card.gfusoft.com/appapi/app_youyoushizi_card.php',
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
    if (that.globalData.uid == null) {
      // wx.showToast({
      //   title: '获取用户信息失败！',
      //   icon: 'none',
      //   duration: 1500,
      // })
      // setTimeout(function () {
      //   wx.reLaunch({
      //     url: '/pages/index/index?p=' + page,
      //   })
      // }, 1000)
    } 
  },
})