// var fun_aes = require('../../../utils/aes.js')
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    collection_list: [],
    loadModal: true,
    page: 1,
    isLoad: false,
    pagesize: 15,
    isend: false,
    keywords: '',
    Inputdisabled: false, //搜索按钮的  置灰状态
    searchitems: [
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
        ],
      },
    ],
    list_select_value: [],
    search_clear: false,
    inputFocus: false,
  },
  onLoad: function (options) {

    // console.log(1111)

    var that = this;

    //加载联动

    wx.request({
      url: app.globalData.url + '?act=authorlist_search_cat_bar',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        // console.log(res.data.items)
        var tprice = 'searchitems[0].children'
        that.setData({
          [tprice]: res.data.items,
        })
        // console.log(that.data.searchitems)
      }
    })
  //加载列表
      wx.request({
        url: app.globalData.url + '?act=author_list' ,
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'X-Token': app.globalData.xtoken
        },
        data: {
          pagesize: that.data.pagesize,
        },
        success: function (res) {
          
          console.log(res.data)

          // var str_aes_decode = that.Decrypt(res.data.items)
          // let tmp_set_canvasList = JSON.parse(str_aes_decode)
          
           
          res.data.items = util.Decrypt(res.data.items)

          console.log(res.data.items)

          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          
          that.setData({
            collection_list: res.data.items,
          })

          // 

        }, complete(res) {
          that.setData({

            loadModal: false
          })
          //console.log(res.statusCode)
        
        }
      });


      // var str_aes_encode = this.Encrypt('{pwd:{app_id:1234567890,user_name:user_info,nick_name:cai,header_url:baidu.com,gender:0,province:广东省,city:深圳,system:anroid,platform:wx}');
      // console.info("encode:" + str_aes_encode);
      //  var str = "uWFMDaHxCrK1+USIsXG8o1EZrYESfb+V3GGUPKi6SgErT++k/AUSdk7K/BO2EFd7rOr5Zs0ucZxmrWzD7+1nlWaaBeMV/7nR5d/aoc4gBpRyAppMYtfH52MJneVMN+OjZV6BpYOtTSJoEk10byc1LMRBAio+tRinxhR4W6ymwJvwR7XN9bYo6OLkSDS5UgzMi6zlvgiIJN5JVxBSjckmqQ==";
      //  var str_aes_decode = this.Decrypt(str);
      //  console.info("aes:" + str_aes_decode);
    

  },
  // Encrypt: function(word) {
  //   var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
  //   var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.jiamikey);
  //   var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
  //     mode: fun_aes.CryptoJS.mode.ECB,
  //     padding: fun_aes.CryptoJS.pad.Pkcs7
  //   });
  //   //返回大写十六进制加密结果
  //   return encrypted.toString();
  // },
  // Decrypt: function(word) {
  //   var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.jiamikey);
  //   //mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7
  //   var decrypt = fun_aes.CryptoJS.AES.decrypt(word, key, {
  //     mode: fun_aes.CryptoJS.mode.ECB,
  //     padding: fun_aes.CryptoJS.pad.Pkcs7
  //   });
  //   var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
  //   return decryptedStr.toString();
  // },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

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
      url: app.globalData.url + '?act=author_list',
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
      success: function (res) {
        if (res.data.code === 20000) {

          res.data.items = util.Decrypt(res.data.items)
          // console.log(res.data.items.length)
          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          var moment_list = that.data.collection_list;
          const oldData = that.data.collection_list;
          that.setData({
            collection_list: oldData.concat(res.data.items)
          })
          // 隐藏加载框
          // wx.hideLoading();
        } else {

          that.setData({
            isLoad: true,
            isend: true,
          })

        }
      }
    })
  },

  bindKeyInput: function (e) {
    // console.log(e)
    this.setData({
      search_clear: true,
      keywords: e.detail.value
    })
  },
  onClear: function (e) {
    this.setData({
      keywords: '',
      search_clear: false,
      // inputFocus: false,
    })
  },
  /**
   * 搜索函数
   */
  search_keyword: function () {
    console.log(this.data.keywords)
    var that = this;
    this.setData({
      isLoad: false,
      isend: false,
      loadModal:true
    })
    wx.showLoading({
      title: '加载中',
    })
    // 页数+1
    this.setData({
      page: 1
    })
    wx.request({
      url: app.globalData.url + '?act=author_list',
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
      success: function (res) {
        if (res.data.code === 20000) {
          // console.log(res.data.items.length)

          res.data.items = util.Decrypt(res.data.items)

          if (res.data.items.length < that.data.pagesize || res.data.items.length === 0) {
            that.setData({
              isLoad: true,
              isend: true,
            })
          }
          // 回调函数
          that.setData({
            collection_list: res.data.items
          })
        } else {
          that.setData({
            collection_list: [],
            isLoad: true,
          })
        }
      }, complete(res) {
        wx.hideLoading()
        that.setData({

          loadModal: false
        })
        //console.log(res.statusCode)

      }
    })
  },


  gotodeteil(e) {

    let programid = e.currentTarget.dataset.programid
    var that = this
    // console.log(programid)

    wx.navigateTo({
      url: '/pages/basics/author/author?authorid=' + programid,
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
        let arr = []
        n.forEach((n2) => {
          // console.log(Object.prototype.toString.apply(n2) === '[object Array]')  
          if (Object.prototype.toString.apply(n2) === '[object Array]') {
            n2.forEach((n3) => {
              arr.push(n3)
            })
          } else {
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
      // listorder: params.sort.sort,
      // orderby: params.sort.order,
      list_select_value: params.linkages,
    })
    setTimeout(function () {
      that.search_keyword()
    }, 500)


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
  noop() { },




});
