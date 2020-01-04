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
    tasjlisturl: '/pages/basics/sentencelist/sentencelist',
  },
  onLoad(options) {
    // console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=sentence_show',
      data: {
        sentenceid: options.sentenceid ? options.sentenceid:0,
        firstdword: options.firstdword ? options.firstdword : '',
        dword: options.dword ? options.dword : '',
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

   
        res.data.sentence_info = util.Decrypt(res.data.sentence_info)
        if (options.dword){
          console.log(options.dword)
          res.data.sentence_info.lw_red = util.global_hilight_word(options.dword, res.data.sentence_info.lword)
        }

        
       
        // console.log(res.data)
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
  showModal_word_shiyi(e) {

    let m = e.currentTarget.dataset.target
    // DrawerModalL_dword
    this.setData({
      modalName: m,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // gotodeteil_study(e) {

  //   let programid = e.currentTarget.dataset.target
 
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