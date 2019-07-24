//app.js
var util = require('utils/util.js')
App({
  onLaunch: function () {

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;

        this.globalData.windowHeight = e.windowHeight;
        // this.globalData.foottabbarheight = e.windowHeight * (750 / e.windowWidth);
        // console.log(e);
      }
    })
   
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    

  },
  globalData: {
    userInfo: null,
    url: 'https://sxt.gfusoft.com',
    foottabbar: null,
    person_name: ['杜甫'],
    person_desc: ['杜甫 (712-770), 男, 文人, [為官者：文], 書法家, 詩人, 籍贯：唐朝-关内道-京兆-长安, 行第：杜二, 规范名：杜甫, 字：子美, 封爵：杜工部, 曾任：参谋(0), 工部员外郎(0), 工部员外郎(764), 集贤院待制(751), 节度使判官(764), 卫冑曹参军(0), 县尉(755), 州司功参军(758), 右拾遗(0), 功曹参军(763), 未詳：裴虬, 為Y作墓誌銘：卢太君, 墓誌銘由Y所作：元稹, 直系後裔：杜莘老, 岳父：杨怡, 為Y作墓誌銘：杜氏(杜审言女), 子：杜嗣业, 長子; 第一子：杜宗武, 祖父：杜审言, 收到Y的贈詩、文：陆游, 次子：杜宗文, 父：杜闲'],
    msgList: [{
      speaker: 'server',
      contentType: 'text',
      content: '您好，我是清华大学图书馆智能机器人小图，我可以陪你聊天，还有一些特殊功能',
      time: util.timestampToString(),
    }],
    relList: [[{
      "name": "裴虬",
      "relationType": "未詳",
      "uri": "http://data.library.sh.cn/entity/person/y2hodrix1q867ksv"
    },
      {
        "name": "卢太君",
        "relationType": "為Y作墓誌銘",
        "uri": "http://data.library.sh.cn/entity/person/763zqs1a52mmjdvf"
      },
      {
        "name": "元稹",
        "relationType": "墓誌銘由Y所作",
        "uri": "http://data.library.sh.cn/entity/person/lwz7szbmww4hpvuo"
      },
      {
        "name": "杜莘老",
        "relationType": "直系後裔",
        "uri": "http://data.library.sh.cn/entity/person/7p4mr9hla9ooyzf4"
      },
      {
        "name": "杨怡",
        "relationType": "岳父",
        "uri": "http://data.library.sh.cn/entity/person/a2gahknkyfuaxhbr"
      }]],
    canvasList: [{
      name: '杜甫', rel: [{
        "name": "裴虬",
        "relationType": "未詳",
        "uri": "http://data.library.sh.cn/entity/person/y2hodrix1q867ksv"
      },
        {
          "name": "卢太君",
          "relationType": "為Y作墓誌銘",
          "uri": "http://data.library.sh.cn/entity/person/763zqs1a52mmjdvf"
        },
        {
          "name": "元稹",
          "relationType": "墓誌銘由Y所作",
          "uri": "http://data.library.sh.cn/entity/person/lwz7szbmww4hpvuo"
        },
        {
          "name": "杜莘老",
          "relationType": "直系後裔",
          "uri": "http://data.library.sh.cn/entity/person/7p4mr9hla9ooyzf4"
        },
        {
          "name": "杨怡",
          "relationType": "岳父",
          "uri": "http://data.library.sh.cn/entity/person/a2gahknkyfuaxhbr"
        }]
    }]
    ,
  } 
})