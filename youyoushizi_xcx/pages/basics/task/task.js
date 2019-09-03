const app = getApp()

Page({
  data: {
    taskdata: {
      "id": "01",
      "name": "第一课 燕子",
      "word1": [
        {
          "sw": "燕",
          "sw_sound": "voice/26/73/2673734f025fa484228e34212569c44a.wav",
          "dw": "燕子",
          "dw_sound": "voice/b7/b9/b7b9ff4e590029ef27b7b1aa0b225890.wav",
          "lw": "一身乌黑光亮的羽毛，一对俊俏轻快的翅膀，加上剪刀似的尾巴，凑成了活泼机灵的小燕子。",
          "lw_sound": "voice/9d/f4/9df48d5d68f9bd2cb9f649328a6c7f43.wav"
        },
        {
          "sw": "聚",
          "sw_sound": "voice/bb/e3/bbe314384b41246825a63ee0d592f028.wav",
          "dw": "聚拢",
          "dw_sound": "voice/28/f8/28f88368a520672c52800e89184b40e7.wav",
          "lw": "青的草，绿的叶，各色鲜艳的花，都像赶集似的聚拢来，形成了光彩夺目的春天。",
          "lw_sound": "voice/4d/cf/4dcf2e1b7484b6b137b04775c2cb976f.wav"
        }
      ]
    },
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current: 0,
    src: 'http://rms.youyoushizi.com:8088/course_voice/2/87/8a/878a9aaf0e242c3cdf61d4dc1a934fc0.mp4',
    loadModal: true,
    audiowordlist:[],
    audiodwordlist: [],
    audiolwordlist: [],
    taskloading:'50%',
    konw_current:20,
    type:0,
    subcurrent:0,
    tabs: [
      {
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
  },
  onLoad: function (options) {
   
    app.setUserInfo('about');
    
    console.log(options.taskid)

   

    console.log(options.type)

    var apiurl = ''
    var methd = 'POST'
    if (options.taskid ==0) {
      console.log(options)
      apiurl = app.globalData.url + '?act=taskin'
    }else{
      console.log(options)
      methd = 'GET'
      apiurl = app.globalData.url + '?act=taskone'
    }
    console.log(methd)
    console.log(apiurl)
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
          type: parseInt(options.type),
          taskid: parseInt(options.taskid),
          relation_type: options.relation_type,
          relation_id: parseInt(options.relation_id),
          gid: options.gid?parseInt(options.gid):0,
          wcell_type: options.wcell_type?parseInt(options.wcell_type):0,
          status:0
        },
        success: function (res) {
          console.log(res);
          
          var linktemp1 = []; var linktemp2 = []; var linktemp3 = [];
          res.data.word_data.word1.forEach(function (value, i) {
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

            //console.log( value);
          })

          console.log(linktemp1);
          // console.log(linktemp2);
          // console.log(linktemp1);

          that.setData({
            taskdata: res.data.word_data,
            audiowordlist: linktemp1,
            audiodwordlist: linktemp2,
            audiolwordlist: linktemp3,
            type: parseInt(res.data.taskinfo.type),
          })


        }, complete(res) {
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
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio')
    // console.log(this.data.taskdata);
    this.innerAudioContext = wx.createInnerAudioContext()
    // this.innerAudioContext.autoplay = true
    this.innerAudioContext.src =  this.data.src
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },


  change: function (e) {
    if ("touch" === e.detail.source) {  // 只在用户触发的情况下
      this.setData({
        current: e.detail.current
      })
    }
  },
  audioStart(e) {
    // console.log(11)
    // console.log(this.data.current)
    this.setData({
      current: 0
    })
  },
  audioend(e) {
    // console.log(11)
    // console.log(this.data.current)
    this.setData({
      current: this.data.taskdata.word1.length -1
    })
  },
  prev(e) {
    // console.log(11)
    // console.log(this.data.current)
    this.setData({
      current: this.data.current > 0 ? this.data.current - 1 : this.data.current
    })
    console.log(this.data.current)
  },
  next(e) {
    // console.log(11)
    // console.log(this.data.current)
      this.setData({
        current: this.data.current  < this.data.taskdata.word1.length-1 ? this.data.current + 1 : this.data.taskdata.word1.length-1
      })
    console.log(this.data.current)
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  audioPlay_word() {
    // console.log(this.data.current)
    this.data.audiowordlist[this.data.current].play()
  },
  audioPlay_dword() {
    this.setData({
      subcurrent: 1,
    })
    this.data.audiodwordlist[this.data.current].play()
  },
  audioPlay_lword() {
    this.setData({
      subcurrent: 2,
    })
    this.data.audiolwordlist[this.data.current].play()
  },
  onChangesegmented(e) {
    // console.log(e)
    // if (e.detail.key === this.key) {
    //   return wx.showModal({
    //     title: 'No switching is allowed',
    //     showCancel: !1,
    //   })
    // }
    this.setData({
      konw_current: e.detail.key,
    })
  },
  onTabsChange(e) {
    // console.log('onTabsChange', e)
    const { key } = e.detail
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
    const { key } = this.data.tabs[index]

    if (!!source) {
      this.setData({
        tabkey: key,
        subcurrent: index,
      })
    }
  },

})