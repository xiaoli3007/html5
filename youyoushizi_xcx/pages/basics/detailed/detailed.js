var util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    program:null,
    datalist: [], 
    datatablist: [],
    ebookid:0,
    favorite:false,
    looked:false
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
          ebookid: res.data.program.id,
        }) 
        if (res.data.program.is_exit_favorite){
          that.setData({
            favorite: true,
          })
        }
        if (res.data.program.is_exit_looked) {
          that.setData({
            looked: true,
          })
        }


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
  member_favorite(e) {
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
      url: app.globalData.url + '?act=member_favorite',
      data: {
        ebookid: that.data.ebookid,
        userid: app.globalData.userid,
        type: t,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        console.log(res.data)
        if (t =='member_favorite'){
          that.setData({
            favorite: true,
          })

        }else{
          that.setData({
            looked: true,
          })
        }
   
      },
      complete(res) {
       
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
      current: e.currentTarget.dataset.url
    });
  },

})