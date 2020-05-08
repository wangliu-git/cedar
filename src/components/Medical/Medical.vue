<template>
  <div>
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item name="1">
        <template
          slot="title"
          style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px"
        >
          <i class="iconfont icontubiaozhizuo-"></i> 选择分组
        </template>
        <div class="search">
          <div class="left">
            <span>创建人 ：</span>
            <el-select placeholder="请选择" size="small">
              <el-option></el-option>
            </el-select>
          </div>
          <div class="right">
            <el-input placeholder="搜索" size="small" class="input-with-select">
              <el-button slot="append" class="iconfont iconsousuo" size="small"></el-button>
            </el-input>
          </div>
          <!-- <el-button type="text" size="small" @click="chakan(scope.row)">查看</el-button>-->
          <div class="storageList">
            <div class="list" style="width:96%">
              <el-table :data="datalist" highlight-current-row style="width: 100%" border stripe :header-cell-style="{color:'#333333'}">
                <el-table-column prop="id" label="项目编号" width="250"></el-table-column>
                <el-table-column prop="group_name" label="项目名称" width="250"></el-table-column>
                <el-table-column prop="group_logic" label="筛选逻辑" width="300"></el-table-column>
                <el-table-column prop="group_time" label="创建时间" width="250"></el-table-column>
                <el-table-column prop="group_username" label="创建人" width="250"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                  <template slot-scope="scope">
                    
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 数据分析-->
    <div class="fenxi" >
      <div class="up">
        <i class="iconfont icontubiaozhizuo-"></i> 数据分析
      </div>
      <div class="down">
        <div class="choose">
          <div>
            <i class="iconfont iconbuzhou-icon"></i>
            <span>选择分析 ：</span>
            <el-select placeholder="请选择" size="small">
              <el-option v-for="(item,index)  in choose" :key="index" :value="item">{{item}}</el-option>
            </el-select> 
          </div>
          <div>
            <i class="iconfont iconbuzhou-xian1"></i>
            <span>选择淋巴瘤亚型 ：</span>
            <el-select placeholder="请选择" size="small">
              <el-option>淋巴瘤各个亚型临床病理特征相关分析</el-option>
            </el-select>
          </div>
        </div>
        <div class="echarts">
          <div class="btns">
            <el-button type="primary" plain>性别</el-button>
            <el-button type="primary" plain>年龄</el-button>
            <el-button type="primary" plain>籍贯</el-button>
            <el-button type="primary" plain>居住地</el-button>
            <el-button type="primary" plain>标本类型</el-button>
            <el-button type="primary" plain>取材部位</el-button>
            <el-button type="primary" plain>免疫组化检测率</el-button>
            <el-button type="primary" plain>免疫组化阳性率</el-button>
            <el-button type="primary" plain>分子指标检测率</el-button>
            <el-button type="primary" plain>诊断时长</el-button>
            <el-button type="primary" plain>各个病理类型分布</el-button>
          </div>
          <div id="tu"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "./js/util.js";

import echarts from "echarts";

export default {
  data() {
    return {
      // 选择分析选项
      choose:["淋巴瘤整体临床病理特征相关分析","淋巴瘤各个病理类型临床病理特征相关分析"],
      activeNames: ["1"],
      datalist: [], //数据集数组
      chartsData: [] ,//图表数据
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getDataList();
      this.drawLine();
      // this.getEcharts();
      // this.setEChart_barWithTool()
    });
  },
  methods: {
    // 点击编辑获取ID
    chakan(row) {
      // console.log(row.id)
      let group_id = row.id;
      console.log(group_id);
    },
    // 获取数据集列表
    async getDataList() {
      const { data: res } = await this.axios.get("group/list.php");
      this.datalist = res.data;
      console.log(this.datalist);
    },
    // 图
    async drawLine() {
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      const { data: res } = await this.axios.get(
        "group/stat.php?group_id=1&field=sex"
      );
      let datas = res.stat;
      setEChart_barWithTool({
        myChart: myChart,
        dataEcharts: datas,
        title: "柱状图"
      });

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
        console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = "分析项";
        let yAxisText = "数值";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          for (name in item) {
            if (name == "value") {
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
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              dataZoom: {
                //工具项*2 - 缩放
                show: true,
                yAxisIndex: false
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为饼图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                onclick: function() {
                  // alert('myToolHandler1');
                  // setEChart_line(myChart, data);
                  // setEChart('pieWithTool');
                }
              },
              magicType: {
                //多个工具项-动态视图类型切换的选项
                show: true,
                type: ["line", "bar"]
              },
              dataView: {
                //工具项-原始数据展示
                show: true,
                readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                buttonColor: "#337ab7", //原始数据视图下的按钮颜色
                //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table =
                    '<table class="table table-striped table-bordered table-hover" style="width:100%;text-align:center"><thead><tr>' +
                    "<th>" +
                    xAxisText +
                    "</th>" +
                    "<th>" +
                    yAxisText +
                    "</th>" +
                    // + '<th>' + series[1].name + '</th>'
                    "</tr></thead><tbody>";

                  for (var i = 0, l = axisData.length; i < l; i++) {
                    table +=
                      "<tr>" +
                      "<td>" +
                      axisData[i] +
                      "</td>" +
                      "<td>" +
                      series[0].data[i] +
                      "</td>" +
                      // + '<td>' + series[1].data[i] + '</td>'
                      "</tr>";
                  }
                  table += "</tbody></table>";
                  return table;
                }
              },
              restore: { show: true }, //工具项-还原
              saveAsImage: {
                //工具项-保存为图片
                show: true,
                name: "思睿分析图", //保存的文件名称
                // backgroundColor: '#fff',
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
          grid: {
            //直角坐标系内绘图网格
            top: "12%",
            left: "1%",
            right: "12%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: "value"
          },
          dataZoom: [
            //用于区域缩放
            {
              show: true,
              xAxisIndex: 0,
              type: "slider", //X轴滑动条
              labelPrecision: 0,
              start: 0,
              end: 100
            },
            {
              type: "inside", //内置（滚轮、鼠标拖动控制缩放区域）
              start: 0,
              end: 100
            },
            {
              show: true,
              yAxisIndex: 0,
              type: "slider", //滑动条  //Y轴滑动条
              labelPrecision: 0,
              filterMode: "empty",
              width: 30,
              height: "80%",
              showDataShadow: false,
              left: "93%"
            }
          ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "bar",
              smooth: 0.5, //折线平滑程度
              data: valueArray
            }
          ]
        };

        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.iconbuzhou-icon {
  width: 4px;
  height: 9px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1CA5FF;
  line-height: 24px;
  margin-right: 5px;
}

.iconbuzhou-xian1 {
  width: 4px;
  height: 9px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1CA5FF;
  line-height: 24px;
  margin-right: 5px;
}

.search {
  .left {
    width: 280px;
    margin: 10px 30px 10px;
  }

  .right {
    .el-input {
      width: 280px;
      margin: 10px 30px 10px;
    }

    .el-button {
      background: rgba(28, 178, 255, 1);
      border-radius: 0px 4px 3px 0px;
    }

    .iconsousuo {
      color: white;
      background: rgba(28, 173, 255, 1);
    }
  }

  .storageList {
    margin-top: 20px;
    padding-bottom: 20px;

    .list {
      padding-top: 10px;
      margin-left: 30px;

      .el-table {
        border-top: 1px solid rgba(0, 160, 233, 1);
        margin: 10px 0;
      }
    }
  }
}

.fenxi {
  margin-top: 20px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px 4px 4px 4px;

  .up {
    height: 40px;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.75);
    border-radius: 4px 0px 0px 0px;
    line-height: 40px;
  }

  .down {
    .choose {
      display: flex;
      flex-flow: row;
      margin: 20px 10px;

      div {
        margin: auto 10px;
      }
    }

    .echarts {
      width: 1571px;
      height: 680px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(229, 229, 229, 1);
      border-radius: 4px;
      margin: 10px auto;

      .btns {
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;
        padding-bottom: 20px;
        width: 1571px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);

        .el-button {
          background: rgba(250, 250, 250, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);

          &:hover {
            background: rgba(28, 178, 255, 1);
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      #tu {
        width: 932px;
        height: 463px;
        margin: 10px auto;
      }
    }
  }
}
</style>
