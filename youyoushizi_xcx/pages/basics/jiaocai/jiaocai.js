const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom, 
    MainCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    tabNav: ['一年级', '二年级', '三年级', '三年级'],
    jiaocaiList: [],
    loadModal: true
  }, 
  onLoad() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    //加载教材列表
    wx.request({
      url: app.globalData.url2 + '?act=jiaocai_cat_list', //教材
      data: {
        pagesize: 10
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

         console.log(res.data)
        
        let temptab = []
        for (var i = 0; i < res.data.items.length;i++){
         
          temptab.push(res.data.items[i].name)
 
        }

        that.setData({
          tabNav: temptab,
          jiaocaiList: res.data.items
        })

      },
      complete(res) {
        that.setData({

          loadModal: false
        })

        wx.hideLoading()

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