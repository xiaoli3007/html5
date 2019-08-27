const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    duwuList: [],
    loadModal: true,
    page: 1,
    isLoad: true,
    pagesize: 20,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
  },
  onLoad() {
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)
        that.setData({

          duwuList: res.data.items
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    console.log(11)
    if (this.data.isend) { //到底了不在执行
      return
    }
    var that = this;
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    this.setData({
      isLoad: false
    })
    // 页数+1
    this.setData({
      page: this.data.page + 1
    })
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function(res) {
        if (res.data.code === 20000) {

          console.log(res.data.items.length)
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          var moment_list = that.data.duwuList;
          const oldData = that.data.duwuList;
          that.setData({
            duwuList: oldData.concat(res.data.items)
          })
          // 隐藏加载框
          // wx.hideLoading();
        } else {


        }
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  /**
   * 搜索函数
   */
  search_keyword: function() {
    console.log(this.data.keywords)
    var that = this;
    this.setData({
      isLoad: false,
      isend: false,
    })
    // 页数+1
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function(res) {
        if (res.data.code === 20000) {
          console.log(res.data.items.length)
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          that.setData({
            duwuList: res.data.items
          })
        }else{
          that.setData({
            duwuList: [],
            isLoad: true,
          })
        }
      }
    })
  }

})