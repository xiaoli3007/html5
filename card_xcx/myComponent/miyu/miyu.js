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
  },
  lifetimes: {
    attached: function () {

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

    },
   
  }
})