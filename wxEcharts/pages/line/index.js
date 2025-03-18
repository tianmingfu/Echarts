import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
Page({
  data: {
    canvasConfig:{
      xCount:8,
      yCount:5,
    },
  },
  onLoad(options){
    let _this = this
    let xdesText = ['1','2',3,4,5,6,7,'8']
    let kwDatas = [0, 1, 2, 3, 4, 5, 3, 2,]
    let tdatas = [4, 13, -32, 73, 89, 93,80, 90,]
    let socDatas = [0, 3, 4, 30, 49, 52, 60, 79,]
    _this.initchart(xdesText,kwDatas,tdatas,socDatas);
  },
  
  loadchart(xdesText,kwDatas,tdatas,socDatas){
    //  刻度信息
    let keduInfo = this.unifiedDivision(kwDatas,tdatas,socDatas)
  console.log('keduInfokeduInfo',keduInfo);
    // 绑定组件（ec-canvas标签的id）
    let ec_canvas = this.selectComponent('#mychart-dom-line');
    ec_canvas.init((canvas,width,height,dpr)=>{
      const chart =echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 解决模糊显示的问题
      })
      // echart表格的内容配置
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },  
        // 图例组件
        // color: ["#00c5d5", "#f4cc60", "#b59100"],
        legend: {
            show:true,
            // borderColor :'#444444',
            // borderWidth :10,
            // borderRadius:10,
            shadowColor:'#b59100',
            selector :false,
            data: [
              {
                symbolRotate:'inherit',
                name: "SOC",
                itemStyle :{

                },
                lineStyle:{
                  inactiveColor: '#ccc',
                  shadowColor:'#544312'

                }
              }, {
                name: "电流",          
                itemStyle :{
                  
                },
                lineStyle:{
                  inactiveColor: '#ccc',
                  shadowColor:'#544312'

                }
              }, {
                name: "温度",
                itemStyle :{
                  
                },
                lineStyle:{
                  inactiveColor: '#ccc',
                  shadowColor:'#544312'
                }
              }
          ],
            top: 10,
            left: "center",
            shadowColor :'#ffffff',
            backgroundColor :'#ffffff',
            tooltip: {
              show: true
          }
        },
        // 直角坐标系内绘图网格
        grid: {
            show: true,
            // x: 40,
            // y: 60,
            // x2: 40,
            // y2: 40,
            // borderWidth :11,
            containLabel:false,
            // borderColor:'#ccc',
            // backgroundColor :'#909090',
        },
        xAxis: {
            // name: "X轴数据",
            type: "category",
            data: xdesText,
            nameTextStyle: {
                // padding: [0, 0, 50, 50]
            },
        },
        yAxis: [
            {
                type: "value",
                name: "A",
                min:keduInfo.newLeftMin,
                max:keduInfo.newLeftMax,
                interval:keduInfo.leftInterval,
                nameTextStyle: {
                    padding: [0, 0, 0, 0],
                    color: '#999999'
                },
                splitNumber: 5, //设置坐标轴的分割段数
                axisLabel: {
                    color: '#999999'
                }
            },
            {
              min:keduInfo.newRightMin,
              max:keduInfo.newRightMax,
              interval:keduInfo.rightInterval,
              type: "value",
              name: "­°C/SOC",
              nameTextStyle: {
                    padding: [0, 0, 0, 0],
                    color: '#999999'
                },
                splitNumber: 5,
                // alignTicks: true, // ！！配置多坐标轴标签对齐
                axisLabel: {
                  color: '#999999'
              }
            },
        ],
        series: [
          {
            name: "SOC",
            type: "line",
            color: ["#00c5d5"],
            // symbol: "none",
            smooth: true,
            yAxisIndex: 1, //在单个图表实例中存在多个y轴的时候有用
            // areaStyle: {},
            data: socDatas
        },
            {
                name: "电流",
                type: "line",
                color: ["#ff7200"],
                // symbol: "none",
                smooth: true,
                data: kwDatas,
                // areaStyle: {},
            },
    
          {
                name: "温度",
                type: "line",
                color: ["#f4cc60"],
                // symbol: "none",
                smooth: true,
                // areaStyle: {},
                yAxisIndex: 1, //在单个图表实例中存在多个y轴的时候有用
                data:  tdatas 
            }
        ]
    }
      chart.setOption(option);
      return chart;
    })
  },
  initchart(xdesText,kwDatas,tdatas,socDatas){
    this.loadchart(xdesText,kwDatas,tdatas,socDatas);
  },
  random(){
    let xdesText = ['1','12',3,4,5,6,7,'8','14','11']
    let kwDatas = [0, 1, 2, 3, 4, 5, 3, 2, 3,2]
    let tdatas = [4, 13, 32, 73, 89, 93,80, 90, 90, 90]
    let socDatas = [0, 3, 14, 30, 49, 52, 60, 79, 80,90]
    this.loadchart(xdesText,kwDatas,tdatas,socDatas);
  },

  // 设置刻度
unifiedDivision(kwDatas,tdatas,socDatas){
  let maxLeft = Math.max(...kwDatas)
  let maxSOC = Math.max(...socDatas)
  let maxTem = Math.max(...tdatas)
  let maxRight = maxTem>maxSOC ? maxTem:maxSOC

  let minLeft = Math.min(...kwDatas)
  let minSOC = Math.min(...socDatas)
  let minTem = Math.min(...tdatas)
  let minRight = minTem<minSOC ? minTem:minSOC

  let newLeftMax = Math.ceil(maxLeft / 5) * 5
  let newRightMax = Math.ceil(maxRight / 5) * 5
  if(newRightMax<100){
    newRightMax = 100
  }
  if(newLeftMax<5){
    newLeftMax = 5
  }
  let newLeftMin = Math.floor(minLeft / 5) * 5
  let newRightMin = Math.floor(minRight / 5) * 5

  console.log('newLeftMax',newLeftMax);
  console.log('newRightMax',newRightMax);
  console.log('newLeftMin',newLeftMin);
  console.log('newRightMin',newRightMin);

  let leftInterval = (newLeftMax-newLeftMin) / this.data.canvasConfig.yCount
  let rightInterval = (newRightMax-newRightMin) / this.data.canvasConfig.yCount
  
  console.log("leftInterval",leftInterval);
  console.log("rightInterval",rightInterval);

  return {newLeftMax,newRightMax,newLeftMin,newRightMin,leftInterval,rightInterval}
},
});
