const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    loadModal: false,
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    userInfo: {},
    hasUserInfo: false,
    username:null,
    avatar:null,
    realname: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    vip:0
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

      // console.log(111)
      if (app.globalData.username) {
        this.setData({
          username: app.globalData.username,
        })
      }

      if (app.globalData.avatar) {
        this.setData({
          avatar: app.globalData.avatar,
        })
      }
       console.log(app.globalData.isvip)
      if (app.globalData.realname) {
        this.setData({
          realname: app.globalData.realname,
          vip:app.globalData.isvip
        })
      }

    },
    hide: function () {
      // console.log(222)
    },
    resize: function () {
      // console.log(333)
    },
  },
  lifetimes: {
    attached: function () {
      if (app.globalData.username){
         this.setData({
           username: app.globalData.username,
        })
      }

      if (app.globalData.avatar) {
        this.setData({
          avatar: app.globalData.avatar,
        })
      }
      console.log(app.globalData.isvip)
      if (app.globalData.realname) {
        this.setData({
          realname: app.globalData.realname,
          vip:app.globalData.isvip
        })
      }
      // console.log(app.globalData.realname)
     
     

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
 
    //获取用户信息并且授权
    getUserInfo: function (e) {
      var userInfo = e.detail.userInfo;
      // userInfo.spid = app.globalData.spid;
      this.setData({
        loadModal: true   
      })        
      var that = this         
      wx.login({   
        success: function (res3) { 
          if (res3.code) {
            userInfo.code = res3.code;    
  
            wx.getUserInfo({
                      success: function(res2) {
                        console.log(res2)
                        wx.request({
                          url: app.globalData.url2  + '?act=wx_login',
                          method: 'post',
                          // dataType  : 'json',  
                          header: {
                            // 'content-type': 'application/x-www-form-urlencoded', // 默认值
                            'X-Token': app.globalData.xtoken
                          },    
                          data: {
                            info: userInfo,
                              jiami: res2,
                          }, 
                          success: function (res) {

                            app.globalData.userid = res.data.items.userid;
                            app.globalData.openid = res.data.items.routine_openid;
                            app.globalData.uid = res.data.items.uid;
                            app.globalData.userInfo = res.data.items;
                            app.globalData.username = res.data.items.username;
                            app.globalData.avatar = res.data.items.avatar;
                            app.globalData.realname = res.data.items.realname;
                            app.globalData.isvip = parseInt(res.data.items.vip)
                            console.log(res);
                            that.setData({
                              userInfo: res.data.items,
                              username: res.data.items.username,
                              realname: res.data.items.realname,
                              avatar: res.data.items.avatar,
                              vip: parseInt(res.data.items.vip),
                              loadModal: false,
                            })
                            console.log(res.data.items.wx_token)
                            if (res.data.items.wx_token){
                              console.log(res.data.items.wx_token)
                              wx.setStorage({
                                key: "usertoken",
                                data: res.data.items.wx_token 
                              })
                            }  
                              
                          }
                        })
          
                      }
                    }) 
            // wx.request({
            //   url: app.globalData.url2 + '?act=wx_login',
            //   method: 'post',
            //   // dataType  : 'json',  
            //   header: {
            //     // 'content-type': 'application/x-www-form-urlencoded', // 默认值
            //     'X-Token': app.globalData.xtoken
            //   },  
            //   data: {
            //     info: userInfo,
            //   }, 
            //   success: function (res) {
            //     app.globalData.userid = res.data.items.userid;
            //     app.globalData.openid = res.data.items.routine_openid;
            //     app.globalData.uid = res.data.items.uid;
            //     app.globalData.userInfo = res.data.items;
            //     app.globalData.username = res.data.items.username;
            //     app.globalData.avatar = res.data.items.avatar;
            //     app.globalData.realname = res.data.items.realname;
            //     app.globalData.isvip = parseInt(res.data.items.vip)
            //     console.log(res);
            //     that.setData({
            //       userInfo: res.data.items,
            //       username: res.data.items.username,
            //       realname: res.data.items.realname,
            //       avatar: res.data.items.avatar,
            //       vip: parseInt(res.data.items.vip),
            //       loadModal: false,
            //     })
            //     console.log(res.data.items.wx_token)
            //     if (res.data.items.wx_token){
            //       console.log(res.data.items.wx_token)
            //       wx.setStorage({
            //         key: "usertoken",
            //         data: res.data.items.wx_token 
            //       })
            //     }  
                  
            //   }
            // })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    gotodeteil(e) {

   

      wx.navigateTo({
        url: '/pages/about/account/account',
      })

    },

  } 
})