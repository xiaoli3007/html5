Page({
  data: {
    PageCur: 'basics'
  },

  onLoad: function (option) {
    // console.log(option.p)
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
    
        wx.navigateTo({
          url: '/pages/basics/recommendduwu/recommendduwu?scan_code_g=' + res.result,
        })
  

      },
      fail(res) {
        wx.navigateTo({
          url: '/pages/index/index',
        })
      },
      complete(res) {
      }
    })


  },

})