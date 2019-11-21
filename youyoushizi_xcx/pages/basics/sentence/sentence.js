var util = require('../../../utils/util.js')
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    sentence_info:null,
    sentenceid:0,
    favorite:false,
  },
  onLoad(options) {
    console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=sentence_show',
      data: {
        sentenceid: options.sentenceid ? options.sentenceid:0,
        firstdword: options.firstdword ? options.firstdword : '',
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

   
        console.log(res.data)
     
        that.setData({
          sentence_info: res.data.sentence_info,
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
  // gotodeteil_study(e) {

  //   let programid = e.currentTarget.dataset.programid
 
  //   wx.navigateTo({
  //     url: '/pages/basics/detailed_study/detailed_study?ebookid=' + programid,
  //   })
  // },
  // showModal(e) {
  //   // console.log(item_word);
  //   let m = e.currentTarget.dataset.target
  //   this.setData({
  //     modalName: m,
  //   })
  // },
  // hideModal(e) {
  //   this.setData({
  //     modalName: null
  //   })
  // },


})