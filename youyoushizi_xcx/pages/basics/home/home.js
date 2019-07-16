Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    TabCur: 0,
    scrollLeft: 0,
    jiaocaiList: [{
      id: '1',
      image: 'red',
      url: 'jiaocai',
      name: '一年级语文上册（人教版）'
    }, {
      id: '2',
      image: 'orange',
      url: 'duwu',
      name: '一年级语文下册（人教版）'
    }, {
      id: '3',
      image: 'orange',
      url: 'duwu',
      name: '二年级语文上册（人教版）'
    }, {
      id: '4',
      image: 'orange',
      url: 'duwu',
      name: '三年级语文上册（人教版）'
    }]
  ,
    iconList: [{
      icon: 'square',
      color: 'red',
      badge: 80,
      url: 'jiaocai',
      name: '教材'
    }, {
      icon: 'pay',
      color: 'orange',
      badge: 15,
      url: 'duwu',
      name: '课外读物'
    }],
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
      badge: 22,
      name: '听写任务'
    }],
    gridCol: 3,
    skin: false,
    gridBorder: false

  },
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
  }

})