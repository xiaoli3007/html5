var util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    author_info:null,
    author_book_recommend: [], 
    list_ebooks: [],
    favorite:false,
    authorid: 0,
    loadModal: true, 
    TabCur: 0,
    tablist: [{ name: '简介', value: 'desc' }, { name: '图书', value: 'desc' }, { name: '推荐', value: 'desc' }, { name: '书评', value: 'desc' }]
  },
  onLoad(options) {
    console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=author_show',
      data: {
        author_id: options.authorid,
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
          author_info: res.data.author_info,
          author_book_recommend: res.data.author_book_recommend,
          list_ebooks: res.data.list_ebooks,
          authorid: options.authorid
        }) 
        // if (res.data.program.is_exit_favorite){
        //   that.setData({
        //     favorite: true,
        //   })
        // }
   
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
  showModal(e) {
    // console.log(item_word);
    let m = e.currentTarget.dataset.target
    this.setData({
      modalName: m,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    // console.log(e.currentTarget.dataset.id);
    // console.log(this.data.TabCur);
    // console.log( this.data.datatablist);
    // console.log(this.data.datatablist_k);
    if (e.currentTarget.dataset.id != this.data.TabCur) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }


  },
  member_favorite_author(e) {
    if (!app.globalData.userid){

      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1500,
      })
      return 
    }
    let t = e.currentTarget.dataset.target

    let that = this;
    //收藏
    wx.request({
      url: app.globalData.url + '?act=member_favorite_author',
      data: {
        authorid: that.data.authorid,
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        console.log(res.data)
          that.setData({
            favorite: true,
          })
      },
      complete(res) {
       
      }
    })
  },

})