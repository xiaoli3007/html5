const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    tabNav: ['月卡', '年卡', '季卡'],
    userid:0,
    name: '',
    username: '',
    price: 59,
    scrollLeft: 0,
    TabCur: 0,
  },
  onLoad: function (options) { 

    app.setUserInfo('about');
    console.log(options)
    let tuserid = options.userid ? options.userid : 0
    //let bd_name = options.bd_name ? options.bd_name : ''

    this.setData({
      userid: tuserid,
   //   bd_name: bd_name,
    })


  },

  /**
* tab切换函数
*/
  tabSelect: function (e) {

    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })

 
  },
  userchongzhi: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // const params = e.detail.value
    // return false
    var that = this;
    wx.request({
      url: app.globalData.url2 + '?act=wx_chongzhi',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        wx_id: app.globalData.uid,
        userid: that.data.userid,
        username: that.data.username,
        price: that.data.price,
      },
      success: function (res) {

        var jsConfig = res.data.pr_info;

        console.log(jsConfig);
        if (res.data.code == 20000) {
          wx.requestPayment({
            timeStamp: jsConfig.timeStamp,
            nonceStr: jsConfig.nonceStr,
            package: jsConfig.package,
            signType: jsConfig.signType,
            paySign: jsConfig.paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
              })
              // that.setData({
              //   now_money: parseFloat(that.data.now_money) + parseFloat(e.detail.value.number)
              // });

              // setTimeout(function () {
              //   wx.navigateTo({
              //     url: '/pages/main/main?now=' + that.data.now_money + '&uid=' + app.globalData.uid,
              //   })
              // }, 1200)
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'success',
                duration: 1000,
              })
            },
            complete: function (res) {
              if (res.errMsg == 'requestPayment:cancel') {
                wx.showToast({
                  title: '取消支付',
                  icon: 'none',
                  duration: 1000,
                })
              }
            },
          })
        } else {
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000,
          })
        }

      },
      complete(res) {

        that.setData({
          modalName: null
        })

      }
    });


  },
 
});
