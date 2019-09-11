const app = getApp()
Page({
  data: {
    items: [
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
    // {
    //   type: 'text',
    //   label: 'Forks',
    //   value: 'forks',
    //   groups: ['002'],
    // },
    {
      type: 'sort',
      label: 'Stars',
      value: 'stars',
      groups: ['003'],
    },
    {
      type: 'filter',
      label: '筛选',
      value: 'filter',
      checked: true,
      children: [
      {
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
      groups: ['003'],
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
    multisigleIndex : [], 
    list_select_value: [], 
  },
  onLoad() {
    let that = this;
    //加载联动

    wx.request({
      url: app.globalData.url + '?act=ebook_recommend_search_cat',
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)
        that.setData({
          categoryArray: res.data.search_linkage_list_xcx,
          multisigleIndex: res.data.search_linkage_list_xcx_default,
          list_select_name: res.data.search_linkage_list_xcx_default
          
        })
      }
    })

    //加载列表
    wx.request({
      url: app.globalData.url + '?act=getbookrecommendlist',
      data: {
        pagesize: that.data.pagesize,
        page: that.data.page
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)
        that.setData({

          duwuList: res.data.items
        })

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

    var tprice = 'multisigleIndex['+k+']'
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

    console.log(11)
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
    console.log(this.data.list_select_value)
    console.log(this.data.keywords)
    var that = this;
    this.setData({
      isLoad: false,
      isend: false,
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
          that.setData({
            duwuList: res.data.items
          })
        }else{
          that.setData({
            duwuList: [],
            isLoad: true,
          })
        }
      }
    })
  },
  //一下是 筛选框===========================
  onChange(e) {
    console.log(e.detail)
    const { checkedItems, items, checkedValues } = e.detail
    const params = {}

    console.log(checkedItems)
    console.log(items)
    console.log(checkedValues)
    // console.log(checkedItems, items, checkedValues)

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'updated') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.sort = n.value
          params.order = selected
        } else if (n.value === 'stars') {
          console.log(n)
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'forks') {
          params.sort = n.value
        } else if (n.value === 'filter') {
          n.children.filter((n) => n.selected).forEach((n) => {
            if (n.value === 'language') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.language = selected
            } else if (n.value === 'query') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.query = selected
            }
          })
        }
      }
    })

    console.log('params', params)

    this.getRepos(params)
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
      order: 'desc',
    }, params)

    // wx.showLoading()
    // wx.request({
    //   url: `https://api.github.com/search/repositories`,
    //   data,
    //   success: (res) => {
    //     console.log(res)

    //     wx.hideLoading()

    //     this.setData({
    //       repos: res.data.items.map((n) => Object.assign({}, n, {
    //         date: n.created_at.substr(0, 7),
    //       })),
    //     })
    //   },
    // })
  },
  onOpen(e) {
    this.setData({ opened: true })
  },
  onClose(e) {
    this.setData({ opened: false })
  },
  /**
   * 阻止触摸移动
   */
  noop() { },

})