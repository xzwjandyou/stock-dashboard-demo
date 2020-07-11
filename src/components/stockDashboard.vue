<template>
  <div class="stock-dashboard">
    <div class="title">100家股票模拟chart</div>
    <div class="button" @click="controlButtonClicked">{{buttonTitle}}</div>
    <div class="container">
      <div v-for="(item,index) in chartList" class="chart-box" :key="item.symbol">
        <div>{{index + 1}}</div>
        <div :id="item.symbol" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import Vue from 'vue';
  import stocks from '../mock/stocksModule.js';
  import Stock from '../mock/stock.js';

  // Vue.prototype.$echarts = echarts;

  export default {
    name: 'stockDashboard',
    components: {
      // listView,
    },
    data () {
      return {
        chartList:[],
        start: false,
        buttonTitle: '开始更新',
        timeId: null,
        timeIds: [],
      }
    },
    mounted () {
      this.initchart();
    },
    methods: {
      // 初始化股票，并且设置chart
      initchart() {
        for (let index in stocks) {
          const stock = new Stock(stocks[index]);
          this.chartList.push(stock);
        }
        this.$nextTick(() => {
          for(let i = 0; i < this.chartList.length; i++) {
            const stock = this.chartList[i];
            // console.log(stock.symbol);
            const dom = document.getElementById(stock.symbol);
            stock.chart = echarts.init(dom);
            stock.chart.setOption(stock.option);
          }
        });
      },
      controlButtonClicked() {
        if (!this.start) {
          // 开启
          for(let i = 0; i < this.chartList.length; i++) {
            this.chartList[i].start(i);
          }
          this.timeId = setInterval(() => {
            for(let i = 0; i < this.chartList.length; i++) {
              this.$nextTick(() => {
                setTimeout(() => {
                  const stock = this.chartList[i];
                  stock.chart.setOption(stock.option);
                }, Math.round(Math.random()*5000))
              });
            }
          }, 1000);

          this.start = true;
          this.buttonTitle = '暂停更新';
        } else {
          // 暂停
          for(let i = 0; i < this.chartList.length; i++) {
            this.chartList[i].stop(i);
          }
          this.start = false;
          this.buttonTitle = '开始更新';
          clearInterval(this.timeId);
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .stock-dashboard {
    * {  will-change: all;}
    .title {
      padding-top: 30px;
      font-size: 20px;
    }
    .button {
      width: 80px;
      height: 24px;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 40px;
      border: 1px solid black;
      cursor: pointer;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      width: 1200px;
      margin: 0 auto;
      justify-content: center;
      .chart-box {
        .chart {
          width:540px;
          height:300px;
        }
      }
    }
    .list-wrap{
      position: relative;
      overflow-y: scroll;
      margin: 100px auto;
      box-sizing: border-box;
      border: solid 1px red;
    }
    .list{
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
