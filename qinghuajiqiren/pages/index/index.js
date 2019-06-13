const app = getApp()
Page({
  data: {
    PageCur: 'basics',
    footheight: 10
  },

  onLoad: function (options) {
    var that= this 
    const query = wx.createSelectorQuery()
    query.select('#tabbar').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      
      app.globalData.foottabbar = res[0]
      // console.log(app.globalData.foottabbar.height)

      that.setData({
        footheight: app.globalData.foottabbar.height
      })

    })
  },

 

  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
 
})