
Page({
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio')

    this.innerAudioContext = wx.createInnerAudioContext()
    // this.innerAudioContext.autoplay = true
    this.innerAudioContext.src = '/'+this.data.taskdata.word1[0].sw_sound
    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
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
        },
        {
          "sw": "增",
          "sw_sound": "voice/c0/a0/c0a0f275a8323b1b3a2ee07f821f11ec.wav",
          "dw": "增添",
          "dw_sound": "voice/94/6a/946a2e8a645b34a3f58a35c705c956a2.wav",
          "lw": "小燕子从南方赶来，为春光增添了许多生机。",
          "lw_sound": "voice/17/7b/177bb4ea7913763edf851b9265b8b8d7.wav"
        },
        {
          "sw": "掠",
          "sw_sound": "voice/5c/4f/5c4f4923a63f25137f2e7eb5bc41d5ad.wav",
          "dw": "掠过",
          "dw_sound": "voice/18/53/1853946cc3eb1cb39018f0497d4404ee.wav",
          "lw": "燕子斜着身子在天空中掠过",
          "lw_sound": "voice/67/2a/672acd376b83e2fce654e582a224cea5.wav"
        }
      ]},
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current:0,
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
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
    this.innerAudioContext.play()
  }

})