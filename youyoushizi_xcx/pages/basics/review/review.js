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
  },
  onLoad: function (options) {
    console.log(options.nums)
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
          // 'content-type': 'application/x-www-form-urlencoded', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          userid: app.globalData.userid,
          nums: parseInt(nums)
        },
        success: function (res) {
          console.log(res);
          
          if (res.data.code === 20001) {
 
             wx.showToast({
              title: '没有要复习的数据！',
              icon: 'none',
              duration: 1500,
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }, 1000)

          }else{
            var linktemp1 = []; var linktemp2 = []; var linktemp3 = [];
            res.data.word_data.word1.forEach(function (value, i) {
              var innerAudioContext = null

              innerAudioContext = wx.createInnerAudioContext()
              innerAudioContext.src = value.sw_sound

              linktemp1.push(innerAudioContext)
              // linktemp2.push(value.dw_sound);
              // linktemp3.push(value.sw_sound);

              //console.log( value);
            })

            console.log(linktemp1);
            // console.log(linktemp2);
            // console.log(linktemp1);

            that.setData({
              taskdata: res.data.word_data,
              audiowordlist: linktemp1,
            })

          }
          


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
  audioPlay() {
    // console.log(this.data.current)
    this.data.audiowordlist[this.data.current].play()
    // this.innerAudioContext.play()
  }

})