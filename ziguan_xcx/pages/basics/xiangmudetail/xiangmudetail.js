var util = require('../../../utils/util.js')
import WxValidate from '../../../utils/WxValidate.js'
const app = getApp()
Page({
  data: {
    // globalcardsurl: "pages/basics/globalcard/globalcard",
    basicsurl: "/pages/about/mycard/mycard",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    cardbox_info:null,
    favorite:false,
    boxid: 0,
    userid: 0,
    loadModal: true, 
    right: [
        {
        text: '修改',
        style: 'background-color: #ddd; color: #000',
      },
      {
        text: '删除',
        style: 'background-color: #F4333C; color: white',
      }],

      form: {
        name: '',
        description: '',
      },
  
  },
  onLoad(options) {
     console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url2 + '?act=carddetail',
      data: {
        boxid: options.boxid,
        userid: app.globalData.userid ? app.globalData.userid : 0,
        sign:util.Md5Url( {
          boxid: options.boxid,
          userid: app.globalData.userid ? app.globalData.userid : 0
        })
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        // let arr = res.data.items
        //  
        // console.log(Object.keys(arr));
        // arr.forEach(function (value, i) {
        //   　　console.log('forEach遍历:' + i );

        // })
        res.data.cardbox_info = util.Decrypt(res.data.cardbox_info)
       
      that.setData({
        cardbox_info: res.data.cardbox_info,
          boxid: options.boxid,
          userid: res.data.cardbox_info.userid,
          form: {
            name: res.data.cardbox_info.name,
            description: res.data.cardbox_info.description,
          }
        }) 

        if (res.data.cardbox_info.userid==0){

         // console.log(111)
          that.setData({
            basicsurl: "/pages/basics/globalcard/globalcard",
            right:[]
          })
        }
 
        // if (res.data.author_info.is_exit_favorite){
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

    this.initValidate()//验证规则函数
  },
  showModal(e) {
    // console.log(item_word);
    let m = e.currentTarget.dataset.target

    let t = e.currentTarget.dataset.title
    let c = e.currentTarget.dataset.content

    this.setData({
      modalName: m,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  member_favorite_author(e) {
    if (!app.globalData.userid){

      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1500,
      })
      return 
    }
    // let t = e.currentTarget.dataset.target

    let that = this;
    //收藏
    wx.request({
      url: app.globalData.url + '?act=member_favorite_author',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        authorid: that.data.authorid,
        userid: app.globalData.userid,
        sign:util.Md5Url( {
          authorid: that.data.authorid,
          userid: app.globalData.userid
        })
      },
      success(res) {
        console.log(res.data)
          that.setData({
            favorite: true,
          })
      },
      complete(res) {
       
      }
    })
  },
  
  addcard(e) {

    let boxid = e.currentTarget.dataset.boxid
    // var that = this
    // console.log(programid)
    wx.navigateTo({
      url: '/pages/about/addcard/addcard?boxid=' + boxid+'&name='+this.data.cardbox_info.name,
    })
  },
   ViewImage(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
      current: e.currentTarget.dataset.url
    });
  },

  delete_card(e) {
     console.log(e.detail.value.text)

     let action = e.detail.value.text
    // let ttaskid = e.currentTarget.dataset.taskid
    // let tindex = e.currentTarget.dataset.index

    var strs = new Array()
    strs = e.detail.data.split("-")
    let ttaskid = strs[0]
    let tindex = strs[1]

    var that = this
    console.log({ action,ttaskid, tindex})

     // return
      if(action=='修改'){

        wx.navigateTo({
          url: '/pages/about/addcard/addcard?boxid=' + this.data.cardbox_info.id+'&name='+this.data.cardbox_info.name+'&cardid='+ttaskid,
        })

      }
      if(action=='删除'){
        wx.showModal({
          title: '删除',
          content: '确定要删除么？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
    
              that.setData({
    
                loadModal: true
              })
              //删除任务
              wx.request({
                url: app.globalData.url2 + '?act=my_card_delete',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                  'X-Token': app.globalData.xtoken
                },
                data: {
                  userid: app.globalData.userid ? app.globalData.userid : 0,
                  cardid: ttaskid,
                  sign:util.Md5Url({
                    userid: app.globalData.userid ? app.globalData.userid : 0,
                    cardid: ttaskid
                  })
                },
                success: function (res) {
                  console.log(res);
                   
                  that.data.cardbox_info.card_list.splice(tindex, 1)
                  that.setData({
                    cardbox_info: that.data.cardbox_info
                  })
                },
                 complete(res) {
                  that.setData({
    
                    loadModal: false
                  })
                  
                }
              });
              
            }
          }
        })

      }
   

  }
  ,
  showModal_edit(e) {
    // console.log(e);
    this.setData({
      modalName: e.currentTarget.dataset.target,
      
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
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
          edit_boxid: that.data.boxid,
          name: params.name,
          description: params.description,
          sign:util.Md5Url( {
            userid: app.globalData.userid ? app.globalData.userid : 0
            
          })
        },
        success: function (res) {
          
          if(res.data.code==20000){
            // console.log(res.data)

                  wx.showToast({
                    title: '修改成功！',
                    icon: 'none',
                    duration: 1500,
                  })

                 

                  var tprice2 = 'cardbox_info.name'
                  var tprice3 = 'cardbox_info.description'
                  that.setData({
                    modalName: null,
                    [tprice2]: res.data.name,
                    [tprice3]: res.data.description,
                  })

                  

          }
          // let taskid = e.currentTarget.dataset.taskid
          

      
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
  gotodeteil_task(e) {

    let taskid = e.currentTarget.dataset.taskid
    let relation_id = e.currentTarget.dataset.relation_id

    // var that = this
    // console.log({ taskid, relation_id})
    // return
    if (taskid && taskid!=0){
      wx.navigateTo({
        url: '/pages/basics/task/task?taskid=' + taskid,
      })
    }else{
      wx.navigateTo({
        url: '/pages/basics/task/task?relation_type=card&taskid=0&relation_id=' + relation_id,
      })
    }
    

  },
  add_deteil_task(e) {

    var that = this 
    let taskid = e.currentTarget.dataset.taskid

    if(taskid!=0){
      return
    }
    let relation_id = e.currentTarget.dataset.relation_id
    // var that = this
    // console.log({ taskid, relation_id, gid, wcell_type})
    // return
    if(!app.globalData.userid){
      wx.showToast({
        title: '请登录！',
        icon: 'none',
        duration: 1000,
      })
      return
    }

    wx.showLoading({
      title: '添加中',
      // mask:true
    })
    wx.request({
      url:  app.globalData.url + '?act=taskin',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'X-Token': app.globalData.xtoken
      },
      data: {
        userid: app.globalData.userid,
        taskid: 0,
        isaddtask: 1,
        relation_type: 'card',
        relation_id:  relation_id,
        gid:  gid,
        wcell_type: wcell_type,
        status:0,
        sign:util.Md5Url({
          userid: app.globalData.userid,
          taskid: 0,
          isaddtask: 1,
          relation_type: 'card',
          relation_id:  relation_id,
          status:0,          
        })
      },
      success: function (res) {
          console.log(res.data.taskid)
          console.log(that.data.default_word_data)
        // res.data.word_data = util.Decrypt(res.data.word_data)
        if(res.data.taskid){

          var tprice = 'default_word_data.shizi_taskid'

          that.setData({
            [tprice]: res.data.taskid,
          })

          wx.showToast({
            title: '添加成功！',
            icon: 'none',
            duration: 2000,
          })

        }
        

      }, complete(res) {
       
        wx.hideLoading()
        //console.log(res.statusCode)
        if (res.statusCode == 500) {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 1500,
          })
        } else {

        }

      }
    });
    

  },

})