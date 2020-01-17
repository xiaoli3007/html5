import { $wuxDialog } from '../../../dist/index'

var util = require('../../../utils/util.js')

const app = getApp()

Page({
  data: {
    tasjlisturl: '/pages/basics/tasklist/tasklist',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    toptitle:'卡片任务',
    taskdata: null,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current: 0,
    loadModal: true,
    taskloading:'0%',
    konw_current:[],
    type:0,
    subcurrent:0,
    taskid:0,
    boxid:0,
    all_play_c:null,
    audiolword_object: null,
    button_loading_text: '',
    button_loading_auto:false,
    button_global_src: '',
    button_global_currt:0,
    konw_select_menu: [
      {
        value: '1',
        isicon: true,
        label: 'proIcon-iconico_rs',
      },
      {
        value: '2',
        isicon: true,
        label: 'proIcon-iconico_brs',
      },

    ],
    swiperheight:300,
    // max_subcurrent: 2,
    // middle_subcurrent: true,
    error_list: [],
    data_item_word: null,
    data_item_dword: null,
    data_item_chengyu: null,
    data_item_word_miyu:null,
    box_info:null,
    card_back_show:false
  },
  onLoad: function (options) {
   
    app.setUserInfo('about');  
    // console.log(options.taskid)
     console.log(options)
    var methd = 'GET'
    var apiurl = app.globalData.url2 + '?act=taskbox'
    
    // console.log(methd)
    // console.log(apiurl)
    var that = this;
    wx.showLoading({
      title: '加载中',
      // mask:true
    })
    if (app.globalData.userid) {

      wx.request({
        url: apiurl,
        method: methd,
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          userid: app.globalData.userid,
          boxid: options.boxid?parseInt(options.boxid):0,
          sign:util.Md5Url({
            userid: app.globalData.userid,
            boxid: options.boxid?parseInt(options.boxid):0,          
          })
        },
        success: function (res) {
            console.log(res.data)
          // res.data.word_data = util.Decrypt(res.data.word_data)
           //setTimeout(function () { 
          //进行状态中的进度跳转================================================
          // if (res.data.taskinfo.status=='1'){
          //   let temp_progress_wcellid = null

          //   if (res.data.word_data.survey) {
          //      temp_progress_wcellid = res.data.word_data.survey.progress_wcellid 
          //   }
          //   // console.log(temp_progress_wcellid )
          //   if (temp_progress_wcellid){
          //     let temp_goto_index = 0
          //     res.data.word_data.word1.forEach(function (value, i) {
          //       if (value.wcellid === temp_progress_wcellid) {
          //         temp_goto_index = i+1
          //       }
          //     })
          //     if (temp_goto_index>0) {
          //       let c_go = temp_goto_index > res.data.word_data.word1.length - 1 ? res.data.word_data.word1.length - 1 : temp_goto_index
          //       that.setData({
          //         current: c_go,
          //         taskloading: util.GetPercent(c_go, res.data.word_data.word1.length - 1)
          //       })
          //     }
          //   }
          // }
          //进行状态中的进度跳转============end================================
          var konw_currenttemp = []; var temp_error_list = [];
          var cardback_showlist = [] 
          res.data.word_data.forEach(function (value, i) {
            let wstatus = value.status == '0' ? 20 : value.status
            konw_currenttemp.push(wstatus)
            temp_error_list.push(false)

            let temp_back_list= [] 
            value.forEach(function (value2, i2) {
              temp_back_list.push(false)
            })
            cardback_showlist.push(temp_back_list)

          })
   
          console.log(cardback_showlist)

          // res.data.word_data.word1.forEach(function (value, i) {
          //   res.data.word_data.word1[i].lw_red = that.hilight_word(value.dw_xcx, value.lw_xcx)
          // })
          that.setData({
            error_list: temp_error_list,
            taskdata: res.data.word_data,
            konw_current: konw_currenttemp,
            boxid: res.data.box_info.id,
            box_info: res.data.box_info,
           // max_subcurrent: parseInt(res.data.taskinfo.wcell_type) == 25 ? 1 : 2,
          })
          that.auto_height()

       //}, 500)

        }, complete(res) {
          that.setData({

            loadModal: false
          })
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
    }

    

  },
  onReady(e) {

    // const query = wx.createSelectorQuery().in(this) 在组件中这样
    var that = this

    this.setData({
      all_play_c: wx.createInnerAudioContext(),
      audiolword_object: wx.createInnerAudioContext(),
    })
    var that = this 
    this.data.audiolword_object.onError(() => {
      that.setData({
        button_loading_text: '加载语音失败！',
        button_loading_auto: true
      })
    })
    this.data.audiolword_object.onWaiting(() => {
      that.setData({
        button_loading_text: '加载语音...',
        button_loading_auto: true
      })
    })
    this.data.audiolword_object.onPlay(() => {
      // console.log(that.data.audiolword_object.src)
      that.setData({
        button_loading_text: '播放语音中...',
        button_loading_auto: true,
        button_global_src: that.data.audiolword_object.src,
        button_global_currt: that.data.current,
      })
      
    })
    this.data.audiolword_object.onEnded(() => {
      that.setData({
        button_loading_text: '播放结束...',
        button_loading_auto: false,
        button_global_src: ''
      })
    })
    this.data.audiolword_object.onStop(() => {
      that.setData({
        button_loading_text: '播放结束...',
        button_loading_auto: false,
        button_global_src: ''
      })
    })

  },
  onShow(e) {

    // console.log(this.data.type)
  },
  onUnload(e) {
    var showTwo = this.selectComponent('#mytimes');
    console.log(showTwo.data.timenum)

    // 发送请求 统计学习时间
    // wx.request({
    //   url: app.globalData.url + '?act=taskintime',
    //   method: "POST",
    //   data: {
    //     userid: app.globalData.userid ? app.globalData.userid : 0,
    //     taskid: this.data.taskid,
    //     review: 0,
    //     duration: showTwo.data.timenum,
    //     sign:util.Md5Url({
    //       userid: app.globalData.userid ? app.globalData.userid : 0,
    //       taskid: this.data.taskid,
    //       review: 0,
    //       duration: showTwo.data.timenum
    //     })
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'X-Token': app.globalData.xtoken
    //   },
    //   success(res) {

    //     console.log(res.data)

    //   }
    // })

  },
  auto_height() {
    // console.log(type)
    var that = this 
    let main_hight_head = 0
    let main_hight_common_icon_top = 0
    let main_hight_common_icon = 0
    let main_hight_shizi_know = 0
    wx.createSelectorQuery().select('#main_hight_common_icon').boundingClientRect(function (res) {
      // 公共图标的高度
      // console.log(res)
      main_hight_common_icon_top = res.top
      main_hight_common_icon = res.height
      // console.log('公共图标的上边距度' + res.top)
      // console.log('公共图标的高度' + res.height)

    }).exec()
    wx.createSelectorQuery().select('#main_hight_shizi_know').boundingClientRect(function (res) {
      // 识字对错的高度
      main_hight_shizi_know = res.height
      // console.log('识字对错的高度' + res.height)

      let tempswiperheight = app.globalData.windowHeight - (main_hight_common_icon_top + main_hight_common_icon + main_hight_shizi_know) 
      // console.log('算出来的高度为' + tempswiperheight)
      
      that.setData({
        swiperheight: tempswiperheight
      })

    }).exec()     

  },

  change: function (e) {

    this.setData({
      subcurrent: 0,
      card_back_show: false,
    })
    if ("touch" === e.detail.source) {  // 只在用户触发的情况下
      this.setData({
        current: e.detail.current
      })
    }
    // this.setData({
    //   current: e.detail.current
    // })
    this.setData({
      taskloading: util.GetPercent(e.detail.current, this.data.taskdata.length-1)
    })
  },
  audioPlay_lword() {
    
    console.log(this.data.current)
    console.log(this.data.subcurrent)

    let item_lword_src = ''
    
    item_lword_src =  this.data.taskdata[this.data.current][this.data.subcurrent].sound 

    console.log(item_lword_src)
    if(item_lword_src!=''){
      if (this.data.button_global_src == item_lword_src && this.data.button_global_currt == this.data.current ) {
        this.data.audiolword_object.stop()
      }else{
        this.data.audiolword_object.stop()
        this.data.audiolword_object.src = item_lword_src
        this.data.audiolword_object.play()
      }
    }
      
  },

  onChangeKnow(e) {
    // console.log(e.detail)
    // console.log(this.data.current)
    var tprice = 'konw_current[' + this.data.current + ']'
    this.setData({
      [tprice]: e.detail.value,
    })

    // var tempwcellid = this.data.taskdata[this.data.current].wcellid
    // //识字认识不认识 发送请求
    // wx.request({
    //   url: app.globalData.url + '?act=taskinwcell',
    //   method: "POST",
    //   data: {
    //     userid: app.globalData.userid ? app.globalData.userid : 0,
    //     taskid: this.data.taskid,
    //     wcellid: tempwcellid,
    //     status: e.detail.value,
    //     sign:util.Md5Url( {
    //       userid: app.globalData.userid ? app.globalData.userid : 0,
    //       taskid: this.data.taskid,
    //       wcellid: tempwcellid,
    //       status: e.detail.value
    //     })
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'X-Token': app.globalData.xtoken
    //   },
    //   success(res) {

    //     // console.log(res.data)

    //   }
    // })

    var nextitem = this.data.current + 1 < this.data.taskdata.length ? this.data.current + 1 : this.data.taskdata.length - 1
    var that = this
    setTimeout(function () {
      that.setData({
        current: nextitem,
      })
    }, 500)

    if (this.data.current == this.data.taskdata.length - 1) {
 
      this.shizi_end_back()
    }

  },
  onSubSwiperChange(e) {
    
    // console.log('onSubSwiperChange', e)
    const { current: index, source } = e.detail 
    if (!!source) {
      this.setData({
        // tabkey: key,
        subcurrent: index,
        card_back_show: false,
      })
    }
  },
  card_back(e) {

    let item_word = this.data.taskdata[this.data.current][this.data.subcurrent]  
    if(!this.data.card_back_show ==true && item_word.card_back==''){
        
      wx.showToast({
        title: '无背面',
        icon: 'none',
        duration: 1500,
      })
       return
    }
      this.setData({
        card_back_show: !this.data.card_back_show,
      })
    
  },
  onMyEvent: function () {
     // 自定义组件触发事件时提供的detail对象
    // console.log(e)
    var showTwo = this.selectComponent('#mytimes');
    // console.log(showTwo.data.timenum)
  }, 
 
  showModal_word_shiyi(e) {

    let that = this;
    let item_word = this.data.taskdata[this.data.current][this.data.subcurrent]  
   
    if(item_word.type=='' || item_word.card==''){
      return
    }
    let m = 'DrawerModalL_'+item_word.type
    
  
    // let textcard = item_word.card
    console.log(item_word) 
    wx.request({
      url: app.globalData.url + '?act=global_item_card_shiyi',
      data: {
        textcard: item_word.card,
        type: item_word.type,
        userid: app.globalData.userid,
        sign:util.Md5Url( {
          textcard: item_word.card,
          type: item_word.type,
          userid: app.globalData.userid
        })
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        //  console.log(res.data) 
        if(res.data.code==20000){
          res.data.items = util.Decrypt(res.data.items)
          
          if(item_word.type=='word'){
            that.setData({
              data_item_word: res.data.items,
            })

          }
          if(item_word.type=='dword'){
            that.setData({
              data_item_dword: res.data.items,
            })

          }
     
          // that.setData({
          //   data_item_chengyu: res.data.items,
          // })

          

          that.setData({
            modalName: m, 
            isloaditem: true
          })
        }else{

          wx.showToast({
            title: '暂无释义',
            icon: 'none',
            duration: 1500,
          })


        }
        

      },
      complete(res) {
        that.setData({
          isloaditem: false
        })
        
      }
    })

  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  post_word_error(e) {

    var tprice = 'error_list[' + this.data.current + ']'
    this.setData({
      [tprice]: true,
    })

    let item_word = this.data.taskdata[this.data.current]
    let bookcellid = item_word.bookcellid
    //  console.log(item_word);

    wx.request({
      url: app.globalData.url + '?act=book_error',
      method: "POST",
      data: {
        userid: app.globalData.userid ? app.globalData.userid : 0,
        bookcellid: bookcellid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        // console.log(res.data)
        if (res.data.code === 20000) {

          wx.showToast({
            title: '此页面的内容错误已通知管理员，谢谢你的反馈！',
            icon: 'none',
            duration: 1500,
          })

        } else {
         

        }
        

      }
    })
  },
  shizi_end_back() {

    var that = this
    $wuxDialog().open({
      resetOnClose: true,
      // title: '',
      content: '您好！识字已结束',
      buttons: [
      {
        text: '返回任务列表',
        type: 'primary',
        onTap(e) {
          console.log('你选择了返回任务列表！')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/basics/tasklist/tasklist',
            })
          }, 500)
        },
      },
      {
        text: '取消',
      },
      ],
    })
  },
  showModal_word_miyu(e) {

    let that = this;

    let item_word = this.data.taskdata[this.data.current][this.data.subcurrent]
    this.setData({
      modalName: e.currentTarget.dataset.target, 
      // isloaditem: true
    })
    
   
     console.log(item_word)
   
    wx.request({
      url: app.globalData.url + '?act=global_item_word_miyu',
      data: {
        word: item_word.card,
        userid: app.globalData.userid,
        sign:util.Md5Url( {
          word: item_word.card,
          userid: app.globalData.userid
        })
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        //  console.log(res.data) 
        if(res.data.items!=''){
          res.data.items = util.Decrypt(res.data.items)
        }else{
          res.data.items = null
        }
       
        that.setData({
          data_item_word_miyu: res.data.items,
        })
      },
      complete(res) {
        // that.setData({
        //   isloaditem: false
        // })
        
      }
    })

  },
 
  

})