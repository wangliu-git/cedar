<template>
  <div class="main">
    <div class="up">
      <div class="green" >
        <div class="BD">
          <span style="font-size:36px;font-weight:400;color:rgba(255,255,255,1);">160</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">本单位数据导入量</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">（待校验 260：已校验 0）</span>
        </div>
        <div class="jiao">
          <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1)">
            <img src="./img/rise.png" alt /> <span>0%</span>
          </span>
          <el-button round style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(23,163,209,1);">去校验</el-button>
        </div>
      </div>

      <div class="orange">
        <div class="BL">
          <span style="font-size:36px;font-weight:400;color:rgba(255,255,255,1);">200</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">本单位数据录入量</span>
        </div>
        <div class="luru">
          <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1)">
            <img src="./img/rise.png" alt /><span> 0%</span>
          </span>
          <el-button round style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(23,163,209,1);">开始录入</el-button>  
        </div>
      </div>

      <div class="blue">
        <div class="YL">
         <span style="font-size:36px;font-weight:400;color:rgba(255,255,255,1);">0</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">外院首诊报告数量</span>
        </div>
        <div class="yuan">
          <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1)">
            <img src="./img/rise.png" alt /><span> 0%</span>
          </span>
          <el-button round style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(23,163,209,1);">外院首诊报告录入</el-button>  
        </div>
      </div>
    </div>

    <div class="down">
      <div class="zx">
        <div class="title">
          <i class="iconfont icontubiaozhizuo-">本单位病理报告量</i>
          <span>详情</span>
        </div>
        <div class="select">
          <el-select placeholder="请选择" style="margin-right:10px">
            <el-option></el-option>
          </el-select>

          <el-date-picker
            type="daterange"
            align="right"
            v-model="value"
            unlink-panels
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="请选择开始时间"
            end-placeholder="请选择结束时间"
          ></el-date-picker>
        </div>

        <div class="tu">
          <span>按照报告时间生成的报告数量折线图</span>
          <!-- echarts-->
          <div id="liu"></div>
        </div>
      </div>
      <div class="sx">
        <div class="title">
          <i class="iconfont icontubiaozhizuo-">病理报告量详情</i>
          <span>详情</span>
        </div>
        <div id="wang">
          <div class="one">
            <span>10000</span>
          </div>
          <div class="two">
            <span>7500</span>
          </div>
          <div class="three">
            <span>5000</span>
          </div>
        </div>
        <div class="zi">
          <span>本单位</span>
          <span>本单位会诊</span>
          <span>外单位首诊</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";

export default {
  mounted() {
    this.$nextTick(function() {
      this.drawLine();
      this.tongji();
    });
  },
  methods: {
    // echarts图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById("liu"));
      let myChart = this.$echarts.init(document.getElementById("liu"));
      // 绘制图表
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ["", "", "", "", "", ""]
        },
        yAxis: {},
        // legend: {
        //   data:['销量']
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          height: "90%"
        },
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    // 统计数据
    async tongji(){
      let type = ''
      let field = ''
      let entry_status = ''
      const {data :res } = await this.axios.get('excel_data/stat.php',{params:{type:1,field:entry_status}})
      console.log(res)
      let tongjiList = res
      console.log(tongjiList.stat)
      console.log(tongjiList.stat[0].entry_status)
      // tongjiList.stat.map( (item ,index) => {
      //   if(item.entry_status == 0){
      //     this.item = item
      //     console.log(item.entry_status)
      //   }else{
      //     this.item = item
      //     console.log(item.entry_status)
      //   }      
      // })

    }
  },
  data() {
    return {
      // 统计数据
      tongjiList:[],
      value:'',   //日期的值
      // 日期配置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.icontubiaozhizuo-:before {
  color: #1CA5FF;
}

.up {
  display: flex;

  .green {
    background-image: url('./img/green-bg.png');
    width: 550px;
    height: 200px;
    display: flex;
    justify-content: space-evenly;

    .BD {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      width: 220px;
      height: 200px;
    }

    .jiao {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }
  }

  .orange {
    background-image: url('./img/orange-bg.png');
    width: 550px;
    height: 200px;
    display: flex;
    justify-content: space-evenly;
    .BL {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      width: 220px;
      height: 200px;
    }

    .luru {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }
  }

  .blue {
    background-image: url('./img/blue-bg.png');
    width: 550px;
    height: 200px;
    display: flex;
    justify-content: space-evenly;
    .YL {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      width: 220px;
      height: 200px;
    }

    .yuan {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.down {
  .zx {
    width: 1080px;
    height: 620px;
    margin-top: 10px;
    margin-left: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 8px;
    float: left;

    .title {
      display: flex;
      background: #FAFAFA;
      justify-content: space-between;
      height: 36px;
      line-height: 36px;
      box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.75);
      border-radius: 4px 4px 0px 0px;

      i {
        margin-left: 10px;
      }

      span {
        margin-right: 10px;
        color: #1CA5FF;
      }
    }

    .select {
      width: 1020px;
      height: 100px;
      line-height: 100px;
      border-bottom: 1px rgba(238, 238, 238, 1) solid;
      margin-left: 20px;
    }

    .tu {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-around;
      margin-top: 30px;
      height: 400px;

      // 图
      #liu {
        width: 604px;
        height: 328px;
      }
    }
  }

  .sx {
    width: 530px;
    height: 620px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 8px;
    float: right;
    margin-top: 10px;

    .title {
      background: #fafafa;
      height: 36px;
      line-height: 36px;
      box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.75);
      border-radius: 4px 4px 0px 0px;
    }

    #wang {
      width: 430px;
      height: 492px;
      margin-left: 50px;
      margin-top: 30px;
      border-left: 1px solid rgba(238, 238, 238, 1);
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      display: flex;
      justify-content: space-around;
      align-items: flex-end;

      .one {
        width: 66px;
        height: 470px;
        background: rgba(28, 165, 255, 1);
        border-radius: 4px 4px 0px 0px;
      }

      .two {
        width: 66px;
        height: 288px;
        background: rgba(37, 193, 171, 1);
        border-radius: 4px 4px 0px 0px;
      }

      .three {
        width: 66px;
        height: 202px;
        background: rgba(248, 182, 63, 1);
        border-radius: 4px 4px 0px 0px;
      }

      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: block;
        margin-top: 20px;
        text-align: center;
      }
    }

    .zi {
      display: flex;
      justify-content: space-evenly;
      margin-left: 30px;
    }
  }
}
</style>
