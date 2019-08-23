const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    member_list:[]
  },
  onLoad: function () { 
  
    app.setUserInfo('about');
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    if (app.globalData.uid) {

       wx.request({
         url: app.globalData.url2 + '?act=wx_get_wxmemberlist&uid=' + app.globalData.uid,
        method: 'POST',
        header: header,
        data: { 
          uid: app.globalData.uid,
        },
        success: function (res) {
          console.log(res);
          that.setData({
            member_list: res.data.member_list,
            })
        }
      });
      // wx.request({
      //   url: app.globalData.url2 + '?act=wx_get_userinfo&userid=' + app.globalData.userid,
      //   method: 'POST',
      //   header: header,
      //   data: {
      //     userid: app.globalData.userid,
      //   },
      //   success: function (res) {
      //     console.log(res);
           
      //   }
      // });

    }

  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
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
});
