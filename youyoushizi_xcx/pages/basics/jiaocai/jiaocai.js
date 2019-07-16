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
      image: 'red',
      url: 'jiaocai',
      name: '一年级语文上册（人教版）'
    }, {
      id: '2',
      image: 'orange',
      url: 'duwu',
      name: '一年级语文上册（人教版）'
    }, {
      id: '3',
      image: 'orange',
      url: 'duwu',
      name: '一年级语文上册（人教版）'
    }, {
      id: '4',
      image: 'orange',
      url: 'duwu',
      name: '一年级语文上册（人教版）'
    }]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})