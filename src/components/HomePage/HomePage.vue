<template>
  <div class="main">
    <div class="up">
      <div class="green">
        <div class="BD">
          <span
            style="font-size:36px;font-weight:400;color:rgba(255,255,255,1);"
          >{{tongjiList2.total}}</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">本单位数据导入量</span>
          <span
            style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);"
          >（待校验 {{tongjiList2.not_ok}}：已校验 {{tongjiList2.ok}}）</span>
        </div>
        <div class="jiao">
          <span
            style="font-size:16px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1)"
          >
            <img src="./img/rise.png" alt />
            <span>{{tongjiList2.up_degree}}%</span>
          </span>
          <el-button
            round v-show="this.role_id > 1"
            style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(23,163,209,1);"  @click="go_jy"
          >去校验</el-button>
        </div>
      </div>

      <div class="orange">
        <div class="BL">
          <span
            style="font-size:36px;font-weight:400;color:rgba(255,255,255,1);"
          >{{tongjiList1.total}}</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">本单位数据录入量</span>
        </div>
        <div class="luru">
          <span style="font-size:16px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1)">
            <img src="./img/rise.png" alt />
            <span>{{tongjiList1.up_degree}}%</span>
          </span>
          <el-button
            round
            style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(23,163,209,1);" @click="go_lr" 
          >开始录入</el-button>
        </div>
      </div>

      <div class="blue">
        <div class="YL">
          <span
            style="font-size:36px;font-weight:400;color:rgba(255,255,255,1);"
          >{{tongjiList3.total}}</span>
          <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,1);">外院首诊报告数量</span>
        </div>
        <div class="yuan">
          <span
            style="font-size:16px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(255,255,255,1)"
          >
            <img src="./img/rise.png" alt />
            <span>{{tongjiList3.up_degree}}%</span>
          </span>
          <el-button
            round
            style="font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(23,163,209,1);"  @click="go_zh"
          >外院首诊报告录入</el-button>
        </div>
      </div>
    </div>

    <div class="down">
      <div class="zx">
        <div class="title">
          <i class="iconfont icontubiaozhizuo-">本单位病理报告量</i>
          <el-button @click="go_sx"><span  >详情</span></el-button>
          
        </div>
        <div class="select">
          <el-date-picker
            type="daterange"
            align="right"
            v-model="value"
            unlink-panels
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="请选择开始时间"
            end-placeholder="请选择结束时间"
            @change="darwPie2"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
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
        </div>
        <div id="wang">
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
      // this.drawLine();
      this.tongji1();
      this.tongji2();
      this.tongji3();
      this.reportList();
      this.darwPie2();
      this.darwPie3();
      this.role_id = window.sessionStorage.role_id;
    });
  },
  methods: {
    go_jy(){
      this.$router.replace('/dataimport')    
    },
    go_lr(){
      this.$router.replace('/dataentry')
    },
    go_zh(){
      this.$router.replace('/unit')
    },
    go_sx(){
      this.$router.replace('/shaix')
    },
    // echarts图
    async darwPie2() {
      let type =''
      let startdate =''
      let enddate =''
      console.log(this.value)
      if(this.value != null){
        const res = await this.axios.get("report/stat_day.php",{params:{type:1,startdate:this.value[0],enddate:this.value[1]}});
        console.log(res);
        let myChart = this.$echarts.init(
          document.getElementById("liu"),
          "macarons"
        );
        let datas = res.data.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas
          // title: "折线图"
        });    
      }else{
        const res = await this.axios.get("report/stat_day.php",{params:{type:1}});
        console.log(res);
        let myChart = this.$echarts.init(
          document.getElementById("liu"),
          "macarons"
        );
        let datas = res.data.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas
          // title: "折线图"
        });    
      }
      /**
        * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
        * @param {object} param 参数列表
        * @param  {object} param.myChart 待更新的echarts对象
        * @param {object} param.dataEcharts 待分析的源数据
        * @param {string} [param.type] 分析项（英文名称） 可选
        * @param {string} param.title 表格title名称
      */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        // console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];
        let xAxisText = "分析项";
        let yAxisText = "数值";
        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          // console.log(item)
          for (name in item) {
            if (name == "daycount") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }
        console.log("dataEcharts:", dataEcharts);
        console.log("nameArray:", nameArray);
        console.log("valueArray:", valueArray);
        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
            axisPointer: {
              //坐标轴指示器配置项
              type: "cross", //十字准星指示器
              label: {
                //指示器文本
                show: true,
                precision: 0 //精确度，小数点后零位，即整数
              }
            }
          },
          legend: {
          },
          grid: {
            //直角坐标系内绘图网格
            top: "5%",
            left: "1%",
            right: "5%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: "",
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: "",
            type: "value"
          },
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "line",
              smooth: 0, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // echarts图
    async darwPie3() {
      const res = await this.axios.get("report/stat.php");
      // console.log(res);
      let myChart = this.$echarts.init(
        document.getElementById("wang"),
        "macarons"
      );
      let datas = res.data;
      let valueArray = [];
      valueArray.push(datas.total1, datas.total2, datas.total3);
      let option = {
        title: {
          left: "center",
          top: "10px",
          textAlign: "center"
        },
        tooltip: {
          //提示框组件
          trigger: "axis", //触发类型：axis-坐标轴触发

          axisPointer: {
            //坐标轴指示器配置项
            type: "cross", //十字准星指示器
            label: {
              //指示器文本
              show: true,
              precision: 0 //精确度，小数点后零位，即整数
            }
          }
        },
        grid: {
          //直角坐标系内绘图网格
          top: "10%",
          left: "5%",
          right: "5%",
          bottom: "0%",
          containLabel: true //grid是否包含刻度标签
        },
        xAxis: {
          //直角坐标系 grid 中的 x 轴
          name: "",
          type: "category",
          data: ["本单位", "本单位会诊", "外单位首诊"]
        },
        yAxis: {
          //直角坐标系 grid 中的 y 轴
          name: "",
          type: this.datas
        },

        series: [
          //系列列表。每个系列通过 type 决定自己的图表类型
          {
            // name: yAxisText,
            type: "bar",
            // smooth: 0, //折线平滑程度
            data: valueArray
          }
        ]
      };
      // console.log("option:", option);
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option, { notMerge: true });
    },

   
    // 统计数据1
    async tongji1() {
      let type = "";
      const { data: res } = await this.axios.get("excel_data/stat.php", {
        params: { type: 1 }
      });
      // console.log(res)
      this.tongjiList1 = res;
    },
    // 统计数据2
    async tongji2() {
      let type = "";
      const { data: res } = await this.axios.get("excel_data/stat.php", {
        params: { type: 2 }
      });
      // console.log(res)
      this.tongjiList2 = res;
    },
    // 统计数据3
    async tongji3() {
      let type = "";
      const { data: res } = await this.axios.get("diagnosis_origin/stat.php");
      console.log(res)
      this.tongjiList3 = res;
    },
    // 获取报告量详情
    async reportList() {
      const { data: res } = await this.axios.get("report/stat.php");
      // console.log(res)
      this.reportLists = res;
    }
  },
  data() {
    return {
      username:'',
      role_id:'',
      // 报告量统计
      reportLists: [],
      // 统计数据
      tongjiList1: [],
      tongjiList2: [],
      tongjiList3: [],
      value: "", //日期的值
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
@import 'homepage.styl'
</style>
