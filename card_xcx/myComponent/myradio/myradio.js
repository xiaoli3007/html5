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
    demodata: [
      {
        value: 'tab1',
        isicon:false,
        label: '熟悉',
      },
      {
        value: 'tab2',
        isicon: false,
        label: '掌握',
      },
      {
        value: 'tab3',
        isicon: false,
        label: '容易',
      }
    ],
      demodata2: [
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
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
   
      // console.log(this.data.current)

      this.setData({
        c_value: this.data.current,
      });

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {

    onLoad: function () {
      // console.log(this.data.dataArray)
    },
    onTap: function (e) {

      // console.log(e.currentTarget.dataset.value)
      this.setData({
        c_value: e.currentTarget.dataset.value,
      });
      var myEventDetail = {   // detail对象，提供给事件监听函数
        value: e.currentTarget.dataset.value,
      } 
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    // startSetInter: function () {

    //   var vm = this

    // },
 
   
  }
})