import { $wuxDialog } from '../../../dist/index'
const app = getApp()
Page({
  data: {
    
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    loadModal: true,
    code: '',
    title: '',
   
  },
  onLoad(options) {

    console.log(options)

    let searchnot_code = options.searchnot_code ? options.searchnot_code:''

    let searchnot_title = options.searchnot_title ? options.searchnot_title : ''

    that.setData({
      code: searchnot_code,
      title: searchnot_title,
    })
  

  },
  tabSelect(e) {
   
  },
  gotoregbook() {
    // this.setData({ msg: 'Hello World' })

    wx.navigateTo({
      url: '/pages/about/regbook/regbook',
    })
  },

})