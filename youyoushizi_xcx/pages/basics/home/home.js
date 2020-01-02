import {
  $startWuxRefresher,
  $stopWuxRefresher,
  $stopWuxLoader
} from '../../../dist/index'

var fun_aes = require('../../../utils/aes.js')

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
    tuijianduwuList: [],
    iconList: [{
      bg_image: 'https://rmsp.youyoushizi.com/statics/yysz/ico_sz.svg',
      icon: 'picfill',
      color: 'yellow',
      url: '/pages/basics/tasklist/tasklist',
      badge: 0,
      name: '识字',
      type: '2'
    }, {
      bg_image: 'https://rmsp.youyoushizi.com/statics/yysz/ico_tx.svg',
      icon: 'service',
      color: 'olive',
      url: '/pages/basics/tasklist/tasklist',
      badge: 0,
      name: '听写',
      type: '1'
    }, {
      bg_image: 'https://rmsp.youyoushizi.com/statics/yysz/ico_fx.svg',
      icon: 'brand',
      color: 'yellow',
      url: '/pages/basics/reviewselect/reviewselect',
      badge: 0,
      name: '复习',
      type: '3'
    }],
    gridCol: 3,
    skin: false,
    gridBorder: false,
    username: '我',
    realname: '我',
    isLoad: false,

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {

      // console.log(111) 
      // this.onPullDownRefresh()
    },
    hide: function() {
      // console.log(222) 
    },
    resize: function() {
      // console.log(333) 
    },
  },
  lifetimes: {
    attached: function() {
      // console.log(111) 
      //wx.clearStorage()
      // 在组件实例进入页面节点树时执行
      if (app.globalData.username) {
        this.setData({
          username: app.globalData.username,
        })
      }
      if (app.globalData.realname) {
        this.setData({
          realname: app.globalData.realname,
        })
      }

      $startWuxRefresher('#wux-refresher', this)
      // var that = this
      // //加载首页的教材和 课外读物
      // wx.request({
      //   url: app.globalData.url2 + '?act=index', //课外读物
      //   data: {
      //     userid: app.globalData.userid ? app.globalData.userid:0
      //   },
      //   header: {
      //     'content-type': 'application/json', // 默认值
      //     'X-Token': app.globalData.xtoken
      //   },
      //   success(res) {

      //     console.log(res.data)

      //     that.setData({

      //       kewaiduwuList: res.data.items.duwu,
      //       jiaocaiList: res.data.items.jiaocai,

      //     })

      //     var tprice = 'iconList[0].badge'
      //     var tprice2 = 'iconList[1].badge'
      //     var tprice3 = 'iconList[2].badge'
      //     that.setData({
      //       [tprice]: res.data.shizi_nums,
      //       [tprice2]: res.data.tingxie_nums,
      //       [tprice3]: res.data.fuxi_nums,
      //     })


      //   },
      //   complete(res) {
      //     $stopWuxRefresher('#wux-refresher', that)
      //     // that.setData({
      //     //   isLoad: false,
      //     // })
      //     //console.log(res.statusCode)
      //     if (res.statusCode == 500) {

      //     } else {

      //     }

      //   }
      // })

    


    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready: function() {

     

    },
  },

  methods: {

   
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },

    /**
     * 页面 刷新
     */
    onPullDownRefresh() {

      // console.log('onRefresh')
      var that = this;

      // that.setData({
      //   isLoad: true,
      // })
      if (!app.globalData.userid) {

        wx.getStorage({
          key: 'usertoken',
          success(res) {
            // console.log(res.data)
            var t = res.data
            if (t) {
              //通过token获取用户
              wx.request({
                url: app.globalData.url2 + '?act=index',
                data: {
                  userid: app.globalData.userid ? app.globalData.userid : 0,
                  token: t,
                },
                header: {
                  'content-type': 'application/json', // 默认值
                  'X-Token': app.globalData.xtoken
                },
                success(res) {
 
                  // console.log(res.data)
                  if (res.data.userinfo) {
                    app.globalData.uid = res.data.userinfo.wx_id;
                    app.globalData.userid = res.data.userinfo.userid;
                    app.globalData.username = res.data.userinfo.username;
                    app.globalData.avatar = res.data.userinfo.avatar;
                    app.globalData.realname = res.data.userinfo.realname;
                    that.setData({
                      realname: res.data.userinfo.realname                   
                    })
                  }

                  that.setData({

                    kewaiduwuList: res.data.items.duwu,
                    jiaocaiList: res.data.items.jiaocai,
                    // tuijianduwuList: res.data.items.tuijian_duwu,

                  })
 
                  var tprice = 'iconList[0].badge'
                  var tprice2 = 'iconList[1].badge'
                  var tprice3 = 'iconList[2].badge'
                  that.setData({
                    [tprice]: res.data.shizi_nums,
                    [tprice2]: res.data.tingxie_nums,
                    [tprice3]: res.data.fuxi_nums,
                  })

                },
                complete(res) {

                  $stopWuxRefresher('#wux-refresher', that)
                  // that.setData({
                  //   isLoad: false,
                  // })


                }
              })

            }
          },
          fail(failres) {
            console.log(failres)
            that.update_data()
          }
        })

      } else {
        that.update_data()
        //已经有登录状态不再发送token
        // wx.request({
        //   url: app.globalData.url2 + '?act=index',
        //   data: {
        //     userid: app.globalData.userid ? app.globalData.userid : 0
        //   },
        //   header: {
        //     'content-type': 'application/json', // 默认值
        //     'X-Token': app.globalData.xtoken
        //   },
        //   success(res) {

        //     console.log(res.data)

        //     that.setData({

        //       kewaiduwuList: res.data.items.duwu,
        //       jiaocaiList: res.data.items.jiaocai,
        //       // tuijianduwuList: res.data.items.tuijian_duwu,

        //     })

        //     var tprice = 'iconList[0].badge'
        //     var tprice2 = 'iconList[1].badge'
        //     var tprice3 = 'iconList[2].badge'
        //     that.setData({
        //       [tprice]: res.data.shizi_nums,
        //       [tprice2]: res.data.tingxie_nums,
        //       [tprice3]: res.data.fuxi_nums,
        //     })

        //   },
        //   complete(res) {

        //     $stopWuxRefresher('#wux-refresher', that)
        //     // that.setData({
        //     //   isLoad: false,
        //     // })


        //   }
        // })

      }


    },
    update_data() {
      var that = this 
      wx.request({
        url: app.globalData.url2 + '?act=index',
        data: {
          userid: app.globalData.userid ? app.globalData.userid : 0
        },
        header: {
          'content-type': 'application/json', // 默认值
          'X-Token': app.globalData.xtoken
        },
        success(res) {

          // console.log(res.data)

          that.setData({

            kewaiduwuList: res.data.items.duwu,
            jiaocaiList: res.data.items.jiaocai,
            // tuijianduwuList: res.data.items.tuijian_duwu,

          })

          var tprice = 'iconList[0].badge'
          var tprice2 = 'iconList[1].badge'
          var tprice3 = 'iconList[2].badge'
          that.setData({
            [tprice]: res.data.shizi_nums,
            [tprice2]: res.data.tingxie_nums,
            [tprice3]: res.data.fuxi_nums,
          })

        },
        complete(res) {

          $stopWuxRefresher('#wux-refresher', that)
          // that.setData({
          //   isLoad: false,
          // })


        }
      })
    },
    onPageScroll(e) {
      this.setData({
        scrollTop: e.scrollTop
      })
    },
    onPulling() {
      console.log('onPulling')
    },

    gotodetail(e) {

        wx.navigateTo({
          url: '/pages/basics/recommendduwu/recommendduwu',
        })

    },
    // onRefresh() {
    //   console.log('onRefresh')
    //   // var that = this 
    //   setTimeout(() => {
    //     $stopWuxRefresher('#wux-refresher', this)
    //     console.log('onRefresh222')
    //   }, 3000)
    // },

  }

})