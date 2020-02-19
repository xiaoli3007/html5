
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    basicsurl: '/pages/index/index?p=basics',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    task_list:[],
    loadModal: true,
    page: 1,
    isLoad: false,
    pagesize: 15,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
    scrollLeft: 0,
    tabNav: ['识字任务', '听写任务'],
    TabCur: 0,
    typelist: [2, 1],
    type:2,
    right: [
    //   {
    //   text: 'Cancel',
    //   style: 'background-color: #ddd; color: white',
    // },
    {
      text: '删除',
      style: 'background-color: #F4333C; color: white',
    }],
    relation_type: '',
    relation_id: 0,
    jiaocailist789: [467767, 467768, 467769	, 467770, 467771, 467772],
    jiaocai_ebook_list: [466135, 466136, 466137, 466138, 466139, 466140, 466454, 466455, 466456, 467879, 467880, 467881,467767, 467768, 467769, 467770, 467771, 467772],
    havetask: null, //是否有任务
  },
  onLoad: function (options) { 
    
    app.setUserInfo('about');
    // console.log(options.type)

    // console.log(this.data.type)

    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    if (app.globalData.userid) {

       wx.request({
         url: app.globalData.url2 + '?act=tasklist' ,
        method: 'GET',
         header: {
           'content-type': 'application/json', // 默认值
           'X-Token': app.globalData.xtoken
         },
         data: {
           userid: app.globalData.userid,

           pagesize: that.data.pagesize,
           sign:util.Md5Url( {
            userid: app.globalData.userid,

            pagesize: that.data.pagesize
          })
         },
        success: function (res) {
          // console.log(res);
          // console.log(res.data.items.length)
          if (res.data.items){
            if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
              that.setData({
                isLoad: true,
                isend: true,
              })
            }

            // setTimeout(function () {
              that.setData({
                task_list: res.data.items,
                havetask: parseInt(res.data.havatasknums),
              })
            // }, 500)
           
          }else{

            that.setData({
              
              havetask: 0,
            })
            
          }
          
         }, complete(res) {
           that.setData({

             loadModal: false
           })
          wx.hideLoading()
           //console.log(res.statusCode)
           if (res.statusCode == 500) {

           } else {

           }

         }
      });
  }

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
      url: app.globalData.url2 + '?act=tasklist',
      data: {
        userid: app.globalData.userid,
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        sign:util.Md5Url( {
          userid: app.globalData.userid,
          pagesize: that.data.pagesize,
          page: that.data.page,
          keywords: that.data.keywords,
        })
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
          var moment_list = that.data.task_list;
          const oldData = that.data.task_list;
          that.setData({
            task_list: oldData.concat(res.data.items)
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
      loadModal: true,
    })
    // 页数+1
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.url2 + '?act=tasklist' ,
      data: {
        userid: app.globalData.userid,
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,

        sign:util.Md5Url( {
          userid: app.globalData.userid,
          pagesize: that.data.pagesize,
          page: that.data.page,
          keywords: that.data.keywords,

        })
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
            task_list: res.data.items
          })
        } else {
          that.setData({
            task_list: [],
            isLoad: true,
            
          })
        }
      },
      complete(res) {
        that.setData({

          loadModal: false
        })

      }
    })
  },


  gotask(e) {

    let taskid = e.currentTarget.dataset.taskid
    let status = e.currentTarget.dataset.status
    var that = this
    
    if (status == -1){
      console.log(status)
      wx.showModal({
        title: '您好！该任务已经完成！',
        content: '确定要从新开始任务？',
        cancelText: '取消',
        confirmText: '好的',
        success: res => {
          if (res.confirm) {

            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/basics/task/task?taskid=' + taskid,
              })
            }, 300)
           
          }
        }
      })

    }else{
      // console.log(taskid)

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/basics/task/task?taskid=' + taskid,
        })
      }, 300)
     

    }
    
  
  },

  delete_task(e) {
    // console.log(e)

    // let ttaskid = e.currentTarget.dataset.taskid
    // let tindex = e.currentTarget.dataset.index

    var strs = new Array()
    strs = e.detail.data.split("-")
    let ttaskid = strs[0]
    let tindex = strs[1]

    var that = this
    console.log({ttaskid,tindex})
    // return
    wx.showModal({
      title: '删除任务',
      content: '确定要删除该任务？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {

          that.setData({

            loadModal: true
          })
          //删除任务
          wx.request({
            url: app.globalData.url2 + '?act=task_delete',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'X-Token': app.globalData.xtoken
            }, 
            data: {
              userid: app.globalData.userid,
              taskid: ttaskid,
              sign:util.Md5Url( {
                userid: app.globalData.userid,
                taskid: ttaskid
              }) 
              
            },
            success: function (res) {
              //console.log(res);
               
              that.data.task_list.splice(tindex, 1)
              that.setData({
                task_list: that.data.task_list
              })
            },
             complete(res) {
              that.setData({

                loadModal: false
              })
              
            }
          });
          
        }
      }
    })

  }
  ,
  gotodetail(e) {

    let jumpebookid = e.currentTarget.dataset.jumpebookid
    let relation_type = e.currentTarget.dataset.relation_type

    let wcell_type = e.currentTarget.dataset.wcell_type

    // console.log({ jumpebookid, relation_type, wcell_type})
    // return false
    var that = this 
      wx.navigateTo({
        url: '/pages/basics/jiaocai_lession/jiaocai_lession?ebookid=' + jumpebookid,
      })


  },

  onClickaaa(e) {
    var strs = new Array()
    strs = e.detail.data.split("-")
    console.log(strs)
    // console.log('onClick', e.detail.data)
    // if (e.detail.data) {
    //   wx.showModal({
    //     title: `The data is ${e.detail.data}`,
    //     showCancel: !1,
    //   })
    // }
  },
 
});