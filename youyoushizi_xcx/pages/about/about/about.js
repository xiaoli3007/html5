const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  onLoad: function () { 

    // wx.getStorage({
    //   key: 'usertoken',
    //   success(res) {
    //     console.log(res.data)
    //     var t = res.data
    //     if (t) {
    //       //通过token获取用户
    //       wx.request({
    //         url: app.globalData.url2 + '?act=session_get_userinfo',
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/x-www-form-urlencoded', // 默认值
    //           'X-Token': app.globalData.xtoken
    //         },
    //         data: {
    //           token: t,
    //         },
    //         success: function (res) {
    //           console.log(res);

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

  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
