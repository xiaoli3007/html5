

const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    collection_list: [],
    loadModal: true,
    page: 1,
    isLoad: true,
    pagesize: 15,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
  },
  onLoad: function (options) {

    console.log(1111)

    var that = this;

      wx.request({
        url: app.globalData.url + '?act=author_list' ,
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          pagesize: that.data.pagesize,
        },
        success: function (res) {
          
          that.setData({
            collection_list: res.data.items,
          })

          console.log(that.data.collection_list)

        }, complete(res) {
          that.setData({

            loadModal: false
          })
          //console.log(res.statusCode)
        
        }
      });
    

  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

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
      url: app.globalData.url + '?act=author_list',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,

      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function (res) {
        if (res.data.code === 20000) {

          console.log(res.data.items.length)
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          var moment_list = that.data.collection_list;
          const oldData = that.data.collection_list;
          that.setData({
            collection_list: oldData.concat(res.data.items)
          })
          // 隐藏加载框
          // wx.hideLoading();
        } else {

          that.setData({
            isLoad: true,
            isend: true,
          })

        }
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  /**
   * 搜索函数
   */
  search_keyword: function () {
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
      url: app.globalData.url + '?act=author_list',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function (res) {
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
            collection_list: res.data.items
          })
        } else {
          that.setData({
            collection_list: [],
            isLoad: true,
          })
        }
      }
    })
  },


  gotodeteil(e) {

    let programid = e.currentTarget.dataset.programid
    var that = this
    console.log(programid)

    wx.navigateTo({
      url: '/pages/basics/author/author?authorid=' + programid,
    })

  },




});
