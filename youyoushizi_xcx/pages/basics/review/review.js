var util = require('../../../utils/util.js')
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    toptitle: '复习',
    chuchu:'',
    taskdata: {
      "id": "01",
      "name": "第一课 燕子",
      "word1": []
    },
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current: 0,
    src: 'http://rms.youyoushizi.com:8088/course_voice/2/87/8a/878a9aaf0e242c3cdf61d4dc1a934fc0.mp4',
    loadModal: true,
    audiowordlist: [],
    audiodwordlist: [],
    audiolwordlist: [],
    taskloading: '0%',
    konw_current: [],
    konw_listinfo:[],
    konw_listinfo_title:[],
    type: 0,
    subcurrent: 0,
    tabs: [{
        key: 'tab1',
        title: '字',
      },
      {
        key: 'tab2',
        title: '词',
      },
      {
        key: 'tab3',
        title: '句',
      },
    ],
    taskid: 0,
    konw_list_radios: [],
    tingxie_auto: false,
    all_play_c: null,
    data_item_word: null,
    data_item_dword: null,
    audioword_object: null,
    audiodword_object: null,
    audiolword_object: null,
    button_loading_text: '',
    button_loading_auto: false,
    button_global_src: '',
    button_global_currt: 0,
    swiperheight: 300,
    task_wcell_type: 0,
    max_subcurrent: 2,
    middle_subcurrent: true
  },
  onLoad: function(options) {

    app.setUserInfo('about');

    var nums = options.nums
    var methd = 'GET'
    var apiurl = app.globalData.url + '?act=review_list'

    var that = this;
    if (app.globalData.userid) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })  
      wx.request({
        url: apiurl,
        method: methd,
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          userid: app.globalData.userid,
          nums: parseInt(nums)
        },
        success: function(res) {
           console.log(res); 

          if (res.data.code === 20001) {

            wx.showToast({
              title: '没有要复习的数据！',
              icon: 'none',
              duration: 1500,
            })
            setTimeout(function() {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }, 1000)

          } else {
      
            var konw_currenttemp = [];
            var konw_currenttemplist = [];
            var konw_currenttemplist_title = [];
            var tempkonw_list_radios = [];

            res.data.word_data.word1.forEach(function(value, i) {
             

              konw_currenttemplist.push(value.review_select_days)
              konw_currenttemp.push(20)

              var titletmep = [];
              value.review_select_days.forEach(function (value2, i2) { 
                titletmep.push(value2.name)
              })
              konw_currenttemplist_title.push(titletmep)
              //console.log( value);
              //新的单选按钮
              let titletmepaaa = [];
              value.review_select_days.forEach(function (value, i) { 
                let titletmepaaasub = {};
                titletmepaaasub = {
                  value: i,
                  isicon: false,
                  label: value.name}
                titletmepaaa.push(titletmepaaasub)
              })
              tempkonw_list_radios.push(titletmepaaa)

              //关键字标红 
              res.data.word_data.word1[i].lw_red = util.global_hilight_word(value.dw_xcx, value.lw_xcx)

            })

 

            // res.data.word_data.task_word_data_items.forEach(function(value, i) {
            // })

            // console.log(konw_currenttemplist_title);
            // console.log(linktemp1);
            // console.log(linktemp2);
            // console.log(linktemp1);

            that.setData({
              taskdata: res.data.word_data,
              konw_current: konw_currenttemp,
              konw_listinfo: konw_currenttemplist,
              konw_listinfo_title: konw_currenttemplist_title,
              konw_list_radios: tempkonw_list_radios,
              chuchu: res.data.word_data.word1[0].chuchu
            })
            // console.log(tempkonw_list_radios);

            that.auto_height()
          }

        },
        complete(res) {
          that.setData({

            loadModal: false
          })
           wx.hideLoading()
          //console.log(res.statusCode)
          if (res.statusCode == 500) {

          } else {

          }

        }
      });
    }

  },
  onReady(e) {

    var that = this

    this.setData({

      all_play_c: wx.createInnerAudioContext(),
      audioword_object: wx.createInnerAudioContext(),
      audiodword_object: wx.createInnerAudioContext(),
      audiolword_object: wx.createInnerAudioContext(),

    })
    var that = this
    //==============================================================
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
  onUnload(e) {

    var showTwo = this.selectComponent('#mytimes');
    console.log(showTwo.data.timenum)

    // 发送请求 统计学习时间
    wx.request({
      url: app.globalData.url + '?act=taskintime',
      method: "POST",
      data: {
        userid: app.globalData.userid ? app.globalData.userid : 0,
        taskid: 0,
        review: 1,
        duration: showTwo.data.timenum,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)

      }
    })

  },
  auto_height() {
    // console.log(type)
    var that = this
    let main_hight_head = 0
    let main_hight_common_icon_top = 0
    let main_hight_common_icon = 0
    let main_hight_shizi_know = 0
    let main_hight_tingxie_play = 0
    let main_hight_tingxie_setting = 0
    // wx.createSelectorQuery().select('#main_hight_head').boundingClientRect(function (res) {
    //   // 公共头部的高度
    //   // console.log(res)
    //   main_hight_head = res.height
    //   console.log('公共头部的高度' + main_hight_head)
    // }).exec()
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

  change: function(e) {
    this.setData({
      subcurrent: 0
    })
    if ("touch" === e.detail.source) { // 只在用户触发的情况下
      this.setData({
        current: e.detail.current
      })
    }

    this.setData({
      chuchu: this.data.taskdata.word1[this.data.current].chuchu,
      taskloading: util.GetPercent(e.detail.current, this.data.taskdata.word1.length - 1)
    })
    
    

  },
  audioStart(e) {
    this.setData({
      current: 0
    })
  },
  audioend(e) {
    this.setData({
      current: this.data.taskdata.word1.length - 1
    })
  },
  prev(e) {
    this.setData({
      current: this.data.current > 0 ? this.data.current - 1 : this.data.current
    })
    console.log(this.data.current)
  },
  next(e) {
    this.setData({
      current: this.data.current < this.data.taskdata.word1.length - 1 ? this.data.current + 1 : this.data.taskdata.word1.length - 1,
    })
    // console.log(this.data.current)
  },
  audioPlay_lword() {

    let item_lword_src = ''
    if (this.data.subcurrent == 0) {

      if (this.data.taskdata.word1[this.data.current].wcell_type == '25'){
        item_lword_src = this.data.taskdata.word1[this.data.current].dw_sound 
      }else{
        item_lword_src = this.data.taskdata.word1[this.data.current].ren_word_md5 ? this.data.taskdata.word1[this.data.current].ren_word_md5 : this.data.taskdata.word1[this.data.current].word_sound
      }
      

    } else if (this.data.subcurrent == 1) {

      if (this.data.taskdata.word1[this.data.current].wcell_type == '25') {

        item_lword_src = this.data.taskdata.word1[this.data.current].lw_sound

      } else {
        item_lword_src = this.data.taskdata.word1[this.data.current].dw_sound
      }
     

    } else if (this.data.subcurrent == 2) {

      item_lword_src = this.data.taskdata.word1[this.data.current].lw_sound

    }


     console.log(item_lword_src)


    if (this.data.button_global_src == item_lword_src && this.data.button_global_currt == this.data.current) {
      this.data.audiolword_object.stop()
    } else {
      this.data.audiolword_object.stop()
      this.data.audiolword_object.src = item_lword_src
      this.data.audiolword_object.play()
    }

  },
  
  onChangeKnow(e) {
    console.log(e.detail.value)
    // console.log(this.data.current)
    var tprice = 'konw_current[' + this.data.current + ']'
    this.setData({
      [tprice]: e.detail.value,
    })
    var tempwcellid = this.data.taskdata.word1[this.data.current].task_wcell_id
    var temp_fact = this.data.konw_listinfo[this.data.current][e.detail.value]
    // console.log(tempwcellid)
    // console.log(temp_fact)
    //发送请求 super 算法
    wx.request({
      url: app.globalData.url + '?act=taskinwcell_super',
      method: "POST",
      data: {
        userid: app.globalData.userid ? app.globalData.userid : 0,
        task_wcell_id: tempwcellid,
        day: temp_fact.value,
        quality: temp_fact.quality,
        factor: temp_fact.factor,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)

      }
    })

    var nextitem = this.data.current + 1 < this.data.taskdata.word1.length ? this.data.current + 1 : this.data.taskdata.word1.length - 1
    var that = this
    setTimeout(function () {
      that.setData({
        current: nextitem,
      })
    }, 500)

    if (this.data.current == this.data.taskdata.word1.length - 1) {
      wx.showToast({
        title: '本次识字已完成！',
        icon: 'none',
        duration: 1500,
      })
    }

   },
  onDownChange() {

    // console.log(this.data.max_subcurrent)
    let tempsubc = this.data.subcurrent + 1

    tempsubc = tempsubc > this.data.max_subcurrent ? this.data.max_subcurrent : tempsubc
    // console.log(tempsubc)
    if (tempsubc == this.data.max_subcurrent) {

      this.setData({
        middle_subcurrent: false,
      })
    }
    this.setData({
      subcurrent: tempsubc,
    })

  },
  onUpChange() {

    // console.log(this.data.max_subcurrent)
    let tempsubc = this.data.subcurrent - 1
    tempsubc = tempsubc < 0 ? 0 : tempsubc

    // console.log(tempsubc)
    if (tempsubc == 0) {

      this.setData({
        middle_subcurrent: true,
      })
    }
    this.setData({
      subcurrent: tempsubc,
    })

  },
  onTabsChange(e) {
    // console.log('onTabsChange', e)
    const {
      key
    } = e.detail
    console.log(key)
    const subcurrent = this.data.tabs.map((n) => n.key).indexOf(key)
    console.log(subcurrent)
    this.setData({
      tabkey: key,
      subcurrent: subcurrent,
    })
  },
  onSubSwiperChange(e) {

    // console.log('onSubSwiperChange', e)
    const { current: index, source } = e.detail

    if (!!source) {
      this.setData({
        // tabkey: key,
        subcurrent: index,
      })
    }
  },
  showModal_word_shiyi(e) {

    let that = this;
    let item_word = this.data.taskdata.word1[this.data.current]
    // console.log(item_word);

    let m = 'DrawerModalL_word'

    if (this.data.subcurrent > 0 && this.data.subcurrent < this.data.max_subcurrent) {
      m = 'DrawerModalL_dword'
    }
    // DrawerModalL_dword
    // this.setData({
    //   modalName: m,
    //   data_item_word: item_word,
    // })
    this.setData({
      modalName: m, 
      isloaditem: true
    })

    let wcellid = item_word.wcellid
    let dw_xcx = item_word.dw_xcx
    let wcell_type = item_word.wcell_type
    // console.log(item_word)
    // console.log({wcellid,dw_xcx,wcell_type})

    wx.request({
      url: app.globalData.url + '?act=global_item_word_shiyi',
      data: {
        wcellid: wcellid,
        dw_xcx: dw_xcx,
        wcell_type: wcell_type,
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        //  console.log(res.data) 
        that.setData({
          data_item_word: res.data.items,
        })
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
  play_any_src(e) {
    let src = e.currentTarget.dataset.msrc

    console.log(src);
    // let innerAudioContext = wx.createInnerAudioContext()
    // this.data.all_play_c.stop()
    this.data.all_play_c.src = src
    this.data.all_play_c.play()
    // console.log(this.innerAudioContext.duration);

  },


})