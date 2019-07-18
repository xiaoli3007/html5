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
    person_name: ['白居易'],
    person_desc: ['白居易 (772-846), 男, 文人, 僧人, [為官者：文], 工於文, 書法家, 詩人, 籍贯：唐朝-河东道-太原-太谷, 字：乐天, 行第：白二十二, 规范名：白居易, 諡號：文, 未詳：醉吟先生, 未詳：白文公, 未詳：白傅, 室名、別號：香山居士, 曾任：府戸曹参军(0), 府尹(0), 翰林学士(807), 翰林学士(0), 翰林学士(0), 秘书监(827), 秘书省校书郎(803), 司门员外郎(820), 太子宾客(0), 太子宾客分司东都(829), 太子少傅(0), 太子左庶子分司东都(824), 太子左赞善大夫(0), 县尉(0), 刑部尚书(0), 刑部尚书(0), 刑部侍郎(930), 右仆射(0), 知制诰(820), 中书舍人(821), 州刺史(0), 州刺史(822), 州刺史(0), 州刺史(835), 州刺史(830), 州刺史(825), 州刺史(822), 州刺史(818), 主客郎中(0), 左拾遗(0), 司马(0), 為Y作墓誌銘：郑太郡, 文風為Y所效法：李宗易, 女兒：白金銮, 為Y作墓誌銘：皇甫镛, 相唱和：关盼盼, 姻親：皇甫曙, 子：白景受, 祖父：白锽, 父：白季庚, 父：白季庚, 墓誌銘由Y所作：李商隐, 從兄弟;堂兄弟：白敏中, 弟：白行简, 為Y作墓誌銘：元稹'],
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
      }]
    }]
    ,
  }
})