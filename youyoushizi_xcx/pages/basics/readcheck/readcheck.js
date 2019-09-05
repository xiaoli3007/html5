const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    taskinfo: null,
    word_data: [],
    loadModal: true,
    isLoad: true,
    ctaskid:0,
    task_result: [],
  },
  onLoad(options) {

    console.log(options.taskid)

    let that = this;
    //加载列表
    wx.request({
      url: app.globalData.url + '?act=taskone',
      data: {
        taskid: parseInt(options.taskid),
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-Token': app.globalData.xtoken
      },
      success(res) {

        console.log(res.data)
        

        var linktemp1 = []; 
        res.data.word_data.word1.forEach(function (value, i) {
          
          linktemp1.push({ 'wcellid': value.wcellid, 'status': 1 })
          
        })
        console.log(linktemp1);
        that.setData({

          ctaskid: res.data.taskid,
          taskinfo: res.data.taskinfo,
          word_data: res.data.word_data,
          task_result: linktemp1,
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
  check_word(e) {
     
    if (e.currentTarget.dataset.hasOwnProperty('mindex')) {
      console.log(e.currentTarget.dataset.mindex)
      console.log(e.currentTarget.dataset.status)

      var tprice = 'task_result[' + e.currentTarget.dataset.mindex + '].status'
      this.setData({
        [tprice]: parseInt(e.currentTarget.dataset.status),
      })
       
      console.log(this.data.task_result)
    }

  },

})