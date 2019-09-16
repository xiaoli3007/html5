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
  scanCode() {
    // this.setData({ msg: 'Hello World' })
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.showToast({
          title: '结果:' + res.result,
          icon: 'none',
          duration: 1500,
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/recommendduwu/recommendduwu',
          })
        }, 1000)

      },
      fail(res) {
        console.log(res)
        wx.navigateTo({
          url: '/pages/index/index',
        })
      },
      complete(res) {
        console.log(res)
      }
    })
  },

})