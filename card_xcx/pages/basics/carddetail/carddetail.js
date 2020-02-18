var util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    cardbox_info:null,
    favorite:false,
    boxid: 0,
    loadModal: true, 
  },
  onLoad(options) {
     console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url2 + '?act=carddetail',
      data: {
        boxid: options.boxid,
        userid: app.globalData.userid ? app.globalData.userid : 0,
        sign:util.Md5Url( {
          boxid: options.boxid,
          userid: app.globalData.userid ? app.globalData.userid : 0
        })
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        // let arr = res.data.items
        //  console.log(res.data.author_book_recommend.length)
        // console.log(Object.keys(arr));
        // arr.forEach(function (value, i) {
        //   　　console.log('forEach遍历:' + i );

        // })
        res.data.cardbox_info = util.Decrypt(res.data.cardbox_info)
     
      that.setData({
        cardbox_info: res.data.cardbox_info,
          boxid: options.boxid
        }) 
        // if (res.data.author_info.is_exit_favorite){
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

    let t = e.currentTarget.dataset.title
    let c = e.currentTarget.dataset.content

    this.setData({
      modalName: m,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
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
    // let t = e.currentTarget.dataset.target

    let that = this;
    //收藏
    wx.request({
      url: app.globalData.url + '?act=member_favorite_author',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        authorid: that.data.authorid,
        userid: app.globalData.userid,
        sign:util.Md5Url( {
          authorid: that.data.authorid,
          userid: app.globalData.userid
        })
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
  
  gotodeteil(e) {

    let programid = e.currentTarget.dataset.programid
    // var that = this
    // console.log(programid)
    wx.navigateTo({
      url: '/pages/basics/detailed/detailed?ebookid=' + programid,
    })
  },
   ViewImage(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
      current: e.currentTarget.dataset.url
    });
  },

})