const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  }, 
  data: {
    TabCur: 0,
    scrollLeft: 0,
    jiaocaiList: [],
    kewaiduwuList: [],
    iconList2: [{
      icon: 'picfill',
      color: 'yellow',
      url: 'jiaocai',
      badge: 20,
      name: '识字任务'
    }, {
      icon: 'service',
      color: 'olive',
      url: 'jiaocai',
      badge: 0,
      name: '听写任务'
    }],
    gridCol: 3,
    skin: false,
    gridBorder: false

  },
  lifetimes: {
    attached: function () {
      //wx.clearStorage()
      // 在组件实例进入页面节点树时执行
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }

      var that = this

      
      //加载首页的教材和 课外读物

      wx.request({
        url: app.globalData.url + '?act=jiaocailist', //教材
        data: {
          pagesize: 3
        },
        header: {
          'content-type': 'application/json', // 默认值
          'X-Token': app.globalData.xtoken
        },
        success(res) {

          console.log(res.data)
          that.setData({

            jiaocaiList: res.data.items
          })

        },
        complete(res) {
          //console.log(res.statusCode)
          if (res.statusCode == 500) {

          } else {

          }

        }
      })

      wx.request({
        url: app.globalData.url + '?act=list', //课外读物
        data: {
          pagesize:3
        },
        header: {
          'content-type': 'application/json', // 默认值
          'X-Token': app.globalData.xtoken
        },
        success(res) {

          console.log(res.data)

          that.setData({
           
            kewaiduwuList : res.data.items
          })
          
        },
        complete(res) {
          //console.log(res.statusCode)
          if (res.statusCode == 500) {

          } else {

          }

        }
      })

     

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    ready: function () {
     
      // console.log(111) 

    },
  },
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
  }

})