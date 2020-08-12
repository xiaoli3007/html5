App({
  initUiGlobal() {
    wx.getSystemInfo({
      success: e => {
        const { statusBarHeight: StatusBar, screenHeight, windowWidth } = e
        this.store.StatusBar = StatusBar
        this.store.screenHeight = screenHeight
        this.store.windowWidth = windowWidth
        const capsule = wx.getMenuButtonBoundingClientRect()
        if (capsule) {
          this.store.Custom = capsule
          this.store.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight
        } else {
          this.store.CustomBar = StatusBar + 50
        }
      }
    })
  },  
  initEnv() { 
    const envVersion = __wxConfig.envVersion

    console.log(__wxConfig)
    //youyouduizhan-dev-l424m
    //youyoushizi-n98dj-pmrow
    const env = envVersion === 'develop' ? 'youyouduizhan-dev-l424m' : 'youyouduizhan-dev-l424m' // 'prod-words-pk' // ['develop', 'trial', 'release']
    wx.cloud.init({ 
      env,
      traceUser: true
    })  
    this.store.env = env
  },
  onLaunch() {
    this.initEnv() 
    this.initUiGlobal()
  },
  store: {
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    screenHeight: null,
    windowWidth: null,
    env: '',
    adState: true
  }
})
