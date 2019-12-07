const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    bd_userid:0,
    bd_name: '',
    bd_p_name: '',
  },
  onLoad: function (options) { 

    app.setUserInfo('about');
    console.log(options)
    let bd_userid = options.bd_userid ? options.bd_userid : 0
    let bd_name = options.bd_name ? options.bd_name : ''
    let bd_p_name = options.bd_p_name ? options.bd_p_name : ''

    this.setData({
      bd_userid: bd_userid,
      bd_name: bd_name,
      bd_p_name: bd_p_name,
    })


  },
  bangding_user(e) {
    // console.log(e)

    var that = this
  
    that.setData({

      loadModal: true
    })
    //删除用户
    wx.request({
      url: app.globalData.url2 + '?act=wx_member_relationship',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        userid: that.data.bd_userid,
        wx_id: app.globalData.uid,
        name: that.data.bd_p_name,
      },
      success: function (res) {
        console.log(res);

        if (res.data.code === 20000) {
          
          wx.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: 1500,
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/about/account/account'
            })
          }, 300)

        } else {
          
          wx.showToast({
            title:  res.data.message,
            icon: 'none',
            duration: 1500,
          })

          wx.navigateTo({
            url: '/pages/about/account/account'
          })
        }

      },
      complete(res) {
        that.setData({

          loadModal: false,

        })

      }
    });

  },
 
});
