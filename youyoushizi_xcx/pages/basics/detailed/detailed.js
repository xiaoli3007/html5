const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    program:null,
    datalist: [], datatablist: [],
  },
  onLoad(options) {
    console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=ebook_show',
      data: {
        ebookid: options.ebookid,
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        // let arr = res.data.items
        console.log(res.data)
        // console.log(Object.keys(arr));
        // arr.forEach(function (value, i) {
        //   　　console.log('forEach遍历:' + i );

        // })
        that.setData({
          program: res.data.program,
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
  gotodeteil_study(e) {

    let programid = e.currentTarget.dataset.programid
    // var that = this
    // console.log(programid)
    wx.navigateTo({
      url: '/pages/basics/detailed_study/detailed_study?ebookid=' + programid,
    })
  },

})