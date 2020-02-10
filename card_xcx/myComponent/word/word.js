const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    autoStart: { // 属性名
      type: Boolean,
      value: false
    },
    current: { 
      type: String,
      value: ''
    },
    dataArray: {  
      type: Object,
      value: null
    }
  },
  data: {
    c_value: '',
    all_play_c: null,
  },
  lifetimes: {
    attached: function () {

      this.setData({

        all_play_c: wx.createInnerAudioContext(),
         

      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {

    onLoad: function () {
      console.log(this.data.dataArray)
    },
    onTap: function (e) {
      // console.log(src)
    },
    play_any_src(e) {
      let src = e.currentTarget.dataset.msrc

      // console.log(src);
       let innerAudioContext = wx.createInnerAudioContext()
      // this.data.all_play_c.stop()
      innerAudioContext.src = src
      innerAudioContext.play()
      // console.log(this.innerAudioContext.duration);

    },
   
  }
})