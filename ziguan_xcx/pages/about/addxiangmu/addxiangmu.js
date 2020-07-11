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
      name: '',
      description: '',
    },
    avatarloadModal: false,
    isbn:''
  },
  onLoad: function (options) {
    app.setUserInfo('about');


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
      name: {
        required: true,
        minlength: 1
      }
    }
    const messages = {
      name: {
        required: '请填写名称',
        minlength: '请填写名称'
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
      wx.request({
        url: app.globalData.url2 + '?act=add_cardgroup',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          userid: app.globalData.userid ? app.globalData.userid : 0,
          name: params.name,
          description: params.description,
          sign:util.Md5Url( {
            userid: app.globalData.userid ? app.globalData.userid : 0
            
          })
        },
        success: function (res) {
          
          if(res.data.code==20000){
            console.log(res.data)

                  wx.showToast({
                    title: '添加卡片组成功！',
                    icon: 'none',
                    duration: 1500,
                  })

                  wx.navigateTo({
                  url: '/pages/basics/carddetail/carddetail?boxid='+res.data.boxid,
                })

          }
          // let taskid = e.currentTarget.dataset.taskid
          

          // that.setData({
          //   form: {
          //     name: '',
          //     description: '',
          //   }
          // })
          // that.showFormModal({
          //   msg: res.data.message
          // })

        }, complete(res) {
          that.setData({
            avatarloadModal: false
          })
        }
      });



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