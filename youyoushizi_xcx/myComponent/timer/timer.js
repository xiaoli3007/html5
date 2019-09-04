const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    autoStart: { // 属性名
      type: Boolean,
      value: false
    }
  },
  data: {
    //存储计时器
    isStart: false,
    setInter: null,
    timenum:0,
    timestring:'xxxxx',
    countVal: 0, //获取初始值
    pauseTime: 0,
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
   
      console.log(1111111);
      this.setData({
        countVal: new Date().getTime(),
      });
      
      this.startSetInter()
      // setTimeout(function () {
       
      // }, 1000)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    startSetInter: function () {

      var vm = this
      //将计时器赋值给setInter
      var timer  = setInterval(
        function () {
          // var vm = this
          // console.log(vm.data.countVal)
          // var playTime = 1547720552000; //开始时间
          var data = parseInt((new Date().getTime() - vm.data.countVal) / 1000);//秒
          var h = parseInt(data / 3600);
          var m = parseInt((data - h * 3600) / 60);
          var s = parseInt((data - h * 3600) % 60);
          var timeH;
          var timeM;
          var timeS;
          if (h < 10) {
            timeH = "0" + h;
          } else {
            timeH = h
          }
          if (m < 10) {
            timeM = ":0" + m;
          } else {
            timeM = ":" + m;
          }
          if (s < 10) {
            timeS = ":0" + s;
          } else {
            timeS = ":" + s;
          }
          console.log(timeH + timeM + timeS);

          vm.setData({
            timestring: timeH + timeM + timeS,
            timenum: data,
          });

        }
        , 1000);

      this.setData({
        setInter: timer,
        isStart: true,
      });

    },
    stopSetInter: function () {
      var vm = this
      if (vm.isStart) {
        // window.clearInterval(vm.globalTimer)
        // vm.globalTimer = null;
        // vm.isStart = false
        // vm.pauseTime = new Date().getTime()
      }
    },
    endSetInter: function () {
      // var that = this;
      //清除计时器  即清除setInter
      clearInterval(this.data.setInter)
    },
    setTime: function () {
      // var vm = this
      // console.log(vm.data.countVal)
      // var playTime = 1547720552000; //开始时间
      var data = parseInt((new Date().getTime() - vm.data.countVal) / 1000);//秒
      var h = parseInt(data / 3600);
      var m = parseInt((data - h * 3600) / 60);
      var s = parseInt((data - h * 3600) % 60);
      var timeH;
      var timeM;
      var timeS;
      if (h < 10) {
        timeH = "0" + h;
      } else {
        timeH = h
      }
      if (m < 10) {
        timeM = ":0" + m;
      } else {
        timeM = ":" + m;
      }
      if (s < 10) {
        timeS = ":0" + s;
      } else {
        timeS = ":" + s;
      }
      console.log(timeH + timeM + timeS);

      vm.setData({
         timestring: timeH + timeM + timeS,
        timenum: data,
      });

    }
   
  }
})