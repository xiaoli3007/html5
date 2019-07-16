const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    tabNav: ['一年级', '二年级', '三年级'],
    jiaocaiList: [{
      id: '1',
      name: '第一课'
    }, {
      id: '2',
      name: '第二课'
    }, {
      id: '3',
      name: '第三课'
    }, {
      id: '4',
      name: '第四课'
    }]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})