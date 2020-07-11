
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    sentence_list: [],
    loadModal: true,
    page: 1,
    isLoad: false,
    pagesize: 15,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
    firstone_show: false,
    firstone_data: null,
    basicsurl: '/pages/index/index?p=basics',
    search_clear: false,
    inputFocus: false,
    type:''
  },
  onLoad: function (options) {

  
    var that = this;
    
    let tempkeywords =  options.keywords?options.keywords:''
    let temptype =  options.type?options.type:''

    this.setData({
      keywords: tempkeywords,
      type: temptype,
    })
      wx.request({
        url: app.globalData.url + '?act=sentence_list',
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          keywords: tempkeywords,
          pagesize: that.data.pagesize,
          type: temptype,
          sign:util.Md5Url( {
            keywords: tempkeywords,
            pagesize: that.data.pagesize,
            type: temptype,
          })
        },
        success: function (res) {
          // console.log(res);
          if (res.data.code === 20000) {  
            res.data.items = util.Decrypt(res.data.items)

            if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
              that.setData({
                isLoad: true,
                isend: true,
              })
            }

            if (that.data.keywords){
              res.data.items.forEach(function (value, i) {
                res.data.items[i].lw_red = util.global_hilight_word(that.data.keywords, value.lword)
              })
            }

            that.setData({
              sentence_list: res.data.items,
              
            })
        }else {

          that.setData({
            isLoad: true,
            isend: true,
          })

        }

        }, complete(res) {
          that.setData({

            loadModal: false
          })
          //console.log(res.statusCode)
          if (res.statusCode == 500) {

          } else {

          }

        }
      });
    

  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

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
      url: app.globalData.url + '?act=sentence_list',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        type:  that.data.type,
        sign:util.Md5Url( {
          pagesize: that.data.pagesize,
          page: that.data.page,
          keywords: that.data.keywords,
          type:  that.data.type,
        })
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function (res) {
        if (res.data.code === 20000) {
          res.data.items = util.Decrypt(res.data.items)
          // console.log(res.data.items.length)
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          var moment_list = that.data.sentence_list;
          const oldData = that.data.sentence_list;
          if (that.data.keywords){
            res.data.items.forEach(function (value, i) {
              res.data.items[i].lw_red = util.global_hilight_word(that.data.keywords, value.lword)
            })
          }
          
          that.setData({
            sentence_list: oldData.concat(res.data.items)
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
    // console.log(e)
    this.setData({
      search_clear: true,
      keywords: e.detail.value
    })
  },
  onClear: function (e) {
    this.setData({
      keywords: '',
      search_clear: false,
      // inputFocus: false,
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
      loadModal: true,
    })
    wx.showLoading({
      title: '加载中',
    })
    // 页数+1
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.url + '?act=sentence_list' ,
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        sign:util.Md5Url( {
          pagesize: that.data.pagesize,
          page: that.data.page,
          keywords: that.data.keywords
        })
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code === 20000) {
          
          res.data.items = util.Decrypt(res.data.items)
          
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
             
            })
          }

          res.data.items.forEach(function (value, i) {
            res.data.items[i].lw_red = util.global_hilight_word(that.data.keywords, value.lword)
          })

          console.log(res.data.items)
          // 回调函数
          that.setData({
            sentence_list: res.data.items
          })
          //第一条显示
          if (res.data.first_one.length>0){
            that.setData({
              firstone_show: true,
              firstone_data: res.data.first_one[0]
            })
          }else{
            that.setData({
              firstone_show: false,
              firstone_data: null
            })
          }
        } else {
          that.setData({
            sentence_list: [],
            isLoad: true,
            firstone_show: false,
          })
        }
      }, complete(res) {

        wx.hideLoading()
        that.setData({

          loadModal: false
        })
        

      }
    })
  },


  gotodeteil(e) {

    let programid = e.currentTarget.dataset.programid
    var that = this
    console.log(programid)

    wx.navigateTo({
      url: '/pages/basics/sentence/sentence?sentenceid=' + programid + '&dword=' + that.data.keywords,
    })
 
  }, 


  gotodeteil_cidian(e) {

    let lword = e.currentTarget.dataset.lword
    var that = this
    console.log(lword)

    wx.navigateTo({
      url: '/pages/basics/sentence/sentence?firstdword=' + lword,
    })

  },



});