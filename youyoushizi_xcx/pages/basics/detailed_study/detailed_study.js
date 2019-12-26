const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    TabCursub: 0,
    // scrollLeft: 0,
    scrollLefts: 0,
    tabNavcat: [],
    tabNavcat_sub: [],
    program:null,
    all_play_c: null,
    datalist: [], datatablist: [],
    isloaditem:false,
    data_item_word:null,
    toView: 'msg-1', 
    topscrollLeft: 0
  },
  onLoad(options) {
    console.log(options)
    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=ebook_show_study',
      data: {
        ebookid: options.ebookid,
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        // let arr = res.data.items
        console.log(res.data)
        // console.log(Object.keys(arr));
        // arr.forEach(function (value, i) {
        //   　　console.log('forEach遍历:' + i );

        // })
        that.setData({

          datalist: res.data.items,
          program: res.data.program,
          datatablist_k: res.data.datas_xcc_tab_key,
          datatablist: res.data.datas_xcc_tab,
          TabCur: res.data.datas_xcc_tab[0]['m'],
          TabCursub: res.data.datas_xcc_tab[0]['s'][0],
        })
        if (res.data.default_main_tab!=0){
         // setTimeout(function () {
            that.setData({
              toView: 'msg-' + res.data.default_main_tab,
              TabCur: res.data.default_main_tab,
              TabCursub: res.data.datas_xcc_tab_key[res.data.default_main_tab]['s'][0],
            })
         // }, 200)

        }
           

      },
      complete(res) {
        that.setData({

          loadModal: false
        })
        //console.log(res.statusCode)
        if (res.statusCode == 500) {

        } else {

        }

      }
    })


  },
  onReady(e) {

    var that = this
    this.setData({

      all_play_c: wx.createInnerAudioContext(),
    })

    // setTimeout(function () {
    //   that.setData({
    //     toView: 'msg-10',
    //     TabCur:10,
    //     TabCursub: that.data.datatablist_k[10]['s'][0],
    //   })
    // }, 500)


    },
  tabSelect(e) {
    // console.log(e.currentTarget.dataset.id);
    // console.log(this.data.TabCur);
    // console.log( this.data.datatablist);
    // console.log(this.data.datatablist_k);
    if (e.currentTarget.dataset.id != this.data.TabCur){
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        TabCursub: this.data.datatablist_k[e.currentTarget.dataset.id]['s'][0],
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
    

  },
  tabSelect2(e) {
    this.setData({
      TabCursub: e.currentTarget.dataset.id,
      // scrollLefts: (e.currentTarget.dataset.iid - 1) * 60
    })
  },
  gotodeteil_task(e) {

    let taskid = e.currentTarget.dataset.taskid
    let relation_id = e.currentTarget.dataset.relation_id
    let gid = e.currentTarget.dataset.gid
    let wcell_type = e.currentTarget.dataset.wcell_type
    
    // var that = this
    // console.log({ taskid, relation_id, gid, wcell_type})
    // return
    if (taskid && taskid!=0){
      wx.navigateTo({
        url: '/pages/basics/task/task?taskid=' + taskid,
      })
    }else{
      wx.navigateTo({
        url: '/pages/basics/task/task?type=2&relation_type=ebook&taskid=0&relation_id=' + relation_id + '&gid=' + gid+'&wcell_type=' + wcell_type,
      })
    }
    

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
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showModal_word_shiyi(e) {

    let wcellid = e.currentTarget.dataset.wcellid

    let wcell_type = e.currentTarget.dataset.wcell_type

    // console.log({ wcell_type, wcellid});

    let that = this;
    let m = 'DrawerModalL_word'
    if (wcell_type=='25'){
      m = 'DrawerModalC_word'
    }
    that.setData({
      modalName: m, 
      isloaditem: true
    })
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=book_item_word_shiyi',
      data: {
        wcellid: wcellid,
        userid: app.globalData.userid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        //  console.log(res.data) 
        that.setData({
          data_item_word: res.data.items,
        })
      },
      complete(res) {
        that.setData({

          isloaditem: false
        })
        
      }
    })

    // this.setData({
    //   modalName: m,
    //   data_item_word: item_word,
    // })


  },

})