var util = require('../../../utils/util.js')
const app = getApp()

Page({
  data: {
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
  },
  onLoad: function(options) {

    app.setUserInfo('about');

    var nums = options.nums
    var methd = 'GET'
    var apiurl = app.globalData.url + '?act=review_list'

    var that = this;
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

            var linktemp1 = [];
            var linktemp2 = [];
            var linktemp3 = [];
            var konw_currenttemp = [];
            var konw_currenttemplist = [];
            var konw_currenttemplist_title = [];
            var tempkonw_list_radios = [];

            res.data.word_data.word1.forEach(function(value, i) {
              var innerAudioContext = null
              innerAudioContext = wx.createInnerAudioContext()
              innerAudioContext.src = value.sw_sound
              linktemp1.push(innerAudioContext)

              var innerAudioContext2 = null
              innerAudioContext2 = wx.createInnerAudioContext()
              innerAudioContext2.src = value.dw_sound
              linktemp2.push(innerAudioContext2)

              var innerAudioContext3 = null
              innerAudioContext3 = wx.createInnerAudioContext()
              innerAudioContext3.src = value.lw_sound
              linktemp3.push(innerAudioContext3)

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

            })

 

            // res.data.word_data.task_word_data_items.forEach(function(value, i) {
            // })

            console.log(konw_currenttemplist_title);
            // console.log(linktemp1);
            // console.log(linktemp2);
            // console.log(linktemp1);

            that.setData({
              taskdata: res.data.word_data,
              audiowordlist: linktemp1,
              audiodwordlist: linktemp2,
              audiolwordlist: linktemp3,
              konw_current: konw_currenttemp,
              konw_listinfo: konw_currenttemplist,
              konw_listinfo_title: konw_currenttemplist_title,
              konw_list_radios: tempkonw_list_radios,
              chuchu: res.data.word_data.word1[0].chuchu
            })
            console.log(tempkonw_list_radios);

          }

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
      });
    }

  },
  onReady(e) {
  

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


  change: function(e) {
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
  audioPlay_word() {
    // console.log(this.data.current)
    this.setData({
      subcurrent: 0,
      tabkey: this.data.tabs[0].key
    })
    this.data.audiowordlist[this.data.current].play()
  },
  audioPlay_dword() {

    this.setData({
      subcurrent: 1,
      tabkey: this.data.tabs[1].key
    })
    console.log(this.data.tabkey)
    this.data.audiodwordlist[this.data.current].play()
  },
  audioPlay_lword() {
    this.setData({
      subcurrent: 2,
      tabkey: this.data.tabs[2].key
    })
    this.data.audiolwordlist[this.data.current].play()
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
    console.log(tempwcellid)
    console.log(temp_fact)
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
  // onChangesegmented(e) {
  //   console.log(e.detail.key)
  //   // console.log(this.data.current)
  //   var tprice = 'konw_current[' + this.data.current + ']'
  //   this.setData({
  //     [tprice]: e.detail.key,
  //   })
    
  //   var tempwcellid = this.data.taskdata.word1[this.data.current].task_wcell_id
  //   var temp_fact = this.data.konw_listinfo[this.data.current][e.detail.key]
  //   console.log(tempwcellid)
  //   console.log(temp_fact)
  //   //发送请求 super 算法
  //   wx.request({
  //     url: app.globalData.url + '?act=taskinwcell_super',
  //     method: "POST",
  //     data: {
  //       userid: app.globalData.userid ? app.globalData.userid : 0,
  //       task_wcell_id: tempwcellid,
  //       day: temp_fact.value,
  //       quality: temp_fact.quality,
  //       factor: temp_fact.factor,
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'X-Token': app.globalData.xtoken
  //     },
  //     success(res) {

  //       console.log(res.data)

  //     }
  //   })

  //   var nextitem = this.data.current + 1 < this.data.taskdata.word1.length ? this.data.current + 1 : this.data.taskdata.word1.length - 1
  //   var that = this
  //   setTimeout(function() {
  //     that.setData({
  //       current: nextitem,
  //     })
  //   }, 500)

  //   if (this.data.current == this.data.taskdata.word1.length - 1) {
  //     wx.showToast({
  //       title: '本次识字已完成！',
  //       icon: 'none',
  //       duration: 1500,
  //     })
  //   }

  // },
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
    const {
      current: index,
      source
    } = e.detail
    const {
      key
    } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        tabkey: key,
        subcurrent: index,
      })
    }
  },


})