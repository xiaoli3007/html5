const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    // tabNav: ['一年级', '二年级', '三年级'],
    jiaocaiList: [],
    loadModal: true
  },
  onLoad(options) {

    console.log(options)
    let that = this;
    //加载列表 
    wx.request({
      url: app.globalData.url2 + '?act=jiaocai_sub_lession', 
      data: {
        bookid: options.ebookid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      }, 
      success(res) {

        console.log(res.data)
        that.setData({

          jiaocaiList: res.data.items
        })

      },
      complete(res) {
        that.setData({

          loadModal: false
        })
        //console.log(res.statusCode)
        if (res.statusCode == 500) {

        } else {

        }

      }
    })


  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})