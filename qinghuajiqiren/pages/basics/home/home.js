const date = new Date()
const years = []
const months = []


for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}


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
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    valueaa: [9999, 1],
    TabCur: 0,
    scrollLeft: 0,
    loading_top: false,
    InputBottom: 0,
    person_name: ['白居易'],
    person_desc: ['白居易 (772-846), 男, 文人, 僧人, [為官者：文], 工於文, 書法家, 詩人, 籍贯：唐朝-河东道-太原-太谷, 字：乐天, 行第：白二十二, 规范名：白居易, 諡號：文, 未詳：醉吟先生, 未詳：白文公, 未詳：白傅, 室名、別號：香山居士, 曾任：府戸曹参军(0), 府尹(0), 翰林学士(807), 翰林学士(0), 翰林学士(0), 秘书监(827), 秘书省校书郎(803), 司门员外郎(820), 太子宾客(0), 太子宾客分司东都(829), 太子少傅(0), 太子左庶子分司东都(824), 太子左赞善大夫(0), 县尉(0), 刑部尚书(0), 刑部尚书(0), 刑部侍郎(930), 右仆射(0), 知制诰(820), 中书舍人(821), 州刺史(0), 州刺史(822), 州刺史(0), 州刺史(835), 州刺史(830), 州刺史(825), 州刺史(822), 州刺史(818), 主客郎中(0), 左拾遗(0), 司马(0), 為Y作墓誌銘：郑太郡, 文風為Y所效法：李宗易, 女兒：白金銮, 為Y作墓誌銘：皇甫镛, 相唱和：关盼盼, 姻親：皇甫曙, 子：白景受, 祖父：白锽, 父：白季庚, 父：白季庚, 墓誌銘由Y所作：李商隐, 從兄弟;堂兄弟：白敏中, 弟：白行简, 為Y作墓誌銘：元稹'],
    Inputdisabled: false,
    useheight: 0,
    scrollheight: 300,
    msgdata: '',
    toView: '',
    scrollTop: 100,
    userInfo: {},
    hasUserInfo: false,
    msgList: [{
      speaker: 'server',
      contentType: 'text',
      content: '您好，我是清华大学图书馆智能机器人小图，我可以陪你聊天，还有一些特殊功能',
      time: util.timestampToString(),
    }],
    relList: [[{
      "name": "郑太郡",
      "relationType": "為Y作墓誌銘",
      "uri": "http://data.library.sh.cn/entity/person/yq66vpyttor3aktl"
    },
      {
        "name": "李宗易",
        "relationType": "文風為Y所效法",
        "uri": "http://data.library.sh.cn/entity/person/1eo922b4k2avwyqc"
      },
      {
        "name": "白金銮",
        "relationType": "女兒",
        "uri": "http://data.library.sh.cn/entity/person/7iua3blpb7u584mb"
      },
      {
        "name": "皇甫镛",
        "relationType": "為Y作墓誌銘",
        "uri": "http://data.library.sh.cn/entity/person/7j9cy2ne9yuq7k14"
      },
      {
        "name": "关盼盼",
        "relationType": "相唱和",
        "uri": "http://data.library.sh.cn/entity/person/r393vc52fbc9vrmg"
      }]],
    canvasList: [{
      name: '白居易', rel: [{
        "name": "郑太郡",
        "relationType": "為Y作墓誌銘",
        "uri": "http://data.library.sh.cn/entity/person/yq66vpyttor3aktl"
      },
        {
          "name": "李宗易",
          "relationType": "文風為Y所效法",
          "uri": "http://data.library.sh.cn/entity/person/1eo922b4k2avwyqc"
        },
        {
          "name": "白金銮",
          "relationType": "女兒",
          "uri": "http://data.library.sh.cn/entity/person/7iua3blpb7u584mb"
        },
        {
          "name": "皇甫镛",
          "relationType": "為Y作墓誌銘",
          "uri": "http://data.library.sh.cn/entity/person/7j9cy2ne9yuq7k14"
        },
        {
          "name": "关盼盼",
          "relationType": "相唱和",
          "uri": "http://data.library.sh.cn/entity/person/r393vc52fbc9vrmg"
        }]}]
      ,
    multiArray: [],
    objectMultiArray: [],
    multiIndex: [0, 0],
    categoryArray: [],
 
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
             console.log(res.data)
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

            console.log(t_o)

            that.setData({
              
              multiArray: temp_categoryall,
              categoryArray: t_o,
            })
            //categoryArray
          }
        },
        complete(res) {
          console.log(res.statusCode)
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
     

      query.select('#top_main').boundingClientRect(function (res) {
        // 这个组件内 #the-id 节点的上边界坐标
        // console.log(res.height)
        that.setData({
          useheight:  res.height
        })
      }).exec()

      query.select('#foot').boundingClientRect(function (res) {
        console.log(app.globalData.windowHeight)  // 这个组件内 #the-id 节点的上边界坐标

        that.setData({
          scrollheight: app.globalData.windowHeight-(that.data.useheight + res.height)-15
        })
        console.log(that.data.scrollheight) 
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
       console.log(e)
      console.log(this.data.canvasList)

      console.log(e.currentTarget.dataset.hasOwnProperty('val') )
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
            console.log(temp_canvars_list)
            tempdatamsglist.push({
              speaker: 'server',
              contentType: 'text',
              content: res.data.data.text,
              time: util.timestampToString(),
            })
            that.setData({
              msgList: tempdatamsglist,
              toView: 'msg-' + (tempdatamsglist.length - 1),
              person_desc: tempdatapersondesc,
              person_name: tempdatapersonname,
              relList: tempdatapersonrel,
              canvasList: temp_canvars_list,
            })
   
          }
        } ,
        complete(res) {
          console.log(res.statusCode)
          if (res.statusCode==500){
            that.setData({
              
              person_desc: '',
              person_name: '',
              relList: [],
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
            })

          }else{
            
            that.setData({
              Inputdisabled: !that.data.Inputdisabled,
              loading_top: false,
            })

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
    gotoPage1: function (e) {

      
      var tmp_set_canvasList = []

      if (this.data.canvasList.length>0){
        if (this.data.canvasList.length > 2) {

          tmp_set_canvasList = this.data.canvasList.slice(-3, this.data.canvasList.length)
        }else{
          tmp_set_canvasList = this.data.canvasList
        }
        console.log(tmp_set_canvasList)
        wx.setStorage({
          key: "canvasList",
          data: tmp_set_canvasList
        })
      }
 
      wx.navigateTo({
        url: '/pages/basics/atlas/atlas',
      })
    }
    ,
    MultiChange(e) {
      console.log(e.detail.value);
      console.log(this.data.categoryArray[e.detail.value[0]].prefix[e.detail.value[1]]);
      

      this.setData({
        multiIndex: e.detail.value
      })
    },
    MultiColumnChange(e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      let data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.multiIndex[0]) {
            case 0:
              data.multiArray[1] = this.data.categoryArray[0].sub;
             
              break;
            case 1:
              data.multiArray[1] = this.data.categoryArray[1].sub;
            
              break; 
          }
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
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
      })
    }

  }

})