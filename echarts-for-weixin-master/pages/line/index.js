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
    // let xdesText = ['11:11','12:22','11:32','11:43','11:55','12:06','12:07','12:08']
    // let kwDatas = [0, 1, 2, 3, 7, 5, 3, 2,]
    // let tdatas = [4, 13, 32, 73, 89, 93,80, 90,]
    // let socDatas = [0, 3, 4, 30, 49, 52, 60, 79,]

    let xdesText = [
      '14:26','14:27','14:28','14:29','14:31','14:32','14:33','14:34','14:35','14:36','14:37','14:38','14:39','14:40','14:41','14:42','14:43','14:44','14:45','14:46','14:47','14:48','']
    let kwDatas = [124.5, 124.4, 124.4, 124.5,124.4,124.5,124.4,124.4,124.5,124.4,
                   124.5, 124.4, 124.4, 124.5,124.4,124.5,124.5,124.5,124.5,124.5,
                   124.5,124.5]
    let tdatas =   [25,26,26,26,27,27,28,28,29,29,
                    30,31,32,33,34,35,36,36,36,36,
                    36,37,]
    let socDatas = [30,32,34,36,37,39,41,42,44,46,
                    48,49,51,53,55,56,60,61,65,67,
                    70,71]
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
          backgroundColor:'#ffffff',
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          backgroundColor:'rgba(255,255,255,0.5)',
          formatter: function (params) {
            var res =  params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              res += '\n' + params[i].seriesName + ' : ' + params[i].value + 
              'A';
          }          
          return res;
      }
        },  
        // 图例组件
        // color: ["#00c5d5", "#f4cc60", "#b59100"],
        legend: {
            data: ["SOC", "电流", "温度"],
            top: 0,
            left: "center",
            z: 100
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
            axisLine:{
              
            },
            boundaryGap:false,
            axisTick:{
              alignWithLabel:true
            }
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
            areaStyle: {},
            data: socDatas,
            label:{
              show:true,
              position:'top',
              textStyle:{
                // color: "#ffffff",
                fontSize: 10,
                // padding: 3,
                // backgroundColor:'#00c5d5',
                // borderRadius: 3,
                lineHeight: 10
             },
              formatter:(params)=>{
                if (option.series[0].data.length - 1 == params.dataIndex ||  params.dataIndex == 0) {
                  return 'SOC'+ params.value + "%"
                }else{
                  return ''
                }
              }
            }
        },
            {
                name: "电流",
                type: "line",
                color: ["#ff7200"],
                // symbol: "none",
                smooth: true,
                data: kwDatas,
                areaStyle: {},
                label:{
                  show:true,
                  position:'top',
                  textStyle:{
                    // color: "#ffffff",
                    fontSize: 10,
                    // padding: 3,
                    backgroundColor:'rgba(0,0,0,0.2)',
                    // borderRadius: 3,
                    lineHeight: 10
                 },
                  formatter:(params)=>{
                    console.log('1params',option.series[0].data);
                    if (option.series[0].data.length - 1 == params.dataIndex) {
                      return '车辆需求'+ params.value + "A" +'\n' + '车辆需求'+ params.value + "A"
                    }else{
                      return ''
                    }
                  }
                }
            },
    
          {
                name: "温度",
                type: "line",
                color: ["#f4cc60"],
                // symbol: "none",
                smooth: true,
                areaStyle: {},
                yAxisIndex: 1, //在单个图表实例中存在多个y轴的时候有用
                data:  tdatas ,
                label:{
                  show:true,
                  position:'left',
                  textStyle:{
                    // color: "#ffffff",
                    fontSize: 10,
                    // padding: 3,
                    // backgroundColor:'#00c5d5',
                    // borderRadius: 3,
                    lineHeight: 10
                 },
                  formatter:(params)=>{
                    if (option.series[0].data.length - 1 == params.dataIndex ||  params.dataIndex == 0) {
                      return '温度'+ params.value + "C"
                    }else{
                      return ''
                    }
                  }
                }
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
    let xdesText = ['11:11','12:22','11:32','11:43','11:55','12:06','12:07','15:08']
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

  let minLeft = 0
  let minSOC = Math.min(...socDatas)
  let minTem = Math.min(...tdatas)
  if (minTem>0) {
    minTem = 0
  }
  let minRight = minTem<minSOC ? minTem:minSOC

  let newLeftMax = Math.ceil(maxLeft / 10) * 10
  let newRightMax = Math.ceil(maxRight / 5) * 5
  if(newRightMax<100){
    newRightMax = 100
  }
  if(newLeftMax<5){
    newLeftMax = 5
  }
  let newLeftMin = Math.floor(minLeft / 10) * 10
  let newRightMin = Math.floor(minRight / 10) * 10

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
