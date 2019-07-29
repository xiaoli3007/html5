
const app = getApp()
var util = require('../../../utils/util.js')
Component({
 
  properties: {
    aaa: { // 属性名
      type: Number,
      value: 0
    }
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    years: [],
    year: 2019,
    months: [],
    month: 2,
    valueaa: [9999, 1],
    TabCur: 0,  //tab人名菜单
    scrollLeft: 0,  //tab人名菜单
    loading_top: false, //海浪loading
    InputBottom: 0, //底部发送消息定位高度
    person_name: app.globalData.person_name,  //初始相关知识 人名
    person_desc: app.globalData.person_desc, //初始相关知识 简介
    Inputdisabled: false,  //发送按钮的  置灰状态
    useheight: 0,   //聊天滚动 上面的高度计算 
    scrollheight: 300, //聊天滚动高度
    msgdata: '',  //消息内容
    toView: '',  //消息最底部的view
    scrollTop: 100, //无
    userInfo: {}, //无 以后可以授权用户消息
    hasUserInfo: false, //无 以后可以授权用户消息
    msgList: app.globalData.msgList, //聊天记录
    relList: app.globalData.relList,  //相关知识的 相关人物
    canvasList: app.globalData.canvasList, //相关知识的 相关人物 图谱划线
    multiArray: [], //底部二级联动菜单  
    multiIndex: [0, 0], //底部二级联动菜单 值
    categoryArray: [], //底部二级联动菜单 详细
    top_main_head_height:0, //头部加相关知识表头的高度
    top_main_height: 0, //头部加相关知识的高度
    foot_height: 0, //底部的高度
    top_main_head_title_height:0, //标题栏的高度
    sync:0,
    input_focus:false,
    isAnnual: 0,
    objectMultiArray: [],
    foot_btn_shi_height:0 //底部三个按钮的高度
  },
  lifetimes: {
    attached: function() {

      //wx.clearStorage()
      // 在组件实例进入页面节点树时执行
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }

      // console.log(this.data.userInfo);
      //滚动到底部消息
      this.setData({
        toView: 'msg-' + (this.data.msgList.length - 1),
      })
      var that = this 
      //加载分类
      wx.request({
        url: app.globalData.url + '/category', //仅为示例，并非真实的接口地址
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          if (res.data.length!=0) {
            // console.log(res.data)
            //  console.log(res.data.data.person[0])
            var temp_categoryall = []
            var temp_category1= []
            //var temp_category2= []
            var temp_category_obj = {}

            if (res.data.length > 0) {
              var t_o = []

              for (var i = 0; i < res.data.length; i++) {
                temp_category1.push(res.data[i].name) 
                  
                t_o[i] = { "name": res.data[i].name, "sub": [], "prefix": []}
                for (var j = 0; j < res.data[i].nodes.length; j++) {
                  
                  t_o[i].sub.push(res.data[i].nodes[j].name)
                  t_o[i].prefix.push(res.data[i].nodes[j].prefix)
                }
               // { 'name': res.data[i].name,sub:}
              }
            }

            temp_categoryall.push(temp_category1)
            temp_categoryall.push(t_o[0].sub)

            //console.log(t_o)

            that.setData({
              
              multiArray: temp_categoryall,
              categoryArray: t_o,
            })
            //categoryArray

            //console.log(that.data.categoryArray[1]['prefix'])
          }
        },
        complete(res) {
          //console.log(res.statusCode)
          if (res.statusCode == 500) {
          
          } else {

          }

        }
      })

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready: function () {
      // 在组件实例被从页面节点树移除时执行
      const query = wx.createSelectorQuery().in(this)
      var that = this 
      //useheight
     

      query.select('#top_main_head').boundingClientRect(function (res) {
        // 这个组件内 #the-id 节点的上边界坐标
       // console.log(res.height)
        that.setData({
          top_main_head_height: res.height,
        })
      }).exec()

      query.select('#top_main_head_title').boundingClientRect(function (res) {
        // 这个组件内 #the-id 节点的上边界坐标
        //console.log(res.height)
        that.setData({
          top_main_head_title_height: res.height,
        })
      }).exec()
      
      
      query.select('#top_main').boundingClientRect(function (res) {
        // 这个组件内 #the-id 节点的上边界坐标
        // console.log(res.height)
        that.setData({
          useheight:  res.height,
          top_main_height: res.height,
        })
      }).exec()

      query.select('#foot_btn_shi').boundingClientRect(function (res) {
        // 这个组件内 #the-id 节点的上边界坐标
        //console.log(res.height)
        that.setData({
         foot_btn_shi_height: res.height,
        })
      }).exec()

      query.select('#foot').boundingClientRect(function (res) {
        //console.log(app.globalData.windowHeight)  // 这个组件内 #the-id 节点的上边界坐标

        that.setData({
          foot_height: res.height,
          scrollheight: app.globalData.windowHeight-(that.data.useheight + res.height)-15
        })
       // console.log(that.data.scrollheight) 
      }).exec()

      // console.log(111) 

    },
  }, 
  methods: {
    bindKeyInput: function(e) {
      this.setData({
        msgdata: e.detail.value
      })
    },
    sendmsg: function(e) {
       //console.log(e)
      //console.log(this.data.canvasList)

      //console.log(e.currentTarget.dataset.hasOwnProperty('val') )
      //按钮过来的文字
      if (e.currentTarget.dataset.hasOwnProperty('val')){
        if (e.currentTarget.dataset.val != '') {
          //console.log(1111111111)
          this.setData({
            msgdata: e.currentTarget.dataset.val,
          })
        }
      }

      if (this.data.msgdata==''){

        return false;

      }
      //看看是不是九歌
      if (this.data.categoryArray.length>0){
        //console.log(util.search_string_start(this.data.msgdata, this.data.categoryArray[1]['prefix']))
        if (util.search_string_start(this.data.msgdata, this.data.categoryArray[1]['prefix'])){

          this.setData({
            sync: 1,
            loadModal: true,
          })
        }
      }

      var tempdatamsglist = this.data.msgList

      var tempmsgdata = this.data.msgdata

      var temp_canvars_list = this.data.canvasList

      this.setData({
        msgdata: '',
        loading_top: true,
      })

      tempdatamsglist.push({
        speaker: 'self',
        contentType: 'text',
        content: tempmsgdata,
        time: util.timestampToString(),
      })

      this.setData({
        msgList: tempdatamsglist,
        toView: 'msg-' + (this.data.msgList.length - 1),
      })

      this.setData({
        Inputdisabled: !this.data.Inputdisabled
      })
      var that = this
      wx.request({
        url: app.globalData.url + '/Response', //仅为示例，并非真实的接口地址
        data: {
          text: tempmsgdata,
          sync:that.data.sync
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          if (res.data.message == 'success') {
            // console.log(res.data)
          //  console.log(res.data.data.person[0])

            var tempdatapersondesc = []
            var tempdatapersonname = []
            var tempdatapersonrel = []
            if (res.data.data.person[0] ){

              for (var i = 0; i < res.data.data.person.length; i++) {
                tempdatapersondesc.push(res.data.data.person[i].desc)
                tempdatapersonname.push( res.data.data.person[i].name)
                tempdatapersonrel.push(res.data.data.person[i].rel)
               temp_canvars_list.push({
                  name: tempdatapersonname[i],
                 rel: tempdatapersonrel[i],
                 })
              } 
            } 
           // console.log(temp_canvars_list)

            for (i = 0; i < res.data.data.text.length;i++){
                if(i<3){
                  if (i == 2 && res.data.data.text.length>3){

                    tempdatamsglist.push({
                      speaker: 'server',
                      contentType: 'text',
                      content: res.data.data.text[i],
                      time: util.timestampToString(),
                      contentlist: res.data.data.text,
                      toptitle: tempmsgdata,
                    })

                  }else{
                    tempdatamsglist.push({
                      speaker: 'server',
                      contentType: 'text',
                      content: res.data.data.text[i],
                      time: util.timestampToString(),
                    })
                  }
                 
                }
            }
            

            that.setData({
              msgList: tempdatamsglist,
              //toView: 'msg-' + (tempdatamsglist.length - 1),
              person_desc: tempdatapersondesc,
              person_name: tempdatapersonname,
              relList: tempdatapersonrel,
              canvasList: temp_canvars_list,
            })
   
          }
        } ,
        complete(res) {
          
          //console.log(res.statusCode)
          if (res.statusCode==500){
            that.setData({
              
              person_desc: '',
              person_name: '',
              relList: [],
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
              loadModal: false,
              sync: 0
            })

          }else{
            
            that.setData({
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
              loadModal: false,
              sync: 0
            })

          }
          
          setTimeout(() => {
            that.scrollheight()
          }, 200)
          
          
        }
      })
 
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    showModal(e) {
      console.log(e.currentTarget.dataset.target)
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    loadModal() {
      this.setData({
        loadModal: true
      })
      setTimeout(() => {
        this.setData({
          loadModal: false
        })
      }, 2000)
    },
    InputFocus(e) {
      // console.log(e.detail.height)
      this.setData({
        InputBottom: e.detail.height
      })
    },
    InputBlur(e) {
      // console.log(222)
      this.setData({
        InputBottom: 0
      })
    },
    upper: function(e) {
      // console.log(e)
    },
    lower: function(e) {
      // console.log(e)
    },
    scroll: function(e) {
      // console.log(e)
    },
    tapMove(e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },
    scrollheight(){
        // 三种情况  一种为没有 tab 和介绍 和相关人物  一种为啥信息也没有  一种为 没有相关人物
        //
      //toView: 'msg-' + (tempdatamsglist.length - 1),
      console.log(this.data.foot_btn_shi_height) 
      if (this.data.person_name.length>0){
        
          this.setData({
            scrollheight: app.globalData.windowHeight - (this.data.foot_height + this.data.top_main_height) - 15 
          })
        }else{
         // console.log(222) 
          this.setData({
            scrollheight: app.globalData.windowHeight - (this.data.foot_height + this.data.top_main_head_height + this.data.top_main_head_title_height) - 15 - this.data.foot_btn_shi_height
            
          })
        }
        // console.log(111) 

      setTimeout(() => {
        this.setData({
           toView: 'msg-' + (this.data.msgList.length - 1),
        })
      }, 200)

     // console.log(this.data.toView) 
    },
    gotoPage1: function (e) {

      // wx.navigateTo({
      //   url: '/pages/basics/ceshi/ceshi',
      // })
      //console.log(this.data.canvasList)
      //  let tmp_set_canvasList = this.data.canvasList
      //临时数组只能这样声明
      let tmp_set_canvasList = JSON.parse(JSON.stringify(this.data.canvasList));

      if (tmp_set_canvasList.length>0){
        //大于1 的话  把默认的删除掉
        if (tmp_set_canvasList.length > 1) {
          tmp_set_canvasList.splice(0, 1); 
        }
        //如果大于2 的话 就取 数组 后三个
        if (tmp_set_canvasList.length > 2) {
          tmp_set_canvasList = tmp_set_canvasList.slice(-3, tmp_set_canvasList.length)
        }
        
        console.log(tmp_set_canvasList)
        //console.log(JSON.stringify(tmp_set_canvasList))
        //console.log(this.data.canvasList)
        wx.setStorage({
          key: "canvasList",
          data: tmp_set_canvasList
        })
      }
 
      wx.navigateTo({
        //url: '/pages/basics/atlas/atlas',
        url: '/pages/basics/atlastoall/atlastoall',
      })
    }
    , 
    MultiChange(e) {
      //console.log(e.detail.value);
      //console.log(this.data.categoryArray[e.detail.value[0]].prefix[e.detail.value[1]]);
      let c = this.data.categoryArray[e.detail.value[0]].prefix[e.detail.value[1]]+" ";
      if(c!=''){
        this.setData({
          msgdata: c,
         // input_focus:true
        })
      }

      this.setData({
        multiIndex: e.detail.value
      })
    },
    MultiColumnChange(e) {
      //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      let data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          data.multiArray[1] = this.data.categoryArray[data.multiIndex[0]].sub;
          data.multiIndex[1] = 0;
          break;
        case 1:
          
          // data.multiIndex[2] = 0;
          break;
      }
      this.setData(data);
    },
    bindChange: function (e) {
      const val = e.detail.value
      console.log(e.detail)
      // this.setData({
      //   year: this.data.years[val[0]],
      //   month: this.data.months[val[1]],
      // })
    },
    

  }

})