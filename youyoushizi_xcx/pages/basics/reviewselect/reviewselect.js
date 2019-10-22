const app = getApp()

Page({
  onReady(e) {
    
  },
  data: {
    
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    numsvalue:25,
    review_num: 0
  },

  onLoad: function () {
    app.setUserInfo('about');

    var that = this;

    // that.setData({
    //   isLoad: true,
    // })

    wx.request({
      url: app.globalData.url + '?act=review_info', //
      data: {
        userid: app.globalData.userid ? app.globalData.userid : 0
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)

        that.setData({
          review_num: parseInt(res.data.review_num),
        })
 
      },
      complete(res) {

        // that.setData({
        //   isLoad: false,
        // })

      }
    })

  },
  
  slider4change: function (e) {
    console.log(e.detail.value)

    this.setData({
      numsvalue: e.detail.value
    })
  }, 
  goreview(e) {

    // let taskid = e.currentTarget.dataset.taskid
    // var that = this
    // console.log(typeof  this.data.review_num)
    if(this.data.review_num>0){
      wx.navigateTo({
        url: '/pages/basics/review/review?nums=' + this.data.numsvalue,
      })
    }else{

      wx.showToast({
        title: '没有要复习的数据！',
        icon: 'none',
        duration: 1500,
      })

    }
   

  },

})