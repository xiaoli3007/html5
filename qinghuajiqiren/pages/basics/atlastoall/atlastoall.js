import * as echarts from '../../../ec-canvas/echarts';
var util = require('../../../utils/util.js')
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
        // force: {
        //   gravity:1,
        //   repulsion:100,
        //   edgeLength: [10, 50]
        // },
        symbolSize: 38,
        roam: true,
        label: {
          normal: {
            show: true
          }
        },
         //edgeSymbol: ['circle', 'arrow'],
         //edgeSymbolSize: [0, 5],
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
            width: 1,
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
  onLoad: function () {
    
   // console.log(this.data.ec);
 
    var that = this
    wx.getStorage({
      key: 'canvasList',
      success(res) {
        console.log(res.data)
        // var leng = res.data.length-1
        // var tempname = res.data[leng].name;
        // var datatmeplist = res.data[leng].rel ;
        var datatmep = [];
        var linktemp = [];
        for (var i = 0; i < res.data.length;i++){

          let tempname = res.data[i].name;
          let datatmeplist = res.data[i].rel;
          datatmeplist = util.deteleObject_key(datatmeplist, 'name')
          datatmep.push({ name: tempname });
          datatmeplist.forEach(function (value, i) {
            if (i < 3) {
              let t = {}
              t.name = value.name;
              datatmep.push(t);

              let link = {}
              link.source = tempname;
              link.target = value.name;
              link.label = {
                normal: {
                  show: true,
                  formatter: value.relationType,
                  fontSize:12
                }
              };
              linktemp.push(link);
            }
            //console.log( value);
          })

          if (res.data.length>1){
            // 主要人物之间的连线
            let m_l = i + 1 == res.data.length ? 0 : i + 1;

            let linkmain = {}
            linkmain.source = res.data[i].name;
            linkmain.target = res.data[m_l].name;
            linkmain.label = {
              normal: {
                show: true,
                formatter: '',
                fontSize: 12
              }
            };

            console.log(linkmain);
            linktemp.push(linkmain);

          }
         

        }
       // console.log(datatmeplist)
            
        datatmep = util.deteleObject_key(datatmep, 'name')
        //console.log(datatmep);
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