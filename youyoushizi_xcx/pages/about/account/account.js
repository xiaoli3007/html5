
import WxValidate from '../../../utils/WxValidate.js'
var util = require('../../../utils/util.js')
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
      realname: '',
      sex: '',
      birthday: '',
      nianji: '',
    }, 
    edituernameform: {
      username: '',
      // newusername: '',
      realname: '',
      sex: '',
      birthday: '',
      nianji: '',
    }, 
    userid: app.globalData.userid,
    avatarloadModal:false,
    duserid:null,
    dusername:null,
    pickersex: ['男', '女'],
    pickernianji: ['未选择','一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
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
    relationList: ['爸爸', '妈妈', '爷爷', '奶奶', '外公', '外婆'],
    relation_name: '',
    relationboy_name:'',
    relationboy_userid: 0,
    relationList_is: [false,false,false,false,false,false],
    qita_relationship:'',
    abouturl: '/pages/index/index?p=about',
    guanxi_id: 0,
    guanxi_name: '',
    qita_guanxi_name: '',
    guanxi_relationList_is: [false, false, false, false, false, false],
  },
  onLoad: function () { 
  
    app.setUserInfo('about');
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;

    that.setData({
      loadModal: true
    })
    wx.showLoading({
      title: '加载中',
    })
    if (app.globalData.uid) {

       wx.request({
         url: app.globalData.url2 + '?act=wx_get_wxmemberlist' ,
        method: 'POST',
        header: header,
        data: { 
          uid: app.globalData.uid,
          sign:util.Md5Url( {
            uid: app.globalData.uid ? app.globalData.uid : 0
          })
        },
        success: function (res) {
          // console.log(res);
          that.setData({
            member_list: res.data.member_list,
            userid: res.data.main_userid ? String(res.data.main_userid):app.globalData.userid,
            })
         }, complete(res) {

           that.setData({
             loadModal: false
           })
          wx.hideLoading()
           

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
  onShareAppMessage: function (res) {

    if (res.from === 'button') {
    }

    return {
      title: "邀请绑定",
      path: '/pages/about/binding/binding?bd_userid=' + this.data.relationboy_userid + '&&bd_name=' + this.data.relationboy_name + '&&bd_p_name=' + this.data.relation_name
    }
  },
  yaoqing_weixin: function (e) {
     
    wx.navigateTo({
      url: '/pages/about/binding/binding?bd_userid=12&&bd_name=aaa&&bd_p_name=bbb'
    })

  },
  bindKeyInput: function (e) {
    this.setData({
      relation_name: e.detail.value,
      qita_relationship: e.detail.value
    })
    if (e.detail.value!=''){
      this.setData({
        relationList_is: [false, false, false, false, false, false]
      })
    }
  },
  onclick_relation_select(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name
    // this.data.relationList.forEach(function (value, i) {
    //   if (i == index) {

    //   }
    // })

    this.setData({
      relationList_is: [false, false, false, false, false, false]
    })
    var tprice = 'relationList_is[' + index + ']'
    this.setData({
      [tprice]: true,
    })
    //设置家长的身份名称
    this.setData({
      relation_name: name,
      qita_relationship:''
    })
   
  },
  showModal_relation(e) {
    // console.log(e);

   
    let temp_relationboy_userid = e.currentTarget.dataset.userid

    let temp_relationboy_name = ''


    this.data.member_list.forEach(function (value, i) {
      if (value.userid == temp_relationboy_userid){
        temp_relationboy_name = value.realname ? value.realname : value.username
        }
    })

    this.setData({
      modalName: e.currentTarget.dataset.target,
      relationboy_userid: temp_relationboy_userid,
      relationboy_name: temp_relationboy_name,
    })
  },
  guanxiname_bindKeyInput: function (e) {
    this.setData({
      guanxi_name: e.detail.value,
      qita_guanxi_name: e.detail.value
    })
    if (e.detail.value != '') {
      this.setData({
        guanxi_relationList_is: [false, false, false, false, false, false]
      })
    }
  },
  onclick_guanxiname_select(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name

    this.setData({
      guanxi_relationList_is: [false, false, false, false, false, false]
    })
    var tprice = 'guanxi_relationList_is[' + index + ']'
    this.setData({
      [tprice]: true,
    })
    //修改家长的身份名称
    this.setData({
      guanxi_name: name,
      qita_guanxi_name: ''
    })

  },
  showModal_deleteuser(e) {
    console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      duserid: e.currentTarget.dataset.userid,
      dusername: e.currentTarget.dataset.username,
    })
  },
  showModal_chongzhi(e) {
    console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      chongzhiuserid: e.currentTarget.dataset.userid,
      chongzhiusername: e.currentTarget.dataset.username,
    })
  },
  showModal_guanxiname(e) {
    // console.log(e);

    let temp_relationboy_userid = e.currentTarget.dataset.userid
    let temp_relationboy_name = ''
    this.data.member_list.forEach(function (value, i) {
      if (value.userid == temp_relationboy_userid) {
        temp_relationboy_name = value.realname ? value.realname : value.username
      }
    })
    console.log(temp_relationboy_name)

    this.setData({
      modalName: e.currentTarget.dataset.target,
      guanxi_id: e.currentTarget.dataset.id,
      guanxi_name: e.currentTarget.dataset.name,
      guanxi_realname: temp_relationboy_name,
    })
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
    // console.log(e);

    // console.log(this.data.member_list[e.currentTarget.dataset.index]);
   // index
    let u = this.data.member_list[e.currentTarget.dataset.index]
    this.setData({
      modalName: e.currentTarget.dataset.target,
      edituernameform: {
        username: e.currentTarget.dataset.username,
        userid: e.currentTarget.dataset.userid,
        realname: u.realname,
      }
    })

    console.log(u)
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
            console.log(res.data.userinfo);
            app.globalData.username = res.data.username;
            app.globalData.avatar = res.data.userinfo.avatar;
            app.globalData.realname = res.data.userinfo.realname;
            console.log(app.globalData.realname);
            //更新当前应用的session
            if (res.data.token) {
              wx.setStorage({
                key: "usertoken",
                data: res.data.token
              })
            }
            wx.showToast({
              title: '切换账号为' + res.data.userinfo.realname,
              icon: 'none',
              duration: 1500,
            })

          }
        });

      
      }
    }

  },
  // formSubmit: function (e) {
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  //   const params = e.detail.value
  //   //校验表单
  //   if (!this.WxValidate.checkForm(params)) {
  //     const error = this.WxValidate.errorList[0]
  //     this.showFormModal(error)
  //     return false
  //   }
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.url2 + '?act=wx_edit_password',
  //     method: 'POST',
  //     header: {
  //        'content-type': 'application/x-www-form-urlencoded', // 默认值
  //       'X-Token': app.globalData.xtoken
  //     },
  //     data: {
  //       userid: app.globalData.userid,
  //       username: params.username,
  //       newpasswd: params.newpasswd,
  //       confimpasswd: params.confimpasswd,
  //     },
  //     success: function (res) {
  //       console.log(res);

  //       if (res.data.code === 20001) {

  //         that.showFormModal({
  //           msg: '提交失败'
  //         }) 

  //       } else {
  //         that.showFormModal({
  //           msg: '提交成功'
  //         }) 

  //       }

  //     }, complete(res) {
        
  //       that.setData({
  //         modalName: null
  //       })
  //       //console.log(res.statusCode)
  //       if (res.statusCode == 500) {

  //       } else {

  //       }

  //     }
  //   });
   
    
  // },
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
      
    }
    const messages2 = {
      username: {
        required: '请填写用户名',
        minlength: '用户名3位-20位字符',
      },
      newpasswd: {
        required: '请填写密码',
        minlength: '密码至少6位'
      },
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
    this.WxValidate2 = new WxValidate(rulesadduser, messages2)

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
      birthday: {
        required: true
      },
      nianji: {
        required: true
      }
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
      birthday: {
        required: '请选择生日',
      },
      nianji: {
        required: '请选择年级',
      }

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

    const guanxi = {

      name: {
        required: true,
        maxlength: 8
      },
    }
    const guanximessages = {

      name: {
        required: '请填写名称',
        maxlength: '名称太长',
      }
    }
    this.WxValidate_guanxi = new WxValidate(guanxi, guanximessages)

    
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
        // console.log(res);

        // if (res.data.code === 20001) {

        //   that.showFormModal({
        //     msg: res.data.message
        //   })

        // } else {
        //   that.showFormModal({
        //     msg: '提交成功'
        //   })
        //   that.onLoad()
        // }

      }, 
      complete(res) {

        that.setData({
          modalName: null
        })
    
      }
    });


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

    //return false
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
        realname: params.realname,
        sex: that.data.pickersex[params.sex],
        birthday: params.birthday,
        nianji: that.data.pickernianji[params.nianji],
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
          that.onLoad()
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
          that.onLoad()
        }

      }, complete(res) {

        // that.setData({
        //   modalName: null
        // })
        //console.log(res.statusCode)
       
      }
    });


  },
  userguanxiformSubmit (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // const params = e.detail.value
    var that = this;
    //校验表单
    // if (!this.WxValidate_guanxi.checkForm(params)) {
    //   const error = this.WxValidate_guanxi.errorList[0]
    //   this.showFormModal(error)
    //   return false
    // }
    // console.log(that.data.guanxi_id)

    // return false
    
    wx.request({
      url: app.globalData.url2 + '?act=wx_edit_relationship_name',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        wx_id: app.globalData.uid,
        relationship_id: that.data.guanxi_id,
        name: that.data.guanxi_name,
      },
      success: function (res) {
        console.log(res);

        if (res.data.code === 20001) {

          that.showFormModal({
            msg: res.data.message
          })

        } else {
          that.showFormModal({
            msg: '修改成功'
          })

          that.setData({
            guanxi_relationList_is: [false, false, false, false, false, false],
            guanxi_name:'',
            qita_guanxi_name: '',
            guanxi_id: 0,
          })
          that.onLoad()
        }

      }, complete(res) {

        that.setData({
          modalName: null
        })

      }
    });


  },
  uploadChooseImage(e) {
    
    let tuserid =  e.currentTarget.dataset.userid
    let index = e.currentTarget.dataset.index
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
              var tprice = 'member_list[' + index + '].avatar'
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
        that.onLoad()
      },
      complete(res) {
        that.setData({

          loadModal: false,
          modalName: null
        })

      }
    });

    // wx.showModal({
    //   title: '删除用户',
    //   content: '确定要删除用户？',
    //   cancelText: '取消',
    //   confirmText: '确定',
    //   success: res => {
    //     if (res.confirm) {

    //     }
    //   }
    // })


  },
  goto_userdetail(e) {

    let userid = e.currentTarget.dataset.val
    
    var that = this
  
      wx.navigateTo({
        url: '/pages/about/accountdetail/accountdetail?userid=' + userid,
      })
  },
 
});
