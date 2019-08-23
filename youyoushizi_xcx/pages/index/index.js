Page({
  data: {
    PageCur: 'basics'
  },

  onLoad: function (option) {
    console.log(option.p)
    if (option.p){
      this.setData({
        PageCur: option.p
      })
    }
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '-',
      imageUrl: '/images/logo.png',
      path: '/pages/index/index'
    }
  },
})