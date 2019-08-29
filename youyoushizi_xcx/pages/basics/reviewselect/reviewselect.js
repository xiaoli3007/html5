
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
  
  slider4change: function (e) {
    console.log(e.detail.value)

    this.setData({
      numsvalue: e.detail.value
    })
  },

})