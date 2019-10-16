const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    TabCursub: 0,
    scrollLeft: 0,
    scrollLefts: 0,
    tabNavcat: [],
    tabNavcat_sub: [],
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

          datalist: res.data.items,
          program: res.data.program,
          datatablist_k: res.data.datas_xcc_tab_key,
          datatablist: res.data.datas_xcc_tab,
          TabCur: res.data.datas_xcc_tab[0]['m'],
          TabCursub: res.data.datas_xcc_tab[0]['s'][0],
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
    // console.log(e.currentTarget.dataset.id);
    // console.log(this.data.TabCur);
    // console.log( this.data.datatablist);
    // console.log(this.data.datatablist_k);
    if (e.currentTarget.dataset.id != this.data.TabCur){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        TabCursub: this.data.datatablist_k[e.currentTarget.dataset.id]['s'][0],
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
    

  },
  tabSelect2(e) {
    this.setData({
      TabCursub: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
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