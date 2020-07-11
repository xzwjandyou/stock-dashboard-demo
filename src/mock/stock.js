import echarts from "echarts";

class Stock {
  constructor (stock) {
    // 股票价格
    this.name = stock.sname;
    // 股票代码
    this.symbol = stock.symbol;
    // 当前价格
    this.currentPrice = 0;
    // 价格数据组
    this.prices = [];
    // 定时器id
    this.timeId = null;
    // 基准价格（随机定义）
    this.basePrice = Math.round(Math.random() * 100) + 10;
    // 基准价格下限
    this.min = this.basePrice - 10;
    // 基准价格上限
    this.max = this.basePrice + 20;
    // 横坐标时间数组
    this.times = [];
    // 数据更新间隔
    this.intervalTime = 500;
    // chart对象
    this.chart = null;
    // mock 时间
    this.mockTimes();
    // chart基本配置
    this.option = {
      legend: {},
      xAxis: {
        type: 'category',   // 还有其他的type
        data: this.times,   // x轴数据
        name: '时间',   // x轴名称
        // x轴名称样式
        nameTextStyle: {
          fontSize: 12
        },
        // 控制网格线是否显示
        splitLine: {
          show: true,
          //  改变轴线颜色
          lineStyle: {
            // 使用深浅的间隔色
            color: '#ccc'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '股票价格(元)',   // y轴名称
        max: this.max,
        min: this.min,
        nameTextStyle: {
          fontSize: 12
        },
        axisLabel: {
          textStyle: {
            color: '#000'
          }
        },
        splitArea:{// 分隔区域
          show:true, // 默认不显示，属性show控制显示与否
          areaStyle:{// 属性areaStyle（详见areaStyle）控制区域样式
            color:['#fbfbfb','#fbfbfb'],//设置格子背景颜色，第一个设置奇数格子，第二个设置偶数格子
            opacity:1
          }
        }
      },
      label: {},
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          name: this.name,
          type: 'line',
          smooth: true,
          symbol: 'none',
          // sampling: 'average',
          yAxisIndex: 0,
          itemStyle: {
            color: '#309FEA',
            width:1
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#309FEA'
            }, {
              offset: 1,
              color: '#c0dfef',
            }])
          },
          data: this.prices,
        },
      ]
    }
  }
  // 添加价格操作
  updatePrice(price) {
    this.prices.push(price);
    this.currentPrice = price;
  }
  // 启动
  start() {
    this.timeId = setInterval(() => {
      const randomPrice = randomNum(this.basePrice+10, this.basePrice, 2);
      this.updatePrice(randomPrice);
      if (this.chart) {
        this.chart.setOption(this.option);
      }
    }, this.intervalTime);
  }
  stop() {
    clearInterval(this.timeId);
  }
  mockTimes() {
    let _current = new Date();
    let oneMinute = 60 * 1000 * 1;
    let base = +new Date(_current.getFullYear(), _current.getMonth(), _current.getDate(), 9, 29, 0);
    for (let i = 1; i < 100; i++) {
      let now = new Date(base += oneMinute);
      this.times.push([now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours(), now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes(), now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds()].join(':'));
    }
  }
}

function randomNum(maxNum, minNum, decimalNum) {
  return (Math.random() * (maxNum - minNum) + minNum).toFixed(decimalNum);
}

export default Stock;


// const stock = new Stock();
// stock.start();
// setTimeout(() => {
//   console.log(stock.getPriceData());
// }, 5000);
