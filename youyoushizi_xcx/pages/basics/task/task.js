import { $wuxDialog } from '../../../dist/index'

var util = require('../../../utils/util.js')


const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    toptitle:'听写任务',
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
    src: 'https://rmsp.youyoushizi.com/course_voice/2/87/8a/878a9aaf0e242c3cdf61d4dc1a934fc0.mp4',
    ceshisrc:'http://rmsp.youyoushizi.com/course_voice/2/96/ef/96efdd4349ebac426a83730767cbf808.mp4',
    loadModal: true,
    audiowordlist:[],
    audiodwordlist: [],
    audiolwordlist: [],
    taskloading:'0%',
    konw_current:[],
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
    taskid:0,
    tingxie_auto: false,
    tingxie_text_hide:false,
    tingxie_loop: 2,
    tingxie_loop_time: 3,
    tingxie_ready: false,
    tingxie_ready_text: 'Ready',
    all_play_c:null,
    data_item_word: null,
    data_item_dword: null,
    audioword_object: null,
    audiodword_object: null,
    audiolword_object: null,
    tingxie_loading_text: '',
    button_loading_text: '',
    button_loading_auto:false,
    button_global_src: '',
  },
  onLoad: function (options) {
   
    app.setUserInfo('about');
    
    // console.log(options.taskid)

   

    // console.log(options.type)

    var apiurl = ''
    var methd = 'POST'
    if (options.taskid ==0) {
      console.log(options)
      apiurl = app.globalData.url + '?act=taskin'
    }else{
      // console.log(options)
      methd = 'GET'
      apiurl = app.globalData.url + '?act=taskone'
    }
    // console.log(methd)
    // console.log(apiurl)
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
          // res.data.word_data.word1.forEach(function (value, i) {
          //   var innerAudioContext = null
          //   innerAudioContext = wx.createInnerAudioContext()
          //   innerAudioContext.src = value.sw_sound
          //   linktemp1.push(innerAudioContext)

          //   var innerAudioContext2 = null
          //   innerAudioContext2 = wx.createInnerAudioContext()
          //   innerAudioContext2.src = value.dw_sound
          //   linktemp2.push(innerAudioContext2)

          //   var innerAudioContext3 = null
          //   innerAudioContext3 = wx.createInnerAudioContext()
          //   innerAudioContext3.src = value.lw_sound
          //   linktemp3.push(innerAudioContext3)

          //   //console.log( value);
          // })

          var konw_currenttemp = [];
          res.data.word_data.task_word_data_items.forEach(function (value, i) {
            // console.log(value);
            let wstatus = value.status == '0'?20:value.status =='1'?0:1
            konw_currenttemp.push(wstatus)
            //console.log( value);
          })

          // console.log(konw_currenttemp);

          // console.log(linktemp1);
          // console.log(linktemp2);
          // console.log(linktemp1);

          that.setData({
            taskdata: res.data.word_data,
            audiowordlist: linktemp1,
            audiodwordlist: linktemp2,
            audiolwordlist: linktemp3,
            type: parseInt(res.data.taskinfo.type),
            konw_current: konw_currenttemp,
            taskid: res.data.taskid,
            toptitle: res.data.taskinfo.type=='1'?'听写任务':'识字任务',
            tingxie_auto: parseInt(res.data.taskinfo.type)==1?true:false,
            tingxie_text_hide: parseInt(res.data.taskinfo.type) == 1 ? true : false,
          })
          // console.log(konw_currenttemp);
          // console.log(that.data.type)
          //听写模式开始
          if (parseInt(res.data.taskinfo.type) == 1){
              that.tingxie_start()
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
    // let innerAudioContext = wx.createInnerAudioContext()
    // // this.innerAudioContext.autoplay = true
    // innerAudioContext.src =  this.data.src
    // innerAudioContext.onCanplay(() => {
    //   // 必须。可以当做是初始化时长
    //   innerAudioContext.duration;
    //   // 必须。不然也获取不到时长
    //   setTimeout(() => {
    //     console.log(innerAudioContext.duration); // 401.475918
    //   }, 100)
    // }) 
    // console.log(this.innerAudioContext.duration);
    this.setData({

      all_play_c: wx.createInnerAudioContext(),
      audioword_object: wx.createInnerAudioContext(),
      audiodword_object: wx.createInnerAudioContext(),
      audiolword_object: wx.createInnerAudioContext(),

    })
    var that = this 
    this.data.audioword_object.onError(() => {
      that.setData({
        button_loading_text: '加载语音失败！',
        button_loading_auto:true
      })
    })
    this.data.audioword_object.onWaiting(() => {
      that.setData({
        button_loading_text: '加载语音...',
        button_loading_auto: true
      })
    })
    this.data.audioword_object.onPlay(() => {
        that.setData({
          button_loading_text: '播放语音中...',
          button_loading_auto: true,
          button_global_src: that.data.audioword_object.src
        })
    })
    this.data.audioword_object.onEnded(() => {
        that.setData({
          button_loading_text: '播放结束...',
          button_loading_auto: false,
          button_global_src: ''
        })
    })
    this.data.audioword_object.onStop(() => {
      that.setData({
        button_loading_text: '播放结束...',
        button_loading_auto: false,
        button_global_src: ''
      })
    })
  //============================================================
    this.data.audiodword_object.onError(() => {
      that.setData({
        button_loading_text: '加载语音失败！',
        button_loading_auto: true
      })
    })
    this.data.audiodword_object.onWaiting(() => {
      that.setData({
        button_loading_text: '加载语音...',
        button_loading_auto: true
      })
    })
    this.data.audiodword_object.onPlay(() => {
      
      that.setData({
        button_loading_text: '播放语音中...',
        button_loading_auto: true,
        button_global_src: that.data.audiodword_object.src
      })
    })
    this.data.audiodword_object.onEnded(() => {
      that.setData({
        button_loading_text: '播放结束...',
        button_loading_auto: false,
        button_global_src: ''
      })
    })
    this.data.audiodword_object.onStop(() => {
      that.setData({
        button_loading_text: '播放结束...',
        button_loading_auto: false,
        button_global_src: ''
      })
    })
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
        button_global_src: that.data.audiolword_object.src
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

    console.log(this.data.type)
  },
  onUnload(e) {
    this.tingxie_stop()
    var showTwo = this.selectComponent('#mytimes');
    console.log(showTwo.data.timenum)

    // 发送请求 统计学习时间
    wx.request({
      url: app.globalData.url + '?act=taskintime',
      method: "POST",
      data: {
        userid: app.globalData.userid ? app.globalData.userid : 0,
        taskid: this.data.taskid,
        review: 0,
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
  tingxie_start() {

    if (this.data.current == this.data.taskdata.word1.length - 1) {
      this.setData({
        current: 0,
      })
    }
    this.setData({
      // autoplay: true,
      // interval: 12000,
      tingxie_auto: true,
    })

    this.setData({
      tingxie_ready: true,
    })
    // wx.showToast({
    //   title: '准备开始！',
    //   icon: 'none',
    //   duration: 1500,
    // })
   

    var that= this

    setTimeout(function () {
      that.setData({
        tingxie_ready_text: 'Go!',
      })
      setTimeout(function () {
        that.setData({
          tingxie_ready: false,
          
        })
      }, 1000)
    }, 2000)

   

    console.log(that.data.current)
    setTimeout(function () {
      that.loopVoice(that.data.current, that.data.tingxie_loop, that.data.tingxie_loop_time)
    }, 3000)

  },

  tingxie_stop() {

    this.setData({
      // autoplay: false,
      tingxie_auto: false,
    })
    this.setData({
      tingxie_ready_text: 'Ready',
    })

  },
  tingxie_loop() {

    if (this.data.tingxie_auto) {
      let t_c = this.data.current+1
      if (t_c > this.data.taskdata.word1.length - 1) {
        this.tingxie_stop()
        this.tingxie_end_open()
      }else{
        this.setData({
          current: t_c,
        })
        console.log(t_c)
        this.loopVoice(t_c, this.data.tingxie_loop, this.data.tingxie_loop_time)
      }

      
    }
    
  },

  tingxie_text_show_hide() {

    this.setData({
      tingxie_text_hide: !this.data.tingxie_text_hide
    })

  },
  tingxie_change_tingxie_loop(){
    let t_tingxie_loop = this.data.tingxie_loop + 1 > 3 ? 1 : this.data.tingxie_loop + 1
    this.setData({
      tingxie_loop: t_tingxie_loop
    })

  },
  tingxie_change_tingxie_loop_time() {

    let t_tingxie_loop_time = this.data.tingxie_loop_time + 1 > 5 ? 1 : this.data.tingxie_loop_time + 1

    this.setData({
      tingxie_loop_time: t_tingxie_loop_time
    })

  },
  change: function (e) {
    if ("touch" === e.detail.source) {  // 只在用户触发的情况下
      this.setData({
        current: e.detail.current
      })
    }
    // this.setData({
    //   current: e.detail.current
    // })

    this.setData({
      taskloading: util.GetPercent(e.detail.current, this.data.taskdata.word1.length-1)
    })
  },
   loopVoice(index, maxtimes,timer) {

     
      // let secondIAC = this.data.audiowordlist[index]

     var secondIAC = null
     secondIAC = wx.createInnerAudioContext()
     secondIAC.src = this.data.taskdata.word1[index].sw_sound

      var that = this
    
    
    //  secondIAC.loop = false 
    //  secondIAC.obeyMuteSwitch = false
      secondIAC.onError(() => {
        // wx.showToast({
        //     icon: 'none',
        //     title: '加载失败',
        //   })
        that.setData({
          tingxie_loading_text: '加载语音失败...',
        })

        })
    
      let times = 0
     secondIAC.onWaiting(() => {
       console.log("加载语音" + index)
       that.setData({
         tingxie_loading_text: '加载语音...',
       })
     })
      secondIAC.onPlay(() => {
        console.log("播放onPlay" + index + '几次' + times)
        
        if (this.data.tingxie_auto) {
          that.setData({
            tingxie_loading_text: '播放语音中...',
          })
          times++
        }else{
          secondIAC.destroy()
        }
         
        })
      secondIAC.onEnded(() => {
        console.log("播放onEnded" + index + '几次' + times)
          if (times === maxtimes) {
            secondIAC.destroy()
            // secondIAC.stop()
            that.setData({
              tingxie_loading_text: '播放结束，准备播放下一个...',
            })
            setTimeout(function () {
              that.tingxie_loop() //进入下一个
            }, timer * 1000)
          }else{

            // secondIAC.seek(0)
            if (this.data.tingxie_auto) {
              that.setData({
                tingxie_loading_text: '播放结束...',
              })
              setTimeout(function () {
                secondIAC.play()
              }, timer * 1000)
            }
          }
          
        })
     console.log("第一次播放" + index)
      secondIAC.play()
     console.log("第一次结束播放" + index)
  },

  audioStart(e) {
    // console.log(11)
    // console.log(this.data.current)
    this.setData({
      current: 0,
     
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
    // console.log(this.data.current)
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
  audioPlay_allstop() {
     
    this.data.audiowordlist.forEach(function (value, i) {
      value.stop()
    })
    this.data.audiodwordlist.forEach(function (value, i) {
      value.stop()
    })
    this.data.audiolwordlist.forEach(function (value, i) {
      // console.log(value.currentTime);
      value.stop()
    })
    console.log(this.data.current)
    // this.data.audiolwordlist[this.data.current].stop()
  },
  audioPlay_word() {
    // 
    // this.audioPlay_allstop()
    this.setData({
      subcurrent: 0,
      tabkey: this.data.tabs[0].key
    })
    // this.data.audiowordlist[this.data.current].play()
    let item_word_src = this.data.taskdata.word1[this.data.current].sw_sound

    this.data.audiolword_object.stop()
    this.data.audiodword_object.stop()
    // this.data.audioword_object.stop()
    
    if (this.data.button_global_src == item_word_src) {
      this.data.audioword_object.stop()
    } else {
      this.data.audioword_object.src = item_word_src
      this.data.audioword_object.play()
    }
  },
  audioPlay_dword() {
    // this.audioPlay_allstop()
    this.setData({
      subcurrent: 1,
      tabkey: this.data.tabs[1].key
    })
    
    // this.data.audiodwordlist[this.data.current].play()
    let item_dword_src = this.data.taskdata.word1[this.data.current].dw_sound

    this.data.audiolword_object.stop()
    // this.data.audiodword_object.stop()
    this.data.audioword_object.stop()

    if (this.data.button_global_src == item_dword_src) {
      this.data.audiodword_object.stop()
    } else {
      this.data.audiodword_object.src = item_dword_src
      this.data.audiodword_object.play()
    }
    
  },
  audioPlay_lword() {
    //  this.audioPlay_allstop()
    this.setData({
      subcurrent: 2,
      tabkey: this.data.tabs[2].key
    })
    console.log(this.data.button_global_src)
    // this.data.audiolwordlist[this.data.current].play()
    let item_lword_src = this.data.taskdata.word1[this.data.current].lw_sound
    
    
    this.data.audiodword_object.stop()
    this.data.audioword_object.stop()
    if (this.data.button_global_src == item_lword_src) {
      this.data.audiolword_object.stop()
    } else {
      this.data.audiolword_object.src = item_lword_src
      this.data.audiolword_object.play()
    }
    
  },
  onChangesegmented(e) {
    // console.log(e.detail.key)
    // console.log(this.data.current)
    var tprice = 'konw_current['+this.data.current+']'
    this.setData({
      [tprice]: e.detail.key,
    })
    // console.log(this.data.konw_current)

    var tempwcellid = this.data.taskdata.word1[this.data.current].wcellid
    //识字认识不认识 发送请求
    wx.request({
      url: app.globalData.url + '?act=taskinwcell', 
      method: "POST",
      data: {
        userid: app.globalData.userid ? app.globalData.userid : 0,
        taskid:this.data.taskid,
        wcellid: tempwcellid,
        status: e.detail.key==0?1:2,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)
      
      }
    })

    var nextitem = this.data.current + 1 < this.data.taskdata.word1.length ? this.data.current + 1 : this.data.taskdata.word1.length -1
    var that = this 
    setTimeout(function () {
      that.setData({
        current: nextitem,
      })
    }, 500)

    if (this.data.current == this.data.taskdata.word1.length - 1){
      wx.showToast({
        title: '本次识字已完成！',
        icon: 'none',
        duration: 1500,
      })
    }

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
  onMyEvent: function () {
     // 自定义组件触发事件时提供的detail对象
    // console.log(e)
    var showTwo = this.selectComponent('#mytimes');
    console.log(showTwo.data.timenum)
  }, 
  backquiet: function () {
    console.log(1111)
    
  },
  tingxie_end_open() {
    
    var that = this 
    $wuxDialog().open({
      resetOnClose: true,
      // title: '',
      content: '您好！听写已结束',
      buttons: [{
        text: '重新开始',
        type: 'primary',
        onTap(e) {
          console.log('你选择了重新开始！')
          that.tingxie_start()
        },
      },
      {
        text: '对照错字',
        type: 'primary',
        onTap(e) {
          console.log('你选择了对照错字！')
          wx.navigateTo({
            url: '/pages/basics/readcheck/readcheck?taskid=' + that.data.taskid,
          })
        },
      },
      {
        text: '取消',
      },
      ],
    })
  },
  goreadcheck: function () {
    wx.navigateTo({
      url: '/pages/basics/readcheck/readcheck?taskid='+this.data.taskid,
    })

  },
  showModal_word_shiyi(e) {

    let item_word = this.data.taskdata.word1[this.data.current]
    // console.log(item_word);
    
    // let m = 'DrawerModalL_word'+this.data.current
    this.setData({
      modalName: 'DrawerModalL_word',
      data_item_word: item_word,
    })
  },
  showModal_dword_shiyi(e) {

    let item_dword = this.data.taskdata.word1[this.data.current]
    // console.log(item_dword);

    // let m = 'DrawerModalL_dword' + this.data.current
    this.setData({
      modalName: 'DrawerModalL_dword',
      data_item_dword: item_dword,
    })
    // this.setData({
    //   modalName: e.currentTarget.dataset.target
    // })
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
  ceshiyuyin(e){

    let innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.onPlay(() => {
      console.log('开始播放startTime-' + innerAudioContext.startTime)
      console.log('开始播放currentTime-' + innerAudioContext.currentTime)
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    innerAudioContext.onEnded((res) => {
      console.log('结束播放currentTime-' + innerAudioContext.currentTime)
    })
    innerAudioContext.onWaiting((res) => {
      console.log('onWaiting播放currentTime-' + innerAudioContext.currentTime)
    })
    innerAudioContext.onSeeking((res) => {
      console.log('onSeeking播放currentTime-' + innerAudioContext.currentTime)
    })
    innerAudioContext.stop()
    // innerAudioContext.destroy()
    innerAudioContext.src = this.data.ceshisrc2
    innerAudioContext.play()

  },
 
  

})