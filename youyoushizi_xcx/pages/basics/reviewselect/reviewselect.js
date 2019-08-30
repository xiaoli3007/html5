const app = getApp()

Page({
  onReady(e) {
    
  },
  data: {
    
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    numsvalue:25
  },

  onLoad: function () {
    app.setUserInfo('about');
  },
  
  slider4change: function (e) {
    console.log(e.detail.value)

    this.setData({
      numsvalue: e.detail.value
    })
  },

})