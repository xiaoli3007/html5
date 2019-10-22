

const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    task_list:[],
    loadModal: true,
    page: 1,
    isLoad: true,
    pagesize: 15,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
    scrollLeft: 0,
    tabNav: ['收藏', '已读'],
    TabCur: 0,
    typelist: [2, 1],
    type:0,
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
  },
  onLoad: function (options) { 
    
    app.setUserInfo('about');
    console.log(options.type)
    if (options.type){
      var temptype = 0
      if (options.type ==1){
        var temptype = 1
        console.log(temptype)
      }
      this.setData({
        type: options.type,
        TabCur: temptype
      })
    }

    console.log(this.data.TabCur)

    var that = this;
    if (app.globalData.userid) {

       wx.request({
         url: app.globalData.url + '?act=collection&userid=' + app.globalData.userid,
        method: 'GET',
         header: {
           'content-type': 'application/json', // 默认值
           'X-Token': app.globalData.xtoken
         },
         data: {
           type: that.data.type,
           pagesize: that.data.pagesize,
         },
        success: function (res) {
          console.log(res);
          that.setData({
            task_list: res.data.items,
            })
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
      url: app.globalData.url + '?act=collection&userid=' + app.globalData.userid,
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        type: that.data.type,
        relation_type: that.data.relation_type,
        relation_id: that.data.relation_id,
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
    })
    // 页数+1
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.url + '?act=collection&userid=' + app.globalData.userid,
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        type: that.data.type,
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
      }
    })
  },

  /**
  * tab切换函数
  */
  tabSelect: function (e) {
   
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      isLoad: false,
      isend: false,
      page: 1,
      type: this.data.typelist[e.currentTarget.dataset.id],
    })
    
    console.log(this.data.type)

    var that = this;
    wx.request({
      url: app.globalData.url + '?act=collection&userid=' + app.globalData.userid,
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        type: that.data.type,
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
      }
    })
  },
  gotask(e) {

    let taskid = e.currentTarget.dataset.taskid
    let status = e.currentTarget.dataset.status
    var that = this
    console.log(taskid)
    

      wx.navigateTo({
        url: '/pages/basics/task/task?taskid=' + taskid,
      })

    
    
  
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
            url: app.globalData.url + '?act=task_delete',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'X-Token': app.globalData.xtoken
            },
            data: {
              userid: app.globalData.userid,
              taskid: ttaskid,
            },
            success: function (res) {
              console.log(res);
               
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

 
});