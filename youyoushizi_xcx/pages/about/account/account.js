
import WxValidate from '../../../utils/WxValidate.js'

const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    member_list:[],
    form: {
      username:'',
      newpasswd: '',
      confimpasswd: ''
    },
    adduerform: {
      username: '',
      newpasswd: '',
    }, 
    edituernameform: {
      username: '',
      newusername: '',
    }, 
    userid: app.globalData.userid,

  },
  onLoad: function () { 
  
    app.setUserInfo('about');
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    if (app.globalData.uid) {

       wx.request({
         url: app.globalData.url2 + '?act=wx_get_wxmemberlist&uid=' + app.globalData.uid,
        method: 'POST',
        header: header,
        data: { 
          uid: app.globalData.uid,
        },
        success: function (res) {
          console.log(res);
          that.setData({
            member_list: res.data.member_list,
            userid: res.data.main_userid ? String(res.data.main_userid):app.globalData.userid,
            })
        }
      });


      this.initValidate()//验证规则函数

      // wx.request({
      //   url: app.globalData.url2 + '?act=wx_get_userinfo&userid=' + app.globalData.userid,
      //   method: 'POST',
      //   header: header,
      //   data: {
      //     userid: app.globalData.userid,
      //   },
      //   success: function (res) {
      //     console.log(res);
           
      //   }
      // });

    }

  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  showModal_editpw(e) {
    console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      form: {
        username: e.currentTarget.dataset.username,
        newpasswd: '',
        confimpasswd: '' 
      }
    })
  },
  showModal_editusername(e) {
    console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      edituernameform: {
        username: e.currentTarget.dataset.username,
        newusername: '',
      }
    })
  },
   showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }, 
  check_userid(e) {
    //按钮过来的文字
    if (e.currentTarget.dataset.hasOwnProperty('val')) {
      if (e.currentTarget.dataset.val != '') {
        console.log(e.currentTarget.dataset.val)
        this.setData({
          userid: e.currentTarget.dataset.val,
        })
        app.globalData.userid = e.currentTarget.dataset.val;

        //切换用户的主 userid
        wx.request({
          url: app.globalData.url2 + '?act=wx_check_userid',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'X-Token': app.globalData.xtoken
          },
          data: {
            wx_id: app.globalData.uid,
            userid: app.globalData.userid,
          },
          success: function (res) {
            console.log(res);
            app.globalData.username = res.data.username;
          }
        });

        wx.showToast({
          title: '切换账号为' + e.currentTarget.dataset.username,
          icon: 'none',
          duration: 1500,
        })
      }
    }

  },
  formSubmit: function (e) {
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
      url: app.globalData.url2 + '?act=wx_edit_password',
      method: 'POST',
      header: {
         'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        userid: app.globalData.userid,
        username: params.username,
        newpasswd: params.newpasswd,
        confimpasswd: params.confimpasswd,
      },
      success: function (res) {
        console.log(res);

        if (res.data.code === 20001) {

          that.showFormModal({
            msg: '提交失败'
          }) 

        } else {
          that.showFormModal({
            msg: '提交成功'
          }) 

        }

      }, complete(res) {
        
        that.setData({
          modalName: null
        })
        //console.log(res.statusCode)
        if (res.statusCode == 500) {

        } else {

        }

      }
    });
   
    
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
      newpasswd: {
        required: true,
        minlength: 6
      },
      confimpasswd: {
        required: true,
        minlength: 6,
        equalTo: 'newpasswd'
      }
    }
    const messages = {
      newpasswd: {
        required: '请填写新密码',
        minlength: '密码至少6位'
      },
      confimpasswd: {
        required: '请填写确认密码',
        minlength: '密码至少6位',
        equalTo:'密码不相同'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)

    const rulesadduser = {
      username: {
        required: true,
        rangelength: [3, 20]

      },
      newpasswd: {
        required: true,
        minlength: 6
      }
      
    }
    const messages2 = {
      username: {
        required: '请填写用户名',
        minlength: '用户名3位-20位字符',
      },
      newpasswd: {
        required: '请填写密码',
        minlength: '密码至少6位'
      }
      
    }
    this.WxValidate2 = new WxValidate(rulesadduser, messages2)

    const ruleseditusername = {
      username: {
        required: true,
        rangelength: [3, 20]

      },
      newusername: {
        required: true,
        minlength: 3
      }

    }
    const messages3 = {
      username: {
        required: '请填写用户名',
        minlength: '用户名3位-20位字符',
      },
      newusername: {
        required: '请填写用户名',
        minlength: '用户名位3-20位字符'
      }

    }
    this.WxValidate3 = new WxValidate(ruleseditusername, messages3)

  },
  userformSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate2.checkForm(params)) {
      const error = this.WxValidate2.errorList[0]
      this.showFormModal(error)
      return false
    }
    var that = this;
    wx.request({
      url: app.globalData.url2 + '?act=wx_add_user',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        wx_id: app.globalData.uid,
        username: params.username,
        newpasswd: params.newpasswd,
      },
      success: function (res) {
        console.log(res);

        if (res.data.code === 20001) {

          that.showFormModal({
            msg: res.data.message
          })
          
        } else {
          that.showFormModal({
            msg: '提交成功'
          })

        }

      }, complete(res) {

        that.setData({
          modalName: null
        })
        //console.log(res.statusCode)
        if (res.statusCode == 500) {

        } else {

        }

      }
    });


  },
  formSubmiteditusername: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate3.checkForm(params)) {
      const error = this.WxValidate3.errorList[0]
      this.showFormModal(error)
      return false
    }
    var that = this;
    wx.request({
      url: app.globalData.url2 + '?act=wx_edit_username',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        wx_id: app.globalData.uid,
        username: params.username,
        newusername: params.newusername,
      },
      success: function (res) {
        console.log(res);

        if (res.data.code === 20001) {

          that.showFormModal({
            msg: res.data.message
          })

        } else {
          that.showFormModal({
            msg: '提交成功',
          })
           that.setData({
            modalName: null
          })

        }

      }, complete(res) {

        // that.setData({
        //   modalName: null
        // })
        //console.log(res.statusCode)
       
      }
    });


  },
  uploadChooseImage(e) {
   
    let tuserid =  e.currentTarget.dataset.userid
    let index = e.currentTarget.dataset.index
    var that = this 
    console.log({tuserid,index})
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths

        
        wx.uploadFile({
          url: app.globalData.url2 + '?act=wx_avatar',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            userid: tuserid,
          },
          success(res) {
            // const data = res.data
            // console.log(res)
            const data = JSON.parse(res.data)
            console.log(data)
            if (data.response.success == 0){
              wx.showToast({
                title: data.response.msg,
                icon: 'none',
                duration: 1500,
              })
            }else{
              var tprice = 'member_list[' + index + '].avatar'
              that.setData({
                [tprice]: data.response.avatar,
              })
            }
          }
        })
        
      }
    });
  },
  ViewImage(e) {
    // wx.previewImage({
    //   urls: this.data.imgList,
    //   current: e.currentTarget.dataset.url
    // });
  },

 
});
