import { $wuxDialog } from '../../../dist/index'
const app = getApp()
Page({
  data: {
    searchitems: [
      //   {
      //   type: 'radio',
      //   label: 'Updated',
      //   value: 'updated',
      //   checked: true,
      //   children: [{
      //     label: 'Recently updated',
      //     value: 'desc',
      //     checked: true, // 默认选中
      //   },
      //   {
      //     label: 'Least recently updated',
      //     value: 'asc',
      //   },
      //   ],
      //   groups: ['001'],
      // },
      {
        type: 'sort',
        label: '热度',
        value: 'task_num',
        groups: ['002'],
      },
      {
        type: 'sort',
        label: '篇幅',
        value: 'fulltext_num',
        groups: ['003'],
      },
      {
        type: 'filter',
        label: '筛选',
        value: 'filter',
        checked: true,
        children: [{
            type: 'checkbox',
            label: 'Query（复选）',
            value: 'query',
            children: [{
                label: 'Angular',
                value: 'angular',
              },
              {
                label: 'Vue',
                value: 'vue',
              },
              {
                label: 'React',
                value: 'react',
                checked: true, // 默认选中
              },
              {
                label: 'Avalon',
                value: 'avalon',
              },
            ],
          },

          // {
          //   type: 'radio',
          //   label: '性别',
          //   value: 'gander',
          //   children: [{
          //     label: '男',
          //     value: '0',
          //   },
          //   {
          //     label: '女',
          //     value: '1',
          //   },
          //   {
          //     label: '通用',
          //     value: '2',
          //   },
          //   ],
          // },

        ],
        groups: ['002', '003'],
      },
    ],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    MainCur: 0,
    TabCur: 0,
    scrollLeft: 0,
    duwuList: [],
    loadModal: true,
    page: 1,
    isLoad: true,
    pagesize: 8,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
    list_select_name: [],
    categoryArray: [],
    multisigleIndex: [],
    list_select_value: [],
    scan_code:'',
    listorder: '',
    orderby: ''
  },
  onLoad(options) {

    // console.log(options.scan_code_g)

    let temp_scan = options.scan_code_g ? options.scan_code_g:''

    let that = this;
    //加载联动

    wx.request({
      url: app.globalData.url + '?act=ebook_recommend_search_cat_bar',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data.items)
        // that.setData({
        //   categoryArray: res.data.search_linkage_list_xcx,
        //   multisigleIndex: res.data.search_linkage_list_xcx_default,
        //   list_select_name: res.data.search_linkage_list_xcx_default

        // })
        var tprice = 'searchitems[2].children'
        that.setData({
          [tprice]: res.data.items,
        })

        // console.log(that.data.searchitems)
      }
    })

    //加载列表
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        scan_code: temp_scan,

      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {
        console.log('默认加载进来的请求')  
        console.log(res.data)

        if (res.data.code == 20001 && temp_scan != '') {
          
          //直接跳转 
          wx.navigateTo({
            url: '/pages/basics/searchnot/searchnot?searchnot_code=' + temp_scan + '&searchnot_title=' + res.data.return_q,
          })

          // wx.showModal({
          //   title: '您好！没有查到此书',
          //   content: '前往登记？',
          //   cancelText: '取消',
          //   confirmText: '好的',
          //   success: res => {
          //     if (res.confirm) {
          //       wx.navigateTo({
          //         url: '/pages/about/regbook/regbook',
          //       })
          //     }
          //   }
          // })

        } else {
          that.setData({
            duwuList: res.data.items,
            keywords: res.data.return_q,
          })
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
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  MultiSigleChange(e) {

    console.log(e.detail.value);
    let k = 0
    //按钮过来的文字
    if (e.currentTarget.dataset.hasOwnProperty('valkey')) {
      k = e.currentTarget.dataset.valkey
    }

    console.log(k);

    let cname = this.data.categoryArray[k].sub[e.detail.value] + "";
    console.log(cname); //具体的数值

    let c = this.data.categoryArray[k].prefix[e.detail.value] + "";

    console.log(c); //具体的数值

    var tprice = 'multisigleIndex[' + k + ']'
    var tprice2 = 'list_select_name[' + k + ']'
    var tprice3 = 'list_select_value[' + k + ']'
    this.setData({
      [tprice]: e.detail.value,
      [tprice2]: cname,
      [tprice3]: c,
    })


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    // console.log(11)
    if (this.data.isend) { //到底了不在执行
      return
    }
    var that = this;
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    this.setData({
      isLoad: false
    })
    // 页数+1
    this.setData({
      page: this.data.page + 1
    })
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        search_linkage_default_string: that.data.list_select_value.join(),
        slistorder: that.data.listorder,
        sorderby: that.data.orderby,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function(res) {
        if (res.data.code === 20000) {

          console.log(res.data.items.length)
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          var moment_list = that.data.duwuList;
          const oldData = that.data.duwuList;
          that.setData({
            duwuList: oldData.concat(res.data.items)
          })
          // 隐藏加载框
          // wx.hideLoading();
        } else {


        }
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  /**
   * 搜索函数
   */
  search_keyword: function() {
    // console.log(this.data.list_select_value)
    // console.log(this.data.keywords)
    var that = this;
    this.setData({
      isLoad: false,
      isend: false,
      loadModal:true
    })
    // 页数+1
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page,
        keywords: that.data.keywords,
        search_linkage_default_string: that.data.list_select_value.join(),
        // scan_code: that.data.scan_code,
        slistorder: that.data.listorder,
        sorderby: that.data.orderby,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.code === 20000) {
          
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          that.setData({
            duwuList: res.data.items
          })
        } else {
          that.setData({
            duwuList: [],
            isLoad: true,
          })
        }
      }, complete(res) {
        
        that.setData({
          loadModal: false
        })
      }
    })
  },
  //一下是 筛选框===========================
  onChange(e) {
    // console.log(e.detail)
    const {
      checkedItems,
      items,
      checkedValues
    } = e.detail
    const params = {}

    // console.log(checkedItems)
    // console.log(items)
    console.log(checkedValues)
    checkedValues.forEach((n, i) => {

      if (i == 0) {
        // params.text = n
        params.sort = {
          sort: 'task_num',
          order: n === 1 ? 'asc' : 'desc'
        }
      } else if (i == 1) {
        if (n) {
          params.sort = {
            sort: 'fulltext_num', 
            order: n === 1 ? 'asc' : 'desc'
          }
        }

      } else if (i == 2) {
        let arr = []
        n.forEach((n2) => {
          // console.log(Object.prototype.toString.apply(n2) === '[object Array]')  
          if (Object.prototype.toString.apply(n2) === '[object Array]'){
            n2.forEach((n3) => {
              arr.push(n3)
           })
          }else{
            arr.push(n2)
          }
          
          
        })
        // console.log(arr)
        params.linkages = arr
      }
    })

    console.log('params', params)

    this.getRepos(params)
  },
  getRepos(params = {}) {
    var that = this;
    this.setData({
      listorder: params.sort.sort,
      orderby: params.sort.order,
      list_select_value: params.linkages,
    })
    setTimeout(function() {
      that.search_keyword()
    }, 500)

    //     this.setData({
    //       repos: res.data.items.map((n) => Object.assign({}, n, {
    //         date: n.created_at.substr(0, 7),
    //       })),
    //     })

  },
  onOpen(e) {
    this.setData({
      opened: true
    })
  },
  onClose(e) {
    this.setData({
      opened: false
    })
  },
  /**
   * 阻止触摸移动
   */
  noop() {},

  scanCode() {
    // this.setData({ msg: 'Hello World' })

    var that = this;
    
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        // wx.showToast({
        //   title: '结果:' + res.result,
        //   icon: 'none',
        //   duration: 1500,
        // })
        console.log(res)
        that.setData({
          
          loadModal: true
        })
        let temp_scan = res.result
        //加载列表
        wx.request({
          url: app.globalData.url + '?act=getbookrecommendlist',
          data: {
            pagesize: that.data.pagesize,
            page: that.data.page,
            scan_code: temp_scan,
          },
          header: {
            'content-type': 'application/json', // 默认值
            'X-Token': app.globalData.xtoken
          },
          success(res) {
            console.log('扫码请求的结果')
            console.log(res.data)
            if (res.data.code==20001){

              //直接跳转 
              wx.navigateTo({
                url: '/pages/basics/searchnot/searchnot?searchnot_code=' + temp_scan + '&searchnot_title=' + res.data.return_q,
              })  
            

            }else{
              that.setData({
                duwuList: res.data.items,
                keywords: res.data.return_q,
              })
            }
              
          },
          complete(res) {
            that.setData({
              isLoad: true,
              isend: true,
              loadModal: false
            })
           }
        })
        // that.setData({
        //   scan_code: res.result,
        // })
        // setTimeout(function () {
        //   that.search_keyword()
        // }, 800)
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  },
})