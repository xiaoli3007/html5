const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    VerticalNavTop: 0,
    // tabNav: ['一年级', '二年级', '三年级'],
    jiaocaiList: [],
    ebookid: 0,
    loadModal: true,
    load: true
  },
  onLoad(options) {
    let that = this;
    // console.log(options)
    if (options.ebookid){
      that.setData({

        ebookid: options.ebookid
      })
    }
    //加载列表  
    wx.request({
      url: app.globalData.url2 + '?act=jiaocai_sub_lession', 
      data: {
        bookid: options.ebookid,
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      }, 
      success(res) {

       
        var temp_array = []
        res.data.items.forEach(function (value, i) {
          let temp = value
          temp.id = i
          temp_array.push(temp)
        })
        // console.log(temp_array)
        that.setData({

          jiaocaiList: temp_array
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
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
   
  VerticalMain(e) {
    let that = this;
    let list = this.data.jiaocaiList;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        jiaocaiList: list
      })
      // console.log(list)
    }
    let scrollTop = e.detail.scrollTop + 20;
    // console.log(scrollTop)
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  showToast_help(e) {
      wx.showToast({
        title: '没有',
        icon: 'none',
        duration: 1500,
      })
  },
  tabSelectshengzi(e) {
    
    let jumpebookid = this.data.ebookid
    var that = this

    let wcell_type = e.currentTarget.dataset.wcell_type

    console.log(jumpebookid,wcell_type)
    
      wx.navigateTo({
        url: '/pages/basics/jiaocai_detailed_study/jiaocai_detailed_study?ebookid=' + jumpebookid + '&wcell_type=' + wcell_type,
      })
  },

})