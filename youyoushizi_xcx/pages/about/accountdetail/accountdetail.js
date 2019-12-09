
import WxValidate from '../../../utils/WxValidate.js'
var util = require('../../../utils/util.js')
const app = getApp(); 
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    member_detail: null,
    countto: null,
    form: {
      username:'',
      newpasswd: '',
      confimpasswd: ''
    },
    edituernameform: {
      username: '',
      // newusername: '',
      realname: '',
      sex: '',
      birthday: '',
      nianji: '',
    }, 
    userid: 0,
    avatarloadModal:false,
    duserid:null,
    dusername:null,
    pickersex: ['男', '女'],
    pickernianji: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
    add_birthday:'',
    add_sex:'',
    add_nianji: '',
    edit_birthday: '',
    edit_sex: '',
    edit_nianji: '',
    loadModal:false,
    chongzhiuserid:null,
    chongzhiusername: null,
    price: 0.01,
    abouturl: '/pages/index/index?p=about'
  },
  onLoad: function (options) { 
  
    app.setUserInfo('about');

    // console.log(options)
    let bd_userid = options.userid ? options.userid : 0

    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;

    that.setData({
      loadModal: true
    })
    if (bd_userid) {

       wx.request({
         url: app.globalData.url2 + '?act=wx_get_wxmember_detaul&userid=' + bd_userid,
        method: 'POST',
        header: header,
        data: { 
          userid: bd_userid,
        },
        success: function (res) {
          // console.log(res);
          that.setData({
            member_detail: res.data.member_detail,
            countto: res.data.countto,
            userid: res.data.member_detail.userid,
            })
         }, complete(res) {

           that.setData({
             loadModal: false
           })
           

         }
      });

      this.initValidate()//验证规则函数
    }else{
      app.setUserInfo('about');
    }

  },
  sexChange(e) {
    let modalName = e.currentTarget.dataset.target
    if (modalName=='edit'){

      this.setData({
        edit_sex: e.detail.value
      })
    }else{
      this.setData({
        add_sex: e.detail.value
      })
    }
   
  },
  DateChange(e) {

    let modalName = e.currentTarget.dataset.target
    if (modalName == 'edit') {

      this.setData({
        edit_birthday: e.detail.value
      })
    } else {
      this.setData({
        add_birthday: e.detail.value
      })
    }
   
  },
  nianjiChange(e) {

    let modalName = e.currentTarget.dataset.target
    if (modalName == 'edit') {

      this.setData({
        edit_nianji: e.detail.value
      })
    } else {
      this.setData({
        add_nianji: e.detail.value
      })
    }
    
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  showModal_deleteuser(e) {
    // console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      duserid: e.currentTarget.dataset.userid,
      dusername: e.currentTarget.dataset.username,
    })
  },
  showModal_chongzhi(e) {

    let userid = e.currentTarget.dataset.userid

    var that = this

    wx.navigateTo({
      url: '/pages/about/accountrecharge/accountrecharge?userid=' + userid,
    })

    // console.log(e);
    // this.setData({
    //   modalName: e.currentTarget.dataset.target,
    //   chongzhiuserid: e.currentTarget.dataset.userid,
    //   chongzhiusername: e.currentTarget.dataset.username,
    // })
  },
  showModal_editpw(e) {
    // console.log(e);
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
    // console.log(e);

    // console.log(this.data.member_list[e.currentTarget.dataset.index]);
   // index
    let u = this.data.member_detail
    this.setData({
      modalName: e.currentTarget.dataset.target,
      edituernameform: {
        username: e.currentTarget.dataset.username,
        userid: e.currentTarget.dataset.userid,
        realname: u.realname,
      }
    })

    // console.log(u)
    // console.log(this.data.pickersex)
   
    let objsex = this.data.pickersex
    let nianjiobj = this.data.pickernianji

    // console.log(util.findKey(obj,value))
    this.setData({
      edit_birthday: u.birthday ? u.birthday:'',
      edit_sex: u.sex?util.findKey(objsex, u.sex):'',
      edit_nianji: u.nianji ?util.findKey(nianjiobj, u.nianji):'',
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

  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
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
        // console.log(res);

        if (res.data.code === 20001) {

          that.showFormModal({
            msg: '提交失败'
          }) 

        } else {
          that.showFormModal({
            msg: '提交成功'
          }) 
          that.onLoad({ 'userid': that.data.userid })
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


    const ruleseditusername = {
      username: {
        required: true,
        rangelength: [3, 20]

      },
      realname: {
        required: true,
        maxlength: 20
      },
      sex: {
        required: true
      },
      // birthday: {
      //   required: true
      // },
      // nianji: {
      //   required: true
      // }
      // newusername: {
      //   required: true,
      //   minlength: 3
      // }

    }
    const messages3 = {
      username: {
        required: '请填写用户名',
        minlength: '用户名3位-20位字符',
      },
      // newusername: {
      //   required: '请填写用户名',
      //   minlength: '用户名位3-20位字符'
      // }
      realname: {
        required: '请填写姓名',
        minlength: '姓名超出长度范围'
      },
      sex: {
        required: '请选择性别',
      },
      // birthday: {
      //   required: '请选择生日',
      // },
      // nianji: {
      //   required: '请选择年级',
      // }

    }
    this.WxValidate3 = new WxValidate(ruleseditusername, messages3)

    const chongzhi = {
     
      price: {
        required: true,
      },
    }
    const messages4 = {
      
      price: {
        required: '请填写充值金额',
      }
    }
    this.WxValidate4 = new WxValidate(chongzhi, messages4)

  },
  userchongzhiformSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value

    //校验表单
    if (!this.WxValidate4.checkForm(params)) {
      const error = this.WxValidate4.errorList[0]
      this.showFormModal(error)
      return false
    }

    // return false
    var that = this;
    wx.request({
      url: app.globalData.url2 + '?act=wx_chongzhi',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        wx_id: app.globalData.uid,
        userid: that.data.chongzhiuserid,
        username: params.username,
        price: params.price,
      },
      success: function (res) {
        
        var jsConfig = res.data.pr_info;

        console.log(jsConfig);
        if (res.data.code == 20000) {
          wx.requestPayment({
            timeStamp: jsConfig.timeStamp,
            nonceStr: jsConfig.nonceStr,
            package: jsConfig.package,
            signType: jsConfig.signType,
            paySign: jsConfig.paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
              })
              // that.setData({
              //   now_money: parseFloat(that.data.now_money) + parseFloat(e.detail.value.number)
              // });

              // setTimeout(function () {
              //   wx.navigateTo({
              //     url: '/pages/main/main?now=' + that.data.now_money + '&uid=' + app.globalData.uid,
              //   })
              // }, 1200)
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'success',
                duration: 1000,
              })
            },
            complete: function (res) {
              if (res.errMsg == 'requestPayment:cancel') {
                wx.showToast({
                  title: '取消支付',
                  icon: 'none',
                  duration: 1000,
                })
              }
            },
          })
        } else {
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000,
          })
        }

      }, 
      complete(res) {

        that.setData({
          modalName: null
        })
    
      }
    });


  },

  formSubmiteditusername: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate3.checkForm(params)) {
      const error = this.WxValidate3.errorList[0]
      this.showFormModal(error)
      return false
    }
    // console.log(this.data.edituernameform)
    // return false
    var that = this;
    wx.request({
      url: app.globalData.url2 + '?act=wx_edit_username',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        userid: that.data.edituernameform.userid,
        wx_id: app.globalData.uid,
        username: params.username,
        // newusername: params.newusername,
        realname: params.realname,
        sex: that.data.pickersex[params.sex],
        birthday: params.birthday,
        nianji: that.data.pickernianji[params.nianji],
      },
      success: function (res) {
        // console.log(res);

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
           that.onLoad({'userid':that.data.userid})
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
    // let index = e.currentTarget.dataset.index
    var that = this 
    // console.log({tuserid,index})
    wx.chooseImage({
      count: 1, //默认9
      sizeType: [ 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths

        that.setData({
          avatarloadModal: true
        })
        
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
              var tprice = 'member_detail.avatar'
              that.setData({
                [tprice]: data.response.avatar,
              })
              if (tuserid == app.globalData.userid){
                app.globalData.avatar = data.response.avatar
              }
            }
          },
          fail(res) {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 1500,
            })
          },
          complete(res) {
            that.setData({
              avatarloadModal: false
            })
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
  delete_user(e) {
    // console.log(e)

    let duserid = this.data.duserid
    let dusername = this.data.dusername
    var that = this
    console.log({ duserid, dusername})

    that.setData({

      loadModal: true
    })
    //删除用户
    wx.request({
      url: app.globalData.url2 + '?act=wx_delete',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        wx_id: app.globalData.uid,
        userid: duserid,
      },
      success: function (res) {
        console.log(res);

        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500,
        })
        // that.onLoad({ 'userid': that.data.userid })

        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/about/account/account',
          })
        }, 500)

      },
      complete(res) {
        that.setData({

          loadModal: false,
          modalName: null
        })

      }
    });


  },

 
});
