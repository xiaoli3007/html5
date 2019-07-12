import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function setOption(chart, data_list, link_list) {
  var option = {
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    title: {
      text: ''
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'circular',
        symbolSize: 50,
        roam: true,
        label: {
          normal: {
            show: true
          }
        },
        // edgeSymbol: ['circle', 'arrow'],
        // edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        data: data_list,
        // links: [],
        links: link_list,
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      }
    ]
  };
  chart.setOption(option);
}


Page({
  
  data: {
    // ec: {
    //   onInit: initChart
    // },
    CustomBar: app.globalData.CustomBar,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    datatmep_m:[],
    linktemp_m: [],
    all_data:[]
  },
  showModal(e) {
   // console.log(111)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  show_canvars(e) {
    console.log(e.currentTarget.dataset.target)
    var inde = e.currentTarget.dataset.target
    var tempname = this.data.all_data[inde].name;
    var datatmeplist = this.data.all_data[inde].rel;
    var datatmep = [];
    var linktemp = [];

    datatmep.push({ name: tempname });
    datatmeplist.forEach(function (value, i) {
      if (i < 5) {
        let t = {}
        t.name = value.name;
        datatmep.push(t);

        let link = {}
        link.source = tempname;
        link.target = value.name;
        link.label = {
          normal: {
            show: true,
            formatter: value.relationType
          }
        };
        linktemp.push(link);
      }
      //console.log( value);
    })

         console.log(datatmep);
         console.log(linktemp);

    this.setData({
      datatmep_m: datatmep,
      linktemp_m: linktemp,
    })

      this.ecComponent = this.selectComponent('#mychart-dom-pie');
      this.ecComponent.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        setOption(chart, this.data.datatmep_m, this.data.linktemp_m);

        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;

        this.setData({
          isLoaded: true,
          isDisposed: false,
          modalName: null
        });

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
  },
  onLoad: function () {
    
   // console.log(this.data.ec);
 
    var that = this
    wx.getStorage({
      key: 'canvasList',
      success(res) {
        console.log(res.data)
        var leng = res.data.length-1
        var tempname = res.data[leng].name;
        var datatmeplist = res.data[leng].rel ;
        var datatmep = [];
        var linktemp = [];

        datatmep.push({ name: tempname});
        datatmeplist.forEach(function (value, i) {
          if(i<5){
            let t = {}
            t.name = value.name;
            datatmep.push(t);

            let link = {}
            link.source = tempname;
            link.target = value.name;
            link.label = {
              normal: {
                show: true,
                formatter: value.relationType
              }
            };
            linktemp.push(link);
          }
          　//console.log( value);
        })

        // console.log(datatmep);
        // console.log(linktemp);
        that.setData({
          datatmep_m: datatmep,
          linktemp_m: linktemp,
          all_data: res.data
        })
      }

    })

  },
  onReady() {

    //console.log(this.data.datatmep_m);
    //console.log(this.data.linktemp_m);
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, this.data.datatmep_m,this.data.linktemp_m);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });

  }
});