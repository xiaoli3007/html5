import WxValidate from '../../../utils/WxValidate.js'
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    imgList: [],
    form: {
      title: '',
    },
    avatarloadModal: false,
    cardgroup_name:'',
    boxid:0,
    cardid:0
  },
  onLoad: function (options) {
    app.setUserInfo('about');

    console.log(options)
    this.setData({

      cardgroup_name: options.name?options.name:'',
      boxid: options.boxid?parseInt(options.boxid):0,
      cardid: options.cardid?parseInt(options.cardid):0
    })

    let cardid =options.cardid?parseInt(options.cardid):0
    var that =this
    if(cardid!=0){

      wx.request({
        url: app.globalData.url2 + '?act=get_card_info',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          userid: app.globalData.userid ? app.globalData.userid : 0,
          cardid: cardid,
          sign:util.Md5Url({
            userid: app.globalData.userid ? app.globalData.userid : 0,
            cardid: cardid
          })
        },
        success: function (res) {
          console.log(res.data);
           var tprice ='imgList[0]'
         if(res.data.items.thumb_xcx!=''){
          that.setData({
            
            [tprice]: res.data.items.thumb_xcx
          })
         }
          that.setData({
            form: {
              title: res.data.items.title,
            },
            
          })
        },
         complete(res) {
          that.setData({

            loadModal: false
          })
          
        }
      });
    }

    this.initValidate()//验证规则函数

   },
  //报错 
  showFormModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      title: {
        required: true,
        minlength: 1
      }
    }
    const messages = {
      title: {
        required: '请填写正面文字',
        minlength: '请填写正面文字'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)

  },
  addformSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showFormModal(error)
      return false
    }
    var that = this;

    that.setData({
      avatarloadModal: true
    })

    if(that.data.imgList.length > 0 ){
      var n=that.data.imgList[0].indexOf("gfusoft.com");
    }
    // console.log(n)

    // return 
    if (that.data.imgList.length > 0 && n==-1){

      console.log(that.data.imgList)
      wx.uploadFile({
        url: app.globalData.url2 + '?act=add_card',
        filePath: that.data.imgList[0],
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: {
          userid: app.globalData.userid ? app.globalData.userid : 0,
          boxid:that.data.boxid,
          edit_cardid:that.data.cardid,
          title: params.title,
          sign:util.Md5Url( {
            userid: app.globalData.userid ? app.globalData.userid : 0
          })
        },
        success: function (res) {
          const data = JSON.parse(res.data)
          console.log(data)

          that.setData({
            form: {
              title: '',
            }
          })

          if(data.code==20000){

                  wx.showToast({
                    title: '添加卡片成功！',
                    icon: 'none',
                    duration: 1500,
                  })

                  wx.navigateTo({
                  url: '/pages/basics/carddetail/carddetail?boxid='+data.boxid,
                })

          }


        }, complete(res) {
          that.setData({
            avatarloadModal: false
          })
        }
      });

    }else{


      wx.request({
        url: app.globalData.url2 + '?act=add_card',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          userid: app.globalData.userid ? app.globalData.userid : 0,
          title: params.title,
          boxid:that.data.boxid,
          edit_cardid:that.data.cardid,
          sign:util.Md5Url( {
            userid: app.globalData.userid ? app.globalData.userid : 0
            
          })
        },
        success: function (res) {
          console.log(res)

          // that.setData({

          //   form: {
          //     title: '',
          //   }
          // })
         
          if(res.data.code==20000){
            console.log(res.data)

                  wx.showToast({
                    title: '添加卡片成功！',
                    icon: 'none',
                    duration: 1500,
                  })

                  wx.navigateTo({
                  url: '/pages/basics/carddetail/carddetail?boxid='+res.data.boxid,
                })

          }

        }, complete(res) {
          that.setData({
            avatarloadModal: false
          })
        }
      });

    }



  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  uploadChooseImage() {
    console.log(this.data.imgList)
    if (this.data.imgList.length != 0) {
      wx.showModal({
        content: '只能上传一张图片！',
        showCancel: false,
      })
      return false
    }
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });

   
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

});
