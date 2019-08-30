
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
    }

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
  },

 
});
