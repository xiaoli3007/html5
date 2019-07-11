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

function initChart(canvas, width, height, data_list, link_list) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var datatmep = [{
    name: '节电费广东',
    // x: 300,
    // y: 300,
    itemStyle: {
      color: '#37A2DA'
    }
  }, {
    name: '节点2',
    // x: 800,
    // y: 300,
    itemStyle: {
      color: '#32C5E9'
    }
  }, {
    name: '节点3',
    // x: 550,
    // y: 100,
    itemStyle: {
      color: '#9FE6B8'
    }
  }, {
    name: '节点4',
    // x: 550,
    // y: 500,
    itemStyle: {
      color: '#FF9F7F'
    }
  }];

  var linktemp = [
    //   {
    //   source: 0,
    //   target: 1,
    //   symbolSize: [5, 20],
    //   label: {
    //     normal: {
    //       show: true
    //     }
    //   },
    //   lineStyle: {
    //     normal: {
    //       width: 4,
    //       curveness: 0.2
    //     }
    //   }
    // },
    {
      source: '节点2',
      target: '节电费广东',
      label: {
        normal: {
          show: true,
          formatter: '的发 芬斯蒂芬'
        }
      },
      // lineStyle: {
      //   normal: { curveness: 0.2 }
      // }
    }, {
      source: '节点2',
      target: '节点3'
    }, {
      source: '节点2',
      target: '节点4'
    }];
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
  return chart;
}

Page({
  
  data: {
    // ec: {
    //   onInit: initChart
    // },

    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    datatmep_m:[],
    linktemp_m: [],
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